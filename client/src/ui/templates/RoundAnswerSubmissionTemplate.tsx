import { GameStateDerived } from "../../types/game.types"
import { GameOngoingHandlers } from "../../types/handler.types";
import { Player } from "../../types/player.types";
import RoundPageTemplate from "./RoundPageTemplate";

interface Props extends GameOngoingHandlers {
  game: GameStateDerived;
  player: Player;
}

export default function RoundAnswerSubmissionTemplate({ game, player }: Props): JSX.Element {

  const currentPrompt = game.round.ongoing.prompt;

  const message = "Type your answer at the bottom"

  return (
    <RoundPageTemplate
      prompt={currentPrompt}
      message={message}
      action={({ style }) => (
        <input
          className='input w-full input-bordered input-info'
          style={style}
          type='text'
        />
      )}
    />
  )
}
