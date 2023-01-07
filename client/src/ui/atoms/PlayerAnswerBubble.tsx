import { PropsWithChildren } from "react";
import { Player } from "../../types/player.types";
import { PlayerAnswer } from "../../types/round.types";

type Props<A extends PlayerAnswer> = PropsWithChildren<{
  player: Player;
  footer?: JSX.Element | null;
}>

export default function PlayerAnswerBubble<A extends PlayerAnswer>({ children, player, footer }: Props<A>): JSX.Element {
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
      <div className="chat-footer" style={{ opacity: footer ? 1 : 0 }}>{footer}</div>
    </div>
  );
}