import { useParams } from 'react-router-dom';
import { LearnTab } from './paths';

export default function LearnTabRoute(): JSX.Element {
  const { tab } = useParams<{ tab: LearnTab }>();

  return (
    <>
      <h1>Learn more - {tab}</h1>
    </>
  )
}