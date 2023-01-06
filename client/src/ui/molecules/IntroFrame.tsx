import classNames from "classnames";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function IntroFrame({
  className,
  children,
}: Props): JSX.Element {
  return (
    <div className={classNames("h-full", className)}>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">{"Herd Mentality"}</h1>
        <img
          alt="Herd Mentality"
          className="object-scale-down h-[40vh] w-auto"
          src="/assets/images/herd-mentality-box-cover.png"
        />
      </div>
      {children}
    </div>
  );
}
