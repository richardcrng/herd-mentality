import { Game, GameStateCore, GameStateDerived } from "../types/game.types";
import { ScoredPlayer } from "../types/player.types";
import { LockedPlayerAnswer, PlayerAnswer } from '../types/round.types';

export const deriveGameData = (game: GameStateCore): GameStateDerived => {
  // TODO make more robust
  return game as GameStateDerived
}

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