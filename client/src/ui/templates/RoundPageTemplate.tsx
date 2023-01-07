import styled from "styled-components";
import { OngoingRound } from "../../types/round.types";

interface Props {
  round: OngoingRound;
  message: string;
  action?: JSX.Element;
}

export default function RoundPageTemplate({ message, round, action }: Props): JSX.Element {
  return (
    <Container>
      <QuestionText>{round.prompt.text}</QuestionText>
      <Message>{message}</Message>
      <PlayerData>
        <pre>{JSON.stringify(round.playerAnswers, null, 2)}</pre>
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

const Message = styled.p`
  grid-area: message;
`

const PlayerData = styled.div`
  grid-area: player-data;
`

const Action = styled.div`
  grid-area: action;
`