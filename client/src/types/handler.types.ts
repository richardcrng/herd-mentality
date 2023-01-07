import { RoundPrompt } from "./round.types";

export interface LobbyHandlers {
  onGameStart(): void;
  onPlayerKick(playerId: string): void;
}

export interface GameOngoingHandlers {
  onApprovePrompt(): void;
  onDrawNewPrompt(currentPromptId: RoundPrompt['id']): void;
  onEditAnswer(newAnswer: string): void;
  onPauseTyping(): void;
}