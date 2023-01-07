import { ClientEventListeners } from "../../client/src/types/event.types";
import { RoundStatus } from "../../client/src/types/round.types";
import { GameManager } from "./game/manager";

export const approveCurrentPrompt: ClientEventListeners['APPROVE_CURRENT_PROMPT'] = (gameId) => {
  GameManager.for(gameId).update(g => {
    g.round.ongoing.status = RoundStatus.ANSWER_SUBMISSIONS
  })
}

export const createHostGame: ClientEventListeners["CREATE_HOST_GAME"] = (
  hostPlayer
) => {
  GameManager.for(hostPlayer.gameId).createGameWithHost(hostPlayer);
};

export const drawNewPrompt: ClientEventListeners['DRAW_NEW_PROMPT'] = (gameId, currentPromptId) => {
  GameManager.for(gameId).drawNewPrompt(currentPromptId)
}

export const editAnswer: ClientEventListeners['EDIT_ANSWER'] = (gameId, playerId, newAnswer) => {
  GameManager.for(gameId).typeNewAnswerForPlayer(playerId, newAnswer)
}

export const getGame: ClientEventListeners["GET_GAME"] = (gameId) => {
  const gameManager = GameManager.for(gameId);
  if (gameManager.isRetrievable()) {
    gameManager._broadcast();
  } else {
    gameManager.io.emit("GAME_NOT_FOUND", gameId);
  }
};

export const joinGame: ClientEventListeners["JOIN_GAME"] = (gameId, player) => {
  GameManager.for(gameId).addPlayer(player);
};

export const kickPlayer: ClientEventListeners["KICK_PLAYER"] = (
  gameId,
  playerId
) => {
  GameManager.for(gameId).removePlayer(playerId);
};

export const pausePlayerTyping: ClientEventListeners['PAUSE_PLAYER_TYPING'] = (gameId, playerId) => {
  GameManager.for(gameId).pausePlayerTyping(playerId)
}

export const startGame: ClientEventListeners["START_GAME"] = (gameId) => {
  GameManager.for(gameId).start();
};
