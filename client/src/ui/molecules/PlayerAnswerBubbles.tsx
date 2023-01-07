import { Player } from "../../types/player.types";
import { PlayerAnswer } from "../../types/round.types";
import PlayerAnswerBubble from "../atoms/PlayerAnswerBubble";

export interface PlayerAnswerBubblesProps {
  answers: Record<string, PlayerAnswer>;
  players: Record<string, Player>;
  renderBubbleContent?(playerAnswer: PlayerAnswer): JSX.Element | null;
  renderBubbleFooter?(playerAnswer: PlayerAnswer): JSX.Element | null
}

export default function PlayerAnswerBubbles({ answers, players, renderBubbleContent, renderBubbleFooter }: PlayerAnswerBubblesProps): JSX.Element {
  return (
    <>
      {Object.values(players).map(player => {
        const playerAnswer = answers[player.id] ?? {
          isLocked: false,
          isTyping: false,
          text: "",
        };

        return (
          <PlayerAnswerBubble
            key={player.id}
            player={player}
            footer={renderBubbleFooter && renderBubbleFooter(playerAnswer)}
          >
            {renderBubbleContent && renderBubbleContent(playerAnswer)}
          </PlayerAnswerBubble>
        );
      })}
    </>
  )
}