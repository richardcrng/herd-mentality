import { RoundPrompt } from "./round.types";

export interface LobbyHandlers {
  onGameStart(): void;
  onPlayerKick(playerId: string): void;
}

export interface GameOngoingHandlers {
  onDrawNewPrompt(currentPromptId: RoundPrompt['id']): void;
}