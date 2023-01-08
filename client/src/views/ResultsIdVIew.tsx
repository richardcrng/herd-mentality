import { GameComplete } from "../types/game.types";
import { Player } from "../types/player.types";

interface Props {
  game: GameComplete;
  player: Player;
}

export default function ResultsIdView({ game, player }: Props): JSX.Element {

  return (
    <>
      <h1 className='uppercase text-3xl'>Game complete!</h1>
    </>
  );
}
