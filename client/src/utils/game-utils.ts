import { mapValues } from "lodash";
import { Game, GameStateCore, GameStateDerived } from "../types/game.types";
import { ScoredPlayer } from "../types/player.types";
import { AnswerMark, LockedPlayerAnswer, PlayerAnswer } from '../types/round.types';

export const calculatePlayerScores = (
  completedRounds: { playerAnswers: Record<string, { mark: AnswerMark | null }> }[]
): Record<string, number> => {
  return completedRounds.reduce(
    (acc, round) => {
      for (const playerId in round.playerAnswers) {
        if (round.playerAnswers[playerId]?.mark === AnswerMark.HERD) {
          acc[playerId] = (acc[playerId] ?? 0) + 1
        } else {
          acc[playerId] ??= 0
        }
      }

      return acc
    },
    {} as Record<string, number>
  );
};

export const deriveGameData = (game: GameStateCore): GameStateDerived => {
  const scores = calculatePlayerScores(game.round.completed);
  const pinkCowPlayerId = findCurrentPinkCowPlayerId(game.round.completed);

  return {
    ...game,
    pinkCowPlayerId,
    winnerId: findWinnerId(scores, pinkCowPlayerId),
    players: mapValues(game.players, (p) => ({
      ...p,
      score: scores[p.id] ?? 0,
    })),
  };
}

export const findCurrentPinkCowPlayerId = (
  completedRounds: { playerAnswers: Record<string, { mark: AnswerMark | null }> }[]
): string | null => {
  const roundsInReverseOrder = [...completedRounds].reverse();
  for (const round of roundsInReverseOrder) {
    const pinkCowAnswer = Object.entries(round.playerAnswers).find(
      ([, { mark }]) => mark === AnswerMark.PINK_COW
    );
    if (pinkCowAnswer) {
      return pinkCowAnswer[0]; // id from the entry
    }
  }
  return null;
};

export const findWinnerId = (
  playersWithScores: Record<string, number>,
  pinkCowPlayerId: string | null
): string | null => {
  const playerEntries = Object.entries(playersWithScores).sort((a, b) => {
    if (a[0] === pinkCowPlayerId) {
      return 1;
    } else if (b[0] === pinkCowPlayerId) {
      return -1;
    } else {
      return b[1] - a[1];
    }
  });

  if (
    playerEntries[0] &&
    playerEntries[0][1] !== playerEntries[1]?.[1]
  ) {
    const winningPlayer = playerEntries[0];
    return winningPlayer[1] >= 8 ? winningPlayer[0] : null;
  }

  return null;
};

export const getGameHost = (game: Game): ScoredPlayer & { isHost: true } => {
  const players = Object.values(game.players);
  const host = players.find((p): p is ScoredPlayer & { isHost: true } => !!p.isHost);
  if (!host) {
    throw new Error("Game does not appear to have a host")
  }
  return host
}

export const isEveryPlayerAnswerSubmitted = (playerAnswers: Record<string, PlayerAnswer>): playerAnswers is Record<string, LockedPlayerAnswer> => {
  for (const answer of Object.values(playerAnswers)) {
    if (!answer.isLocked) {
      return false
    }
  }

  return true
}