import { Player, ScoredPlayer } from "./player.types";
import { CompletedRound, OngoingRound } from "./round.types";

export interface GameStateCore {
  id: string;
  players: {
    [playerId: string]: Player;
  };
  round: {
    ongoing: OngoingRound;
    completed: CompletedRound[];
  };
  status: GameStatus;
  settings: GameSettings;
}

export interface GameStateDerived extends GameStateCore {
  pinkCowPlayerId: string | null;
  players: Record<string, ScoredPlayer>;
}

export type Game = GameStateDerived;

export enum GameStatus {
  LOBBY = "LOBBY",
  ONGOING = "ONGOING",
}

export interface GameSettings {}