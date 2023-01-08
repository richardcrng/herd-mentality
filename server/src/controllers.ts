import { ClientEventListeners } from "../../client/src/types/event.types";
import { CompletedRound, LockedPlayerAnswer, PlayerAnswer, RoundStatus } from "../../client/src/types/round.types";
import { GameManager } from "./game/manager";
import { deriveGameData, isEveryPlayerAnswerSubmitted } from '../../client/src/utils/game-utils';
import { GameStatus } from "../../client/src/types/game.types";

export const approveCurrentPrompt: ClientEventListeners['APPROVE_CURRENT_PROMPT'] = (gameId) => {
  GameManager.for(gameId).update(g => {
    g.round.ongoing.status = RoundStatus.ANSWER_SUBMISSIONS
    g.round.ongoing.playerAnswers = Object.keys(g.players).reduce(
      (acc, playerId) => ({
        ...acc,
        [playerId]: { playerId, isTyping: false, isLocked: false, text: '', mark: null }
      }),
      {} as Record<string, PlayerAnswer>
    )
  })
}

export const confirmMarks: ClientEventListeners['CONFIRM_MARKS'] = (gameId) => {
  const gameManager = GameManager.for(gameId)
  gameManager.update(g => {

    g.round.completed.push({
      ...g.round.ongoing,
      status: RoundStatus.COMPLETE
    } as CompletedRound)
  })

  const derivedData = deriveGameData(gameManager.snapshotOrFail())

  if (derivedData.winnerId) {
    gameManager.update(g => {
      g.status = GameStatus.COMPLETE
    })
  } else {
    gameManager.drawNewPrompt()
  }

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
  GameManager.for(gameId).setPlayerAnswer(playerId, {
    playerId,
    isLocked: false,
    isTyping: true,
    text: newAnswer
  })
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

export const lockAnswer: ClientEventListeners['LOCK_ANSWER'] = (gameId, playerId) => {
  const gameManager = GameManager.for(gameId)
  
  gameManager.setPlayerAnswer(playerId, (prevAnswer) => ({
    ...prevAnswer,
    isLocked: true,
    isTyping: false
  }))

  gameManager.update(g => {
    if (isEveryPlayerAnswerSubmitted(g.round.ongoing.playerAnswers)) {
      g.round.ongoing.status = RoundStatus.ANSWER_MODERATION

      for (const id in g.players) {
        g.round.ongoing.playerAnswers[id] = {
          // okay to assert - we've just checked
          ...g.round.ongoing.playerAnswers[id] as LockedPlayerAnswer,
          mark: null
        };
      }
    }
  })
}

export const moderateAnswerMark: ClientEventListeners['MODERATE_ANSWER_MARK'] = (gameId, playerId, mark) => {
  GameManager.for(gameId).setPlayerAnswer(playerId, (prev) => ({
    ...prev,
    mark
  }))
}

export const pausePlayerTyping: ClientEventListeners['PAUSE_PLAYER_TYPING'] = (gameId, playerId) => {
  GameManager.for(gameId).setPlayerAnswer(playerId, (prevAnswer) => ({ ...prevAnswer, isTyping: false }))
}

export const startGame: ClientEventListeners["START_GAME"] = (gameId) => {
  GameManager.for(gameId).start();
};
