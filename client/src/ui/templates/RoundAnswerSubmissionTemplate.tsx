import { GameStateDerived } from "../../types/game.types"
import { GameOngoingHandlers } from "../../types/handler.types";
import { Player } from "../../types/player.types";
import RoundPageTemplate from "./RoundPageTemplate";

interface Props extends GameOngoingHandlers {
  game: GameStateDerived;
  player: Player;
}

export default function RoundAnswerSubmissionTemplate({ game, player, onEditAnswer, onPauseTyping }: Props): JSX.Element {
  const message = "Type your answer at the bottom"

  return (
    <RoundPageTemplate
      round={game.round.ongoing}
      message={message}
      action={
        <input
          className="input w-full input-bordered input-info"
          type="text"
          onChange={(e) => {
            onEditAnswer(e.target.value);
            // setTimeout(() => {

            // })
          }}
        />
      }
    />
  );
}

// interface InputProps {
//   onEditAnswer: GameOngoingHandlers['onEditAnswer'];
//   style: React.CSSProperties;
// }

// function Input({ onEditAnswer, style }: InputProps): JSX.Element {
//   const [typedAnswer, setTypedAnswer] = useState("");

//   return (
//     <input
//       className="input w-full input-bordered input-info"
//       style={style}
//       type="text"
//       onChange={(e) => {
//         onEditAnswer(e.target.value);
//       }}
//       value={}
//     />
//   );
// }
