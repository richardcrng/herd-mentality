import styled from "styled-components";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default function PinkCow({ className, style }: Props): JSX.Element {
  return <PinkContainer {...{ className, style }}>🐄</PinkContainer>;
}

const PinkContainer = styled.span`
  color: transparent;
  text-shadow: 0 0 0 pink;
`;
