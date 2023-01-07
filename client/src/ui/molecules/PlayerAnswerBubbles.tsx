import { Player } from "../../types/player.types";
import { PlayerAnswer } from "../../types/round.types";
import PlayerAnswerBubble from "../atoms/PlayerAnswerBubble";

interface Props {
  answers: Record<string, PlayerAnswer>;
  players: Record<string, Player>;
}

export default function PlayerAnswerBubbles({ answers, players }: Props): JSX.Element {
  return (
    <>
      {Object.values(players).map(p => (
        <PlayerAnswerBubble key={p.id} />
      ))}
    </>
  )
}