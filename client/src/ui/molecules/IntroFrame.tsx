import { Image } from "@mantine/core";
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
        <Image
          src="/assets/images/herd-mentality-box-cover.png"
          styles={{
            image: {
              height: "50%",
              maxHeight: "400px",
            },
          }}
        />
      </div>
      {children}
    </div>
  );
}
