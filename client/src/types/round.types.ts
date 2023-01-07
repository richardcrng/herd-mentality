import { ProtoQAId } from "./protoqa.types";

export interface RoundPrompt {
  id: ProtoQAId;
  text: string;
}

export enum RoundStatus {
  QUESTION_APPROVAL = "host-question-approval",
  ANSWER_SUBMISSIONS = "players-submitting",
  ANSWER_MODERATION = "host-answer-moderation",
  COMPLETE = "complete",
}

export enum AnswerMark {
  HERD = "herd",
  PINK_COW = "pink-cow",
}

interface RoundBase {
  status: RoundStatus;
  prompt: RoundPrompt;
  playerAnswers: Record<string, PlayerAnswer>;
}

export interface PlayerAnswer {
  playerId: string;
  text: string;
  isTyping: boolean;
  isLocked: boolean;
  mark?: AnswerMark | null;
}

export interface LockedPlayerAnswer extends PlayerAnswer {
  isTyping: false;
  isLocked: true;
}

export interface MarkedPlayerAnswer extends LockedPlayerAnswer {
  isTyping: false;
  isLocked: true;
  mark: AnswerMark | null;
}

export type OngoingRound = RoundInQuestionApproval | RoundInSubmitting | RoundInModeration
export type Round = OngoingRound | CompletedRound

export interface RoundInQuestionApproval extends RoundBase {
  status: RoundStatus.QUESTION_APPROVAL;
}

export interface RoundInSubmitting extends RoundBase {
  status: RoundStatus.ANSWER_SUBMISSIONS;
}

export interface RoundInModeration extends RoundBase {
  status: RoundStatus.ANSWER_MODERATION;
  playerAnswers: Record<string, MarkedPlayerAnswer>;
}

export interface CompletedRound extends RoundBase {
  status: RoundStatus.COMPLETE;
  playerAnswers: Record<string, MarkedPlayerAnswer>;
}