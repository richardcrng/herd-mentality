import ReactMarkdown from 'react-markdown'

export enum LearnTab {
  WELCOME = "welcome",
  RULES = "rules",
  APP = "app",
}

interface Props {
  markdownDict: Record<LearnTab, string>;
  tab: LearnTab;
}

export default function LearnTabView({ markdownDict, tab }: Props): JSX.Element {
return (
  <>
    <div className='h-full overflow-y-scroll prose'>
      <ReactMarkdown>{markdownDict[tab]}</ReactMarkdown>
    </div>
  </>
);
}