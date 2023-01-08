import Avatar from "boring-avatars";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import { ScoredPlayer } from "../../types/player.types";

type Props = PropsWithChildren<{
  className?: string;
  isPinkCow?: boolean;
  footer?: JSX.Element | null;
  player: ScoredPlayer;
}>;

export default function PlayerAnswerBubble({
  className,
  children,
  isPinkCow,
  player,
  footer,
}: Props): JSX.Element {
  return (
    <div className={classNames("chat chat-start", className)}>
      <div
        className={classNames(
          "col-start-1 row-start-1 w-full flex justify-center",
          isPinkCow && "text-secondary"
        )}
      >
        {player.score}
      </div>
      <div className="chat-image avatar">
        <div
          className={classNames(
            "w-10 rounded-full",
            isPinkCow && "border-secondary border-4"
          )}
        >
          <Avatar name={player.name} variant='beam' />
        </div>
      </div>
      <div
        className={classNames(
          "chat-header font-semibold",
          isPinkCow && "text-secondary"
        )}
      >
        {player.name}
      </div>
      <div
        className={classNames(
          "chat-bubble",
          isPinkCow && "chat-bubble-secondary"
        )}
        style={{ opacity: children ? 1 : 0 }}
      >
        {children}
      </div>
      <div className="chat-footer" style={{ opacity: footer ? 1 : 0 }}>
        {footer}
      </div>
    </div>
  );
}
