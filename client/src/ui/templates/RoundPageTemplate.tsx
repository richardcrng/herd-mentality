import styled from "styled-components";
import { Player } from "../../types/player.types";
import { OngoingRound } from "../../types/round.types";
import PlayerAnswerBubbles, { PlayerAnswerBubblesProps } from "../molecules/PlayerAnswerBubbles";

interface Props {
  round: OngoingRound;
  message: string | JSX.Element;
  action?: JSX.Element;
  players: Record<string, Player>;
  renderBubbleContent?: PlayerAnswerBubblesProps['renderBubbleContent']
}

export default function RoundPageTemplate({ message, round, action, players, renderBubbleContent }: Props): JSX.Element {
  return (
    <Container>
      <QuestionText>{round.prompt.text}</QuestionText>
      <Message>{message}</Message>
      <PlayerData>
        <PlayerAnswerBubbles
          {...{ players, renderBubbleContent }}
          answers={round.playerAnswers}
        />
        {/* <pre>{JSON.stringify(round.playerAnswers, null, 2)}</pre> */}
      </PlayerData>
      {action && <Action className='w-full'>{action}</Action>}
    </Container>
  );
}

const Container = styled.div.attrs({
  className: 'grid h-full'
})`
  grid-template-areas:
    "question-text"
    "message"
    "player-data"
    "action";

  grid-template-rows: min-content min-content 1fr min-content;
`

const QuestionText = styled.h1.attrs({
  className: 'uppercase text-3xl font-bold'
})`
  grid-area: question-text;
`

const Message = styled.div`
  grid-area: message;
`

const PlayerData = styled.div`
  grid-area: player-data;
`

const Action = styled.div`
  grid-area: action;
`