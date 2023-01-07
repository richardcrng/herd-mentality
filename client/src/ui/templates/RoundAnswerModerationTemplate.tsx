import { MdSentimentNeutral as NeutralIcon } from 'react-icons/md'
import { GiPodiumWinner as WinnerIcon } from "react-icons/gi";
import { SiHappycow as CowIcon } from "react-icons/si";
import { GameStateDerived } from "../../types/game.types"
import { GameOngoingHandlers } from "../../types/handler.types";
import { Player } from "../../types/player.types";
import { AnswerMark } from "../../types/round.types";
import RoundPageTemplate from "./RoundPageTemplate";
import styled from 'styled-components';

interface Props extends GameOngoingHandlers {
  game: GameStateDerived;
  player: Player;
}

export default function RoundAnswerModerationTemplate({ game, player, onModerateAnswer }: Props): JSX.Element {

  const message = player.isHost ? "As host, please moderate the default marking. Tap on an answer to update its marking." : "Waiting for the host to moderate the marking..."

  const createMarkHandler = (playerId: string, newMark: AnswerMark | null) => () => {
    onModerateAnswer(playerId, newMark)
  }

  return (
    <RoundPageTemplate
      round={game.round.ongoing}
      message={message}
      players={game.players}
      renderBubbleContent={(playerAnswer) => <span>{playerAnswer.text}</span>}
      renderBubbleEndmark={(playerAnswer) => {
        switch (playerAnswer.mark) {
          case AnswerMark.HERD:
            return (
              <ButtonContainer>
                <button
                  className="btn-sm btn btn-outline btn-success"
                  onClick={createMarkHandler(
                    playerAnswer.playerId,
                    AnswerMark.PINK_COW
                  )}
                >
                  <WinnerIcon size={32} />
                </button>
              </ButtonContainer>
            );

          case AnswerMark.PINK_COW:
            return (
              <ButtonContainer>
                <button className="btn-sm btn btn-outline btn-secondary">
                  <CowIcon
                    size={32}
                    onClick={createMarkHandler(playerAnswer.playerId, null)}
                  />
                </button>
              </ButtonContainer>
            );

          case undefined:
          case null:
            return (
              <ButtonContainer>
                <button
                  className="btn-sm btn btn-outline"
                  onClick={createMarkHandler(
                    playerAnswer.playerId,
                    AnswerMark.HERD
                  )}
                >
                  <NeutralIcon size={32} />
                </button>
              </ButtonContainer>
            );
        }
      }}
    />
  );
}

const ButtonContainer = styled.div.attrs({
  className: 'flex flex-col justify-end'
})``
