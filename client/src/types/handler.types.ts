import { AnswerMark, RoundPrompt } from "./round.types";

export interface LobbyHandlers {
  onGameStart(): void;
  onPlayerKick(playerId: string): void;
}

export interface GameOngoingHandlers {
  onApprovePrompt(): void;
  onConfirmMarks(): void;
  onDrawNewPrompt(currentPromptId: RoundPrompt['id']): void;
  onEditAnswer(newAnswer: string): void;
  onLockAnswer(): void;
  onPauseTyping(): void;
  onModerateAnswer(playerId: string, newMark: AnswerMark | null): void;
}

export interface GameCompleteHandlers {
  onGameRestart(): void;
}