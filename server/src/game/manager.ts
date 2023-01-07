import { cloneDeep, sample } from "lodash";
import { ServerIO } from "../../../client/src/types/event.types";
import { SERVER_IO } from "../server";
import {
  GameStateCore,
  GameStatus,
} from "../../../client/src/types/game.types";
import { PlayerManager } from "../player/manager";
import { Player } from "../../../client/src/types/player.types";
import { OngoingRound, PlayerAnswer, RoundPrompt, RoundStatus } from "../../../client/src/types/round.types";
import { getAllQuestions } from "../questions/manager";
import { FamilyFeudProtoQA } from "../../../client/src/types/protoqa.types";


const GAMES_DB: Record<GameStateCore["id"], GameStateCore> = {};

export interface OperationBase<T = void> {
  status: "success" | "error";
  result?: T;
}

export interface OperationSuccess<T = void> extends OperationBase<T> {
  status: "success";
  result: T;
}

export interface OperationError<T = void> extends OperationBase<T> {
  status: "error";
  result?: never;
}

export type Operation<T = void> = OperationSuccess<T> | OperationError<T>;

/** Map of all game managers - to avoid creating new ones */
const gameManagerMap = new Map<string, GameManager>();

export class GameManager {
  _playerManagerMap = new Map<string, PlayerManager>();

  constructor(
    public gameId: string,
    public gamesStore: Record<string, GameStateCore> = GAMES_DB,
    public io: ServerIO = SERVER_IO
  ) {}

  static for(gameId: string): GameManager {
    const existingManager = gameManagerMap.get(gameId);
    if (existingManager) {
      return existingManager;
    } else {
      const newManager = new this(gameId);
      gameManagerMap.set(gameId, newManager);
      return newManager;
    }
  }

  _broadcast(): void {
    this._withPointer((pointer) => {
      this.io.emit("GAME_UPDATED", pointer);
    });
  }

  _mutate(mutativeCb: (game: GameStateCore) => void): void {
    this._withPointer(mutativeCb);
    this._broadcast();
  }

  _pointer(): GameStateCore | undefined {
    return this.gamesStore[this.gameId];
  }

  _set(game: GameStateCore): void {
    this.gamesStore[this.gameId] = game;
    this._broadcast();
  }

  _withPointer<T = void>(cb: (gamePointer: GameStateCore) => T): Operation<T> {
    const pointer = this._pointer();
    if (pointer) {
      const result = cb(pointer);
      return { status: "success", result };
    } else {
      return { status: "error" };
    }
  }

  public addPlayer(player: Omit<Player, "gameId">): void {
    this._mutate((game) => {
      game.players[player.id] = {
        ...player,
        gameId: this.gameId,
      };
    });
  }

  public currentRound(): OngoingRound {
    return this.snapshotOrFail().round.ongoing;
  }

  public completedRoundIds(): RoundPrompt["id"][] {
    return this.snapshot()?.round.completed.map((r) => r.prompt.id) ?? [];
  }

  public async createGameWithHost(host: Player): Promise<void> {
    // okay - it should exist
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { metadata, question } = sample(await getAllQuestions())!;

    const newGame: GameStateCore = {
      id: host.gameId,
      players: {
        [host.id]: host,
      },
      round: {
        ongoing: {
          status: RoundStatus.QUESTION_APPROVAL,
          prompt: {
            id: metadata.id,
            text: question.normalized,
          },
          playerAnswers: {},
        },
        completed: [],
      },
      status: GameStatus.LOBBY,
      settings: {},
    };

    this._set(newGame);

    this.io.emit("HOST_GAME_CREATED", newGame, host.id);
  }

  public async drawNewPrompt(
    currentPromptId: RoundPrompt["id"]
  ): Promise<void> {
    const questions = await getAllQuestions();
    const unfitQuestionIds = [...this.completedRoundIds(), currentPromptId];

    let nextRoundQuestion: FamilyFeudProtoQA | undefined;

    while (!nextRoundQuestion) {
      const possibleNextQuestion = sample(questions);
      if (
        possibleNextQuestion &&
        !unfitQuestionIds.includes(possibleNextQuestion.metadata.id)
      ) {
        nextRoundQuestion = possibleNextQuestion;
      }
    }

    this.replaceCurrentQuestion(nextRoundQuestion);
  }

  public getHostPlayer(): Player | undefined {
    const host = Object.values(this.players()).find((player) => player.isHost);
    return host;
  }

  public getPlayer(playerId: string): Player | undefined {
    return this.managePlayer(playerId).snapshot();
  }

  public getPlayerOrFail(playerId: string) {
    const player = this.getPlayer(playerId);
    if (player) {
      return player;
    } else {
      throw new Error(`Couldn't find player with id ${playerId}`);
    }
  }

  public isJoinable(): boolean {
    const pointer = this._pointer();
    return !!pointer && pointer.status === GameStatus.LOBBY;
  }

  public isRetrievable(): boolean {
    return !!this._pointer();
  }

  public manageEachPlayer(cb: (playerManager: PlayerManager) => void) {
    for (const playerId in this.players()) {
      const playerManager = this.managePlayer(playerId);
      cb(playerManager);
    }
  }

  public managePlayer(
    playerId: string,
    aliasIds: string[] = []
  ): PlayerManager {
    const extantPlayerManager = this._playerManagerMap.get(playerId);
    if (extantPlayerManager) {
      return extantPlayerManager;
    } else {
      const newPlayerManager = new PlayerManager(this, playerId, aliasIds);
      this._playerManagerMap.set(playerId, newPlayerManager);
      return newPlayerManager;
    }
  }

  public playerIds(): string[] {
    return Object.keys(this.players());
  }

  public players(): Readonly<Record<string, Player>> {
    const snapshot = this.snapshot();
    if (snapshot) {
      return snapshot.players;
    } else {
      throw new Error("Could not find game to locate players for");
    }
  }

  public removePlayer(playerId: string): void {
    this._mutate((g) => {
      delete g.players[playerId];
    });
    this.io.emit("PLAYER_KICKED", this.gameId, playerId);
  }

  public replaceCurrentQuestion(newQuestion: FamilyFeudProtoQA): void {
    this._mutate((g) => {
      g.round.ongoing = {
        status: RoundStatus.QUESTION_APPROVAL,
        prompt: {
          id: newQuestion.metadata.id,
          text: newQuestion.question.normalized,
        },
        playerAnswers: {},
      };
    });
  }

  public set(game: GameStateCore): void {
    this._set(game);
  }

  public setPlayerAnswer(
    playerId: string,
    setAnswer: PlayerAnswer | ((prevAnswer: PlayerAnswer) => PlayerAnswer)
  ): void {
    this._mutate((g) => {
      if (typeof setAnswer === "function") {
        g.round.ongoing.playerAnswers[playerId] = setAnswer(
          g.round.ongoing.playerAnswers[playerId] ?? {
            playerId,
            text: "",
            isLocked: false,
            isTyping: false,
          }
        );
      } else {
        g.round.ongoing.playerAnswers[playerId] = setAnswer;
      }
    });
  }

  public setWithPointer(
    cb: (gamePointer: GameStateCore) => GameStateCore
  ): void {
    this._withPointer((pointer) => {
      this.set(cb(pointer));
    });
  }

  public snapshot(): GameStateCore | undefined {
    const operation = this._withPointer((pointer) => cloneDeep(pointer));
    if (operation.status === "success") {
      return operation.result;
    }
  }

  public snapshotOrFail(): GameStateCore {
    const operation = this._withPointer((pointer) => cloneDeep(pointer));
    if (operation.status === "success") {
      return operation.result;
    }

    throw new Error(`No snapshot exists for game ${this.gameId}`)
  }

  public start(): void {
    this._mutate((g) => {
      g.status = GameStatus.ONGOING;
    });
  }

  /**
   * Updates a game, by applying a callback function,
   *  and broadcasts the update to sockets
   * @param mutativeCb - mutative callback function for the game data
   */
  public update(mutativeCb: (game: GameStateCore) => void) {
    this._mutate(mutativeCb);
  }

  public updateEachPlayer(mutativeCb: (player: Player) => void): void {
    for (const playerId in this.players()) {
      this.managePlayer(playerId).update(mutativeCb);
    }
  }

  public updatePlayer(playerId: string, mutativeCb: (player: Player) => void) {
    this.managePlayer(playerId).update(mutativeCb);
  }
}
