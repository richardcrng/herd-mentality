import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import LearnTabView, { LearnTab } from '../views/LearnTabView';
import { useHistory } from 'react-router';
import { PATHS } from './paths';

export default function LearnTabRoute(): JSX.Element {
  const { tab } = useParams<{ tab: LearnTab }>();

  const history = useHistory();

  const { isLoading, data } = useQuery({
    queryKey: 'learn-docs',
    queryFn: async () => {
      const [welcome, rules, app] = await Promise.all([
        fetch(
          "https://raw.githubusercontent.com/richardcrng/herd-mentality/main/docs/WELCOME.md"
        ),
        fetch(
          "https://raw.githubusercontent.com/richardcrng/herd-mentality/main/docs/RULES.md"
        ),
        fetch(
          "https://raw.githubusercontent.com/richardcrng/herd-mentality/main/docs/APP.md"
        ),
      ].map(fetchResponse => fetchResponse.then(res => res.text())));

      return { welcome, rules, app }
    }
  })

  if (isLoading) {
    return <p>loading...</p>
  }

  if (!data) {
    return <p>fail</p>
  }

  return (
    <LearnTabView
      markdownDict={{
        [LearnTab.WELCOME]: data.welcome!,
        [LearnTab.RULES]: data.rules!,
        [LearnTab.APP]: data.app!,
      }}
      onBackHome={() => history.push(PATHS.index)}
      onTabChange={(t) => history.push(PATHS.learnForTab(t))}
      tab={tab}
    />
  );
}