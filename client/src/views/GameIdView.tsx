import { GameStateDerived } from "../types/game.types";
import { GameOngoingHandlers } from "../types/handler.types";
import { Player } from "../types/player.types";
import { RoundStatus } from "../types/round.types";
import RoundQuestionApprovalTemplate from "../ui/templates/RoundQuestionApprovalTemplate";

interface Props extends GameOngoingHandlers {
  game: GameStateDerived;
  player: Player;
}

export default function GameIdView({ game, player, ...handlers }: Props): JSX.Element {
  const currentRoundStatus = game.round.ongoing.status;

  if (currentRoundStatus === RoundStatus.QUESTION_APPROVAL) {
    return <RoundQuestionApprovalTemplate {...{ game, player, ...handlers }} />
  }

  return (
    <>
      <h1 className='uppercase text-3xl'>{game.round.ongoing.prompt.text}</h1>
    </>
  );
}
