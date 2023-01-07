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

export default function RoundAnswerModerationTemplate({ game, player, onConfirmMarks, onModerateAnswer }: Props): JSX.Element {

  const message = player.isHost ? "As host, please moderate the default marking. Tap on an answer's mark on the right to update it." : "Waiting for the host to moderate the marking..."

  const createMarkHandler = (playerId: string, newMark: AnswerMark | null) => () => {
    onModerateAnswer(playerId, newMark)
  }

  return (
    <RoundPageTemplate
      round={game.round.ongoing}
      message={message}
      pinkCowPlayerId={game.pinkCowPlayerId}
      players={game.players}
      renderBubbleContent={(playerAnswer) => <span>{playerAnswer.text}</span>}
      renderBubbleEndmark={(playerAnswer) => {
        switch (playerAnswer.mark) {
          case AnswerMark.HERD:
            return (
              <ButtonContainer
                onClick={createMarkHandler(
                  playerAnswer.playerId,
                  AnswerMark.PINK_COW
                )}
              >
                <button className="btn-sm btn btn-outline btn-success">
                  <WinnerIcon size={32} />
                </button>
                <MarkText className="text-success">Herd</MarkText>
              </ButtonContainer>
            );

          case AnswerMark.PINK_COW:
            return (
              <ButtonContainer
                onClick={createMarkHandler(playerAnswer.playerId, null)}
              >
                <button className="btn-sm btn btn-outline btn-secondary">
                  <CowIcon size={32} />
                </button>
                <MarkText className="text-secondary">Pink cow</MarkText>
              </ButtonContainer>
            );

          case undefined:
          case null:
            return (
              <ButtonContainer
                onClick={createMarkHandler(
                  playerAnswer.playerId,
                  AnswerMark.HERD
                )}
              >
                <button className="btn-sm btn btn-outline">
                  <NeutralIcon size={32} />
                </button>
                <MarkText>Neutral</MarkText>
              </ButtonContainer>
            );
        }
      }}
      action={player.isHost ? (
        <button
          className='btn btn-block'
          onClick={onConfirmMarks}
        >
          Confirm marks
        </button>
      ) : undefined}
    />
  );
}

const ButtonContainer = styled.div.attrs({
  className: 'flex flex-col justify-end'
})``

const MarkText = styled.p`
  text-align: center;
  font-weight: 600;
`
