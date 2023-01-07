import {
  ClientEvent,
  ClientEventListeners,
  ServerSocket,
} from "../../client/src/types/event.types";
import {
  approveCurrentPrompt,
  createHostGame,
  drawNewPrompt,
  getGame,
  joinGame,
  kickPlayer,
  startGame,
} from "./controllers";

export const addListeners = (socket: ServerSocket): void => {
  const listeners: ClientEventListeners = {
    APPROVE_CURRENT_PROMPT: approveCurrentPrompt,
    CREATE_HOST_GAME: createHostGame,
    DRAW_NEW_PROMPT: drawNewPrompt,
    GET_GAME: getGame,
    JOIN_GAME: joinGame,
    KICK_PLAYER: kickPlayer,
    START_GAME: startGame,
  };

  for (const [event, listener] of Object.entries(listeners) as [
    ClientEvent,
    ClientEventListeners[ClientEvent]
  ][]) {
    socket.on(event, listener);
  }
};
