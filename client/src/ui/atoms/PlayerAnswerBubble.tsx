import { PropsWithChildren } from "react";
import { Player } from "../../types/player.types";

type Props = PropsWithChildren<{
  player: Player;
}>

export default function PlayerAnswerBubble({ children, player }: Props): JSX.Element {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt='placeholder' src="https://placeimg.com/192/192/people" />
        </div>
      </div>
      <div className="chat-header">
        {player.name}
      </div>
      <div className="chat-bubble" style={{ opacity: children ? 1 : 0 }}>{children}</div>
      {/* <div className="chat-footer opacity-50">Delivered</div> */}
    </div>
  );
}