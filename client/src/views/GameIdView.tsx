import { GameStateDerived } from "../types/game.types";
import { Player } from "../types/player.types";
import { RoundStatus } from "../types/round.types";
import RoundQuestionApprovalTemplate from "../ui/templates/RoundQuestionApprovalTemplate";

interface Props {
  game: GameStateDerived;
  player: Player;
}

export default function GameIdView({ game, player }: Props): JSX.Element {
  const currentRoundStatus = game.round.ongoing.status;

  if (currentRoundStatus === RoundStatus.QUESTION_APPROVAL) {
    return <RoundQuestionApprovalTemplate {...{ game, player }} />
  }

  return (
    <>
      <h1 className='uppercase text-3xl'>{game.round.ongoing.prompt.text}</h1>
    </>
  );
}
