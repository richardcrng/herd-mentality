import styled from "styled-components";
import { ScoredPlayer } from "../../types/player.types";
import { OngoingRound } from "../../types/round.types";
import PlayerAnswerBubbles, {
  PlayerAnswerBubblesProps,
} from "../molecules/PlayerAnswerBubbles";

interface Props {
  round: OngoingRound;
  message: string | JSX.Element;
  action?: JSX.Element;
  pinkCowPlayerId: string | null;
  players: Record<string, ScoredPlayer>;
  renderBubbleContent?: PlayerAnswerBubblesProps["renderBubbleContent"];
  renderBubbleEndmark?: PlayerAnswerBubblesProps["renderBubbleEndmark"];
  renderBubbleFooter?: PlayerAnswerBubblesProps["renderBubbleFooter"];
}

export default function RoundPageTemplate({
  message,
  round,
  action,
  pinkCowPlayerId,
  players,
  renderBubbleContent,
  renderBubbleEndmark,
  renderBubbleFooter,
}: Props): JSX.Element {
  return (
    <Container>
      <QuestionText>{round.prompt.text}</QuestionText>
      <Message>{message}</Message>
      <PlayerData>
        <PlayerAnswerBubbles
          {...{
            players,
            pinkCowPlayerId,
            renderBubbleContent,
            renderBubbleEndmark,
            renderBubbleFooter,
          }}
          answers={round.playerAnswers}
        />
        {/* <pre>{JSON.stringify(round.playerAnswers, null, 2)}</pre> */}
      </PlayerData>
      {action && <Action className="w-full">{action}</Action>}
    </Container>
  );
}

const Container = styled.div.attrs({
  className: "grid h-full gap-y-4",
})`
  grid-template-areas:
    "question-text"
    "message"
    "player-data"
    "action";

  grid-template-rows: min-content min-content 1fr min-content;
`;

const QuestionText = styled.h1.attrs({
  className: "uppercase text-3xl font-bold",
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
