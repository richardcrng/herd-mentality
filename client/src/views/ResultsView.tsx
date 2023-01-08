import styled from "styled-components";
import { GameComplete } from "../types/game.types";
import { Player } from "../types/player.types";
import PlayerAnswerBubbles from "../ui/molecules/PlayerAnswerBubbles";

interface Props {
  game: GameComplete;
  player: Player
}

export default function ResultsIdView({
  game, player,
}: Props): JSX.Element {
  // will exist
  const winningPlayer = game.players[game.winnerId]!.name

  return (
    <Container>
      <Announcement>{winningPlayer} wins!</Announcement>
      <Message>{player.isHost ? "You can restart the game if you want" : "The host can restart the game"}</Message>
      <PlayerData>
        <PlayerAnswerBubbles
          answers={{}}
          players={game.players}
          pinkCowPlayerId={game.pinkCowPlayerId}
        />
        {/* <pre>{JSON.stringify(round.playerAnswers, null, 2)}</pre> */}
      </PlayerData>
      {/* {action && <Action className="w-full">{action}</Action>} */}
    </Container>
  );
}

const Container = styled.div.attrs({
  className: "grid h-full gap-y-4",
})`
  grid-template-areas:
    "announcement"
    "message"
    "player-data"
    "action";

  grid-template-rows: min-content min-content 1fr min-content;
`;

const Announcement = styled.h1.attrs({
  className: "text-3xl font-bold",
})`
  grid-area: question-text;
`;

const Message = styled.div`
  grid-area: message;
`;

const PlayerData = styled.div`
  grid-area: player-data;
`;

const Action = styled.div`
  grid-area: action;
`;
