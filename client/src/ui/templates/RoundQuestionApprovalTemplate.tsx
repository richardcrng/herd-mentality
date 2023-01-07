import { GameStateDerived } from "../../types/game.types"
import { Player } from "../../types/player.types";

interface Props {
  game: GameStateDerived;
  player: Player;
}

export default function RoundQuestionApprovalTemplate(props: Props): JSX.Element {

  if (props.player.isHost) {
    return <RoundQuestionApprovalAsHost {...props} />
  }
  
  return <RoundQuestionApprovalNonHost {...props} />
}

function RoundQuestionApprovalAsHost({ game }: Props) {
  return (
    <>
      <h1 className="uppercase text-3xl">{game.round.ongoing.prompt.text}</h1>
      <p>As host, you can approve this question or draw another.</p>
    </>
  );
}

function RoundQuestionApprovalNonHost({ game }: Props) {
  return (
    <>
      <h1 className="uppercase text-3xl">{game.round.ongoing.prompt.text}</h1>
      <p>Waiting for host to draw the next question...</p>
    </>
  );
}