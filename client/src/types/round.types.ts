interface RoundPrompt {
  id: string;
  text: string;
}

export enum RoundStatus {
  SUBMITTING = "players-submitting",
  MODERATION = "host-moderation",
  COMPLETE = "complete",
}

export enum AnswerMark {
  HERD = "herd",
  NULL = "null",
  PINK_COW = "pink-cow",
}

interface RoundBase {
  status: RoundStatus;
  prompt: RoundPrompt;
  playerAnswers: Record<string, PlayerAnswer>;
}

export interface PlayerAnswer {
  text: string;
  isTyping: boolean;
  isLocked: boolean;
}

export interface MarkedPlayerAnswer extends PlayerAnswer {
  isTyping: false;
  isLocked: true;
  mark: AnswerMark;
}

export type Round = RoundInSubmitting | RoundInModeration | CompletedRound

export interface RoundInSubmitting extends RoundBase {
  status: RoundStatus.SUBMITTING;
}

export interface RoundInModeration extends RoundBase {
  status: RoundStatus.MODERATION;
  playerAnswers: Record<string, MarkedPlayerAnswer>;
}

export interface CompletedRound extends RoundBase {
  status: RoundStatus.COMPLETE;
  playerAnswers: Record<string, MarkedPlayerAnswer>;
}