import styled from "styled-components";
import { RoundPrompt } from "../../types/round.types";

interface Props {
  prompt: RoundPrompt;
  message: string;
}

export default function RoundPageTemplate({ message, prompt }: Props): JSX.Element {
  return (
    <Container>
        <QuestionText>{prompt.text}</QuestionText>
        <Message>{message}</Message>
    </Container>
  );
}

const Container = styled.div`
  grid-template-areas:
    "question-text"
    "message"
    "player-data";
`

const QuestionText = styled.h1.attrs({
  className: 'uppercase text-3xl'
})`
  grid-area: question-text;
`

const Message = styled.p`
  grid-area: message;
`