import { GameStateDerived } from "../../types/game.types"
import { GameOngoingHandlers } from "../../types/handler.types";
import { Player } from "../../types/player.types";
import { AnswerMark } from "../../types/round.types";
import PinkCow from "../atoms/PinkCow";
import RoundPageTemplate from "./RoundPageTemplate";

interface Props extends GameOngoingHandlers {
  game: GameStateDerived;
  player: Player;
}

export default function RoundAnswerModerationTemplate({ game, player }: Props): JSX.Element {

  const message = player.isHost ? "As host, please moderate the default marking. Tap on an answer to update its marking." : "Waiting for the host to moderate the marking..."

  return (
    <RoundPageTemplate
      round={game.round.ongoing}
      message={message}
      players={game.players}
      renderBubbleContent={(playerAnswer) => <span>{playerAnswer.text}</span>}
      renderBubbleFooter={(playerAnswer) => {
        switch (playerAnswer.mark) {
          case AnswerMark.HERD:
            return <span>🏅</span>;
          case AnswerMark.PINK_COW:
            return <PinkCow />;

          default:
            return <PinkCow />;

            // return null
        }
      }}
    />
  );
}
