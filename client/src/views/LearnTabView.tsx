import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import classNames from 'classnames';

export enum LearnTab {
  WELCOME = "welcome",
  RULES = "rules",
  APP = "app",
}

interface Props {
  markdownDict: Record<LearnTab, string>;
  onBackHome(): void;
  onTabChange(newTab: LearnTab): void;
  tab: LearnTab;
}

export default function LearnTabView({ markdownDict, onBackHome, onTabChange, tab }: Props): JSX.Element {
  return (
    <Container>
      <Tabs>
        {Object.values(LearnTab).map(t => (
          <span
            key={t}
            className={classNames("tab tab-lifted", t === tab && 'tab-active')}
            onClick={() => onTabChange(t)}
          >
            {t}
          </span>
        ))}
      </Tabs>
      <Markdown>{markdownDict[tab]}</Markdown>
      <ActionButton onClick={onBackHome}>Back to home</ActionButton>
    </Container>
  );
}

const Container = styled.div.attrs({
  className: 'h-full grid'
})`
  grid-template-areas:
    "tabs"
    "markdown"
    "action";

  grid-template-rows: min-content 1fr min-content;
`

const Tabs = styled.div.attrs({
  className: 'tabs'
})`
  grid-area: tabs;
`

const Markdown = styled(ReactMarkdown).attrs({
  className: 'overflow-y-scroll prose'
})`
  grid-area: markdown;
`

const ActionButton = styled.button.attrs({
  className: 'btn btn-block'
})`
  grid-area: action;
`