import { GameOngoing } from "../types/game.types";
import { GameOngoingHandlers } from "../types/handler.types";
import { Player } from "../types/player.types";
import { RoundStatus } from "../types/round.types";
import RoundAnswerModerationTemplate from "../ui/templates/RoundAnswerModerationTemplate";
import RoundAnswerSubmissionTemplate from "../ui/templates/RoundAnswerSubmissionTemplate";
import RoundQuestionApprovalTemplate from "../ui/templates/RoundQuestionApprovalTemplate";

interface Props extends GameOngoingHandlers {
  game: GameOngoing;
  player: Player;
}

export default function GameIdView({
  game,
  player,
  ...handlers
}: Props): JSX.Element {
  const currentRoundStatus = game.round.ongoing.status;

  switch (currentRoundStatus) {
    case RoundStatus.QUESTION_APPROVAL:
      return (
        <RoundQuestionApprovalTemplate {...{ game, player, ...handlers }} />
      );
    case RoundStatus.ANSWER_SUBMISSIONS:
      return (
        <RoundAnswerSubmissionTemplate {...{ game, player, ...handlers }} />
      );
    case RoundStatus.ANSWER_MODERATION:
      return (
        <RoundAnswerModerationTemplate {...{ game, player, ...handlers }} />
      );
  }
}
