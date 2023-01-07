import { Redirect, useParams } from "react-router-dom";
import useGame from "../hooks/useGame";
import useSocketPlayer from "../hooks/useSocketPlayer";
import { GameStatus } from "../types/game.types";
import { deriveGameData } from "../utils/game-utils";
import GameIdView from "../views/GameIdView";
import LoadingGameIdView from "../views/LoadingGameIdView";
import { PATHS } from "./paths";

export default function GameIdRoute(): JSX.Element {
  const { id: gameId } = useParams<{ id: string }>();
  const game = useGame(gameId);
  const player = useSocketPlayer();

  if (game.loading) {
    return (
      <LoadingGameIdView {...{ gameId }} />
    );
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

  return (
    <GameIdView
      game={deriveGameData(game.data)}
      // we checked this existed above
      player={game.data.players[player.data.id]!}
      onApprovePrompt={() => {
        player.socket.emit('APPROVE_CURRENT_PROMPT', gameId)
      }}
      onDrawNewPrompt={(currentPromptId) => {
        player.socket.emit('DRAW_NEW_PROMPT', gameId, currentPromptId)
      }}
    />
  );
}
