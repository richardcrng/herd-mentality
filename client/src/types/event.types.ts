import { Socket as TClientSocket } from "socket.io-client";
import { Socket as TServerSocket, Server as TServer } from "socket.io";
import { GameStateCore } from "./game.types";
import { Player } from "./player.types";
import { AnswerMark, RoundPrompt } from "./round.types";

export type ClientSocket = TClientSocket<
  ServerEventListeners,
  ClientEventListeners
>;

export type ServerSocket = TServerSocket<
  ClientEventListeners,
  ServerEventListeners
>;

export type ServerIO = TServer<ClientEventListeners, ServerEventListeners>;

/**
 * Listeners for `ClientEvent`s
 */
export type ClientEventListeners = {
  APPROVE_CURRENT_PROMPT: (gameId: string) => void;
  CONFIRM_MARKS: (gameId: string) => void;
  CREATE_HOST_GAME: (player: Player) => void;
  DRAW_NEW_PROMPT: (gameId: string, currentPromptId: RoundPrompt['id']) => void;
  EDIT_ANSWER: (gameId: string, playerId: string, typedAnswer: string) => void;
  GET_GAME: (gameId: string) => void;
  JOIN_GAME: (gameId: string, player: Omit<Player, "gameId">) => void;
  KICK_PLAYER: (gameId: string, playerId: string) => void;
  LOCK_ANSWER: (gameId: string, playerId: string) => void;
  MODERATE_ANSWER_MARK: (gameId: string, playerId: string, mark: AnswerMark | null) => void;
  START_GAME: (gameId: string) => void;
  PAUSE_PLAYER_TYPING: (gameId: string, playerId: string) => void;
};

export type ClientEvent = keyof ClientEventListeners;

/**
 * Listeners for `ServerEvent`s
 */
export type ServerEventListeners = {
  GAME_NOT_FOUND: (gameId: string) => void;
  GAME_UPDATED: (game: GameStateCore) => void;
  HOST_GAME_CREATED: (game: GameStateCore, hostId: string) => void;
  PLAYER_KICKED: (gameId: string, playerId: string) => void;
};

export type ServerEvent = keyof ServerEventListeners;
