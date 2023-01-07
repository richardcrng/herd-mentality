import { AnswerMark } from "../types/round.types";
import { getPinkCowPlayerId } from "./game-utils";

describe('getPinkCowPlayerId', () => {
  it('avoids mutating original array', () => {
    const rounds: {
      playerAnswers: Record<string, { mark: AnswerMark }>;
    }[] = [
      {
        playerAnswers: {
          a: { mark: AnswerMark.HERD },
          b: { mark: AnswerMark.HERD },
          c: { mark: AnswerMark.PINK_COW },
          d: { mark: AnswerMark.HERD },
        },
      },
    ];

    getPinkCowPlayerId(rounds)

    expect(rounds).toMatchObject([
      {
        playerAnswers: {
          a: { mark: AnswerMark.HERD },
          b: { mark: AnswerMark.HERD },
          c: { mark: AnswerMark.PINK_COW },
          d: { mark: AnswerMark.HERD },
        },
      },
    ]);
  })

  it("finds the only pink cow player with one completed round", () => {
    const rounds: {
      playerAnswers: Record<string, { mark: AnswerMark }>;
    }[] = [
      {
        playerAnswers: {
          a: { mark: AnswerMark.HERD },
          b: { mark: AnswerMark.HERD },
          c: { mark: AnswerMark.PINK_COW },
          d: { mark: AnswerMark.HERD },
        },
      },
    ];

    const res = getPinkCowPlayerId(rounds);

    expect(res).toBe('c');
  });

  it("finds the only pink cow player with one completed round, where second had no pink cow", () => {
    const rounds: {
      playerAnswers: Record<string, { mark: AnswerMark }>;
    }[] = [
      {
        playerAnswers: {
          a: { mark: AnswerMark.HERD },
          b: { mark: AnswerMark.HERD },
          c: { mark: AnswerMark.PINK_COW },
          d: { mark: AnswerMark.HERD },
        },
      },
      {
        playerAnswers: {
          a: { mark: AnswerMark.HERD },
          b: { mark: AnswerMark.HERD },
          c: { mark: AnswerMark.HERD },
          d: { mark: AnswerMark.HERD },
        },
      },
    ];

    const res = getPinkCowPlayerId(rounds);

    expect(res).toBe("c");
  });

  it("finds no player when there have been no pink cows", () => {
    const rounds: {
      playerAnswers: Record<string, { mark: AnswerMark }>;
    }[] = [
      {
        playerAnswers: {
          a: { mark: AnswerMark.HERD },
          b: { mark: AnswerMark.HERD },
          c: { mark: AnswerMark.HERD },
          d: { mark: AnswerMark.HERD },
        },
      },
      {
        playerAnswers: {
          a: { mark: AnswerMark.HERD },
          b: { mark: AnswerMark.HERD },
          c: { mark: AnswerMark.HERD },
          d: { mark: AnswerMark.HERD },
        },
      },
    ];

    const res = getPinkCowPlayerId(rounds);

    expect(res).toBeNull();
  });
})