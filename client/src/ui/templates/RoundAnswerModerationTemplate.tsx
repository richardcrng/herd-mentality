import { GameStateDerived } from "../../types/game.types"
import { GameOngoingHandlers } from "../../types/handler.types";
import { Player } from "../../types/player.types";
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
      //   action={player.isHost ? (
      //     <div
      //       className='w-full btn-group btn-group-horizontal'
      //     >
      //       <button
      //         className='btn btn-error w-1/2'
      //         onClick={() => onDrawNewPrompt(currentPrompt.id)}
      //       >
      //         Draw new
      //       </button>
      //       <button
      //         className='btn btn-success w-1/2'
      //         onClick={onApprovePrompt}
      //       >
      //         Approve
      //       </button>
      //     </div>
      //   ) : undefined}
    />
  );
}
