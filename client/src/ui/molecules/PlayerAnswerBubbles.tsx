import { Player } from "../../types/player.types";
import { PlayerAnswer } from "../../types/round.types";
import PlayerAnswerBubble from "../atoms/PlayerAnswerBubble";

export interface PlayerAnswerBubblesProps {
  answers: Record<string, PlayerAnswer>;
  players: Record<string, Player>;
  renderBubbleContent?(playerAnswer: PlayerAnswer): JSX.Element | null;
}

export default function PlayerAnswerBubbles({ answers, players, renderBubbleContent }: PlayerAnswerBubblesProps): JSX.Element {
  return (
    <>
      {Object.values(players).map(player => (
        <PlayerAnswerBubble key={player.id} player={player}>
          {renderBubbleContent && renderBubbleContent(answers[player.id] ?? { isLocked: false, isTyping: false, text: '' })}
        </PlayerAnswerBubble>
      ))}
    </>
  )
}