import { Redirect, useParams } from "react-router-dom";
import useGame from "../hooks/useGame";
import useSocketPlayer from "../hooks/useSocketPlayer";
import { GameStatus } from "../types/game.types";
import GameIdView from "../views/GameIdView";
import LoadingGameIdView from "../views/LoadingGameIdView";
import { PATHS } from "./paths";

export default function GameIdRoute(): JSX.Element {
  const { id: gameId } = useParams<{ id: string }>();
  const game = useGame(gameId);
  const player = useSocketPlayer();

  if (game.loading) {
    return <LoadingGameIdView {...{ gameId }} />;
  }

  if (!game.data) {
    return <Redirect to={PATHS.index} />;
  }

  if (!game.data.players[player.data.id]) {
    const redirect =
      game.data.status === GameStatus.LOBBY
        ? PATHS.lobbyForGameId(game.data.id)
        : PATHS.index;

    return <Redirect to={redirect} />;
  }

  if (game.data.status === GameStatus.LOBBY) {
    return <Redirect to={PATHS.lobbyForGameId(gameId)} />;
  }

  if (game.data.status === GameStatus.COMPLETE) {
    return <Redirect to={PATHS.resultsForId(gameId)} />;
  }

  return (
    <GameIdView
      game={game.data}
      // we checked this existed above
      player={game.data.players[player.data.id]!}
      onApprovePrompt={() => {
        player.socket.emit("APPROVE_CURRENT_PROMPT", gameId);
      }}
      onConfirmMarks={() => {
        player.socket.emit("CONFIRM_MARKS", gameId);
      }}
      onDrawNewPrompt={(currentPromptId) => {
        player.socket.emit("DRAW_NEW_PROMPT", gameId, currentPromptId);
      }}
      onEditAnswer={(newAnswer) => {
        player.socket.emit("EDIT_ANSWER", gameId, player.data.id, newAnswer);
      }}
      onLockAnswer={() => {
        player.socket.emit("LOCK_ANSWER", gameId, player.data.id);
      }}
      onModerateAnswer={(playerId, newMark) => {
        player.socket.emit("MODERATE_ANSWER_MARK", gameId, playerId, newMark);
      }}
      onPauseTyping={() => {
        player.socket.emit("PAUSE_PLAYER_TYPING", gameId, player.data.id);
      }}
    />
  );
}
