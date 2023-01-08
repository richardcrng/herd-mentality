import { Redirect, useParams } from "react-router-dom";
import useGame from "../hooks/useGame";
import useSocketPlayer from "../hooks/useSocketPlayer";
import { GameStatus } from "../types/game.types";
import LoadingGameIdView from "../views/LoadingGameIdView";
import ResultsIdView from "../views/ResultsIdView";
import { PATHS } from "./paths";

export default function ResultsIdRoute(): JSX.Element {
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

  if (game.data.status === GameStatus.LOBBY) {
    return <Redirect to={PATHS.lobbyForGameId(gameId)} />;
  }

  if (game.data.status === GameStatus.ONGOING) {
    return <Redirect to={PATHS.gameForId(gameId)} />;
  }

  return (
    <ResultsIdView
      game={game.data}
      // we checked this existed above
      player={game.data.players[player.data.id]!}
      onGameRestart={() => {
        player.socket.emit('RESTART_GAME', gameId)
      }}
    />
  );
}
