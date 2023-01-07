import { GameStateDerived } from "../../types/game.types"
import { Player } from "../../types/player.types";
import RoundPageTemplate from "./RoundPageTemplate";

interface Props {
  game: GameStateDerived;
  player: Player;
}

export default function RoundQuestionApprovalTemplate({ game, player }: Props): JSX.Element {

  const message = player.isHost ? "As host, you can approve this question or draw another" : "Waiting for the host to approve this question or draw another"

  return (
    <RoundPageTemplate
      prompt={game.round.ongoing.prompt}
      message={message}
      action={player.isHost ? ({ style }) => (
        <div
          className='w-full btn-group btn-group-horizontal'
          style={style}
        >
          <button className='btn btn-error w-1/2'>Draw new</button>
          <button className='btn btn-success w-1/2'>Approve</button>
        </div>
      ) : undefined}
    />
  )
}
