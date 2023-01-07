import {
  ClientEvent,
  ClientEventListeners,
  ServerSocket,
} from "../../client/src/types/event.types";
import {
  approveCurrentPrompt,
  createHostGame,
  drawNewPrompt,
  editAnswer,
  getGame,
  joinGame,
  kickPlayer,
  lockAnswer,
  moderateAnswerMark,
  pausePlayerTyping,
  startGame,
} from "./controllers";

export const addListeners = (socket: ServerSocket): void => {
  const listeners: ClientEventListeners = {
    APPROVE_CURRENT_PROMPT: approveCurrentPrompt,
    CREATE_HOST_GAME: createHostGame,
    DRAW_NEW_PROMPT: drawNewPrompt,
    EDIT_ANSWER: editAnswer,
    GET_GAME: getGame,
    JOIN_GAME: joinGame,
    LOCK_ANSWER: lockAnswer,
    KICK_PLAYER: kickPlayer,
    MODERATE_ANSWER_MARK: moderateAnswerMark,
    PAUSE_PLAYER_TYPING: pausePlayerTyping,
    START_GAME: startGame,
  };

  for (const [event, listener] of Object.entries(listeners) as [
    ClientEvent,
    ClientEventListeners[ClientEvent]
  ][]) {
    socket.on(event, listener);
  }
};
