import { findWinnerId } from "./find-winner";

describe('findWinner', () => {
  it('declares no winner when all scores are below 8', () => {
    const playerScores = {
      a: { score: 1 },
      b: { score: 3 },
      c: { score: 2 },
    };

    const winnerId = findWinnerId(playerScores, null);
    expect(winnerId).toBeNull()
  })

  it("declares no winner when the only 8+ score player is pink cow", () => {
    const playerScores = {
      a: { score: 1 },
      b: { score: 8 },
      c: { score: 2 },
    };

    const winnerId = findWinnerId(playerScores, 'b');
    expect(winnerId).toBeNull();
  });

  it("declares no winner when two players are tied", () => {
    const playerScores = {
      a: { score: 8 },
      b: { score: 8 },
      c: { score: 2 },
    };

    const winnerId = findWinnerId(playerScores, null);
    expect(winnerId).toBeNull();
  });

  it("declares unique player on highest 8+ who is non-pink-cow as winner", () => {
    const playerScores = {
      a: { score: 8 },
      b: { score: 9 },
      c: { score: 2 },
    };

    const winnerId = findWinnerId(playerScores, 'b');
    expect(winnerId).toBe('a');
  });
})