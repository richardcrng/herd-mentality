import { FiSend as SendIcon } from 'react-icons/fi'
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
      players={game.players}
      renderBubbleContent={(playerAnswer) => (
        <span>{playerAnswer.isTyping ? "..." : ""}</span>
      )}
      action={
        <div className='w-full flex gap-x-2'>
          <input
            className="input rounded-lg grow input-bordered input-info"
            type="text"
            onChange={(e) => {
              onEditAnswer(e.target.value);
              setTimeout(() => {
                onPauseTyping();
              }, 1000);
            }}
          />
          <button className='btn rounded-lg'>
            <SendIcon />
          </button>
        </div>
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
