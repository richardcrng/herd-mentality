import { GameStateDerived } from "../../types/game.types"
import { GameOngoingHandlers } from "../../types/handler.types";
import { Player } from "../../types/player.types";
import RoundPageTemplate from "./RoundPageTemplate";

interface Props extends GameOngoingHandlers {
  game: GameStateDerived;
  player: Player;
}

export default function RoundQuestionApprovalTemplate({ game, player, onApprovePrompt, onDrawNewPrompt }: Props): JSX.Element {

  const currentPrompt = game.round.ongoing.prompt;

  const message = player.isHost ? "As host, you can approve this question or draw another" : "Waiting for the host to approve this question or draw another"

  return (
    <RoundPageTemplate
      round={game.round.ongoing}
      message={message}
      players={game.players}
      action={player.isHost ? (
        <div
          className='w-full btn-group btn-group-horizontal'
        >
          <button
            className='btn btn-error w-1/2'
            onClick={() => onDrawNewPrompt(currentPrompt.id)}
          >
            Draw new
          </button>
          <button
            className='btn btn-success w-1/2'
            onClick={onApprovePrompt}
          >
            Approve
          </button>
        </div>
      ) : undefined}
    />
  )
}
