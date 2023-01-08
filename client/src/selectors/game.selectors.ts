import { createSelector } from "reselect";
import { GameStateCore, GameStateDerived } from "../types/game.types";

export const selectDerivedGameData = (
  game: GameStateCore
): GameStateDerived => {
  // TODO make more robust
  return game as GameStateDerived;
};

export const selectCurrentRound = createSelector(
  selectDerivedGameData,
  (g) => g.round.ongoing
);

export const selectCurrentRoundStatus = createSelector(
  selectCurrentRound,
  (round) => round.status
);
