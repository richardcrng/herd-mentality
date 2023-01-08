import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import useMobileVH from "./hooks/useMobileVH";
import HostNewRoute from "./routes/HostNewRoute";
import IndexRoute from "./routes/IndexRoute";
import LobbyIdRoute from "./routes/LobbyIdRoute";
import { PATHS } from "./routes/paths";
import GameIdRoute from "./routes/GameIdRoute";
import ResultsIdRoute from "./routes/ResultsIdRoute";
import LearnTabRoute from "./routes/LearnTabRoute";
import { LearnTab } from "./views/LearnTabView";

function App(): JSX.Element {
  useMobileVH();

  return (
    <Router>
      <AppBackground>
        <AppContainer>
          <Switch>
            {/* Main game routes */}
            <Route exact path={PATHS.hostNew} component={HostNewRoute} />
            <Route exact path={PATHS.lobbyId} component={LobbyIdRoute} />
            <Route exact path={PATHS.gameId} component={GameIdRoute} />
            <Route exact path={PATHS.resultsId} component={ResultsIdRoute} />

            {/* Learning routes */}
            <Route exact path={'/learn'} component={() => <Redirect to={PATHS.learnForTab(LearnTab.WELCOME)} />} />
            <Route exact path={PATHS.learnTab} component={LearnTabRoute} />

            {/* Index */}
            <Route path={PATHS.index} component={IndexRoute} />
          </Switch>
        </AppContainer>
      </AppBackground>
    </Router>
  );
}

const AppBackground = styled.div.attrs({
  className: "h-viewport w-[100vw]",
})`
  padding: 10px;
  background-image: url("/assets/images/herd-mentality-background.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppContainer = styled.div.attrs({
  className: "h-app w-app rounded-lg",
})`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 5px;
`;

export default App;
