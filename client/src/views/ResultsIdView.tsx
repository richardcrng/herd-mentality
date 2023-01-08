import styled from "styled-components";
import { MdSentimentNeutral as NeutralIcon } from "react-icons/md";
import { GiPodiumWinner as WinnerIcon } from "react-icons/gi";
import { SiHappycow as CowIcon } from "react-icons/si";
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
      <Message>
        {player.id === game.winnerId
          ? "🏆 Congratulations on your victory!"
          : player.id === game.pinkCowPlayerId
          ? "😭 Oh no. You ended as the Pink Cow..."
          : "🤷 You didn't win, but at least you're not the Pink Cow?"}
      </Message>
      <PlayerData>
        <PlayerAnswerBubbles
          answers={{}}
          players={game.players}
          pinkCowPlayerId={game.pinkCowPlayerId}
          renderBubbleEndmark={({ playerId }) => {
            if (playerId === game.winnerId) {
              return (
                <IconContainer>
                  <WinnerIcon className="fill-success" size={32} />
                </IconContainer>
              );
            } else if (playerId === game.pinkCowPlayerId) {
              return (
                <IconContainer>
                  <CowIcon className="fill-secondary" size={32} />
                </IconContainer>
              );
            } else {
              return (
                <IconContainer>
                  <NeutralIcon size={32} />
                </IconContainer>
              );
            }
          }}
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
  grid-area: announcement;
`;

const Message = styled.div.attrs({
  className: 'text-xl'
})`
  grid-area: message;
`;

const PlayerData = styled.div`
  grid-area: player-data;
`;

const IconContainer = styled.div.attrs({
  className: 'flex flex-col justify-center justify-items-end'
})``

const Action = styled.div`
  grid-area: action;
`;
