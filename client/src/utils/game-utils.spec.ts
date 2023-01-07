import { AnswerMark } from "../types/round.types";
import { findCurrentPinkCowPlayerId, calculatePlayerScores } from "./game-utils";


describe("calculatePlayerScores", () => {
  it("avoids mutating original array", () => {
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

    calculatePlayerScores(rounds);

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
  });

  it("scores a player one point for each herd", () => {
    const rounds: {
      playerAnswers: Record<string, { mark: AnswerMark | null }>;
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
          b: { mark: null },
          c: { mark: null },
          d: { mark: AnswerMark.HERD },
        },
      },
      {
        playerAnswers: {
          a: { mark: AnswerMark.HERD },
          b: { mark: AnswerMark.HERD },
          c: { mark: null },
          d: { mark: AnswerMark.PINK_COW },
        },
      },
    ];

    const scores = calculatePlayerScores(rounds);

    expect(scores).toMatchObject({
      a: 3,
      b: 2,
      c: 0,
      d: 2
    });
  });
});

describe('findCurrentPinkCowPlayerId', () => {
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

    findCurrentPinkCowPlayerId(rounds)

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

    const res = findCurrentPinkCowPlayerId(rounds);

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

    const res = findCurrentPinkCowPlayerId(rounds);

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

    const res = findCurrentPinkCowPlayerId(rounds);

    expect(res).toBeNull();
  });
})