import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import classNames from "classnames";

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

export default function LearnTabView({
  markdownDict,
  onBackHome,
  onTabChange,
  tab,
}: Props): JSX.Element {
  return (
    <Container>
      <Tabs>
        {Object.values(LearnTab).map((t) => (
          <span
            key={t}
            className={classNames("tab tab-lifted", t === tab && "tab-active")}
            onClick={() => onTabChange(t)}
          >
            {t}
          </span>
        ))}
      </Tabs>
      <Content>
        <Markdown>{markdownDict[tab]}</Markdown>
        {tab === LearnTab.WELCOME && (
          <button
            className="btn btn-block btn-primary"
            onClick={() => onTabChange(LearnTab.RULES)}
          >
            Game rules
          </button>
        )}
        {tab === LearnTab.RULES && (
          <button
            className="btn btn-block btn-primary"
            onClick={() => onTabChange(LearnTab.APP)}
          >
            Using this app
          </button>
        )}
      </Content>
      <ActionButton onClick={onBackHome}>Back to home</ActionButton>
    </Container>
  );
}

const Container = styled.div.attrs({
  className: "h-full grid gap-y-2",
})`
  grid-template-areas:
    "tabs"
    "content"
    "action";

  grid-template-rows: min-content 1fr min-content;
`;

const Tabs = styled.div.attrs({
  className: "tabs",
})`
  grid-area: tabs;
`;

const Content = styled.div.attrs({
  className: "overflow-y-scroll",
})`
  grid-area: content;
`;

const Markdown = styled(ReactMarkdown).attrs({
  className: "prose pb-4",
})``;

const ActionButton = styled.button.attrs({
  className: "btn btn-block",
})`
  grid-area: action;
`;
