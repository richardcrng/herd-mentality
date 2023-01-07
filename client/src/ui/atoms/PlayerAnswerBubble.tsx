import classNames from "classnames";
import { PropsWithChildren } from "react";
import { ScoredPlayer } from "../../types/player.types";

type Props = PropsWithChildren<{
  className?: string;
  isPinkCow?: boolean;
  footer?: JSX.Element | null;
  player: ScoredPlayer;
}>

export default function PlayerAnswerBubble({ className, children, isPinkCow, player, footer }: Props): JSX.Element {
  return (
    <div className={classNames("chat chat-start", className)}>
      <div className='col-start-1 row-start-1 w-full flex justify-center'>{player.score}</div>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="placeholder" src="https://placeimg.com/192/192/people" />
        </div>
      </div>
      <div className="chat-header">{player.name}</div>
      <div className="chat-bubble" style={{ opacity: children ? 1 : 0 }}>
        {children}
      </div>
      <div className="chat-footer" style={{ opacity: footer ? 1 : 0 }}>
        {footer}
      </div>
    </div>
  );
}