import styled from "styled-components";
import { RoundPrompt } from "../../types/round.types";

interface Props {
  prompt: RoundPrompt;
  message: string;
  action?: React.FC<{ style: React.CSSProperties }>;
}

export default function RoundPageTemplate({ message, prompt, action: Action }: Props): JSX.Element {
  return (
    <Container>
        <QuestionText>{prompt.text}</QuestionText>
        <Message>{message}</Message>
        {Action && <Action style={{ gridArea: 'action' }} />}
    </Container>
  );
}

const Container = styled.div`
  grid-template-areas:
    "question-text"
    "message"
    "player-data"
    "action";
`

const QuestionText = styled.h1.attrs({
  className: 'uppercase text-3xl'
})`
  grid-area: question-text;
`

const Message = styled.p`
  grid-area: message;
`