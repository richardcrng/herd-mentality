import classNames from "classnames";
import styled from "styled-components";
import { MdSentimentNeutral as NeutralIcon } from "react-icons/md";
import { ScoredPlayer } from "../../types/player.types";
import { PlayerAnswer } from "../../types/round.types";
import PlayerAnswerBubble from "../atoms/PlayerAnswerBubble";
import { Fragment } from "react";

export interface PlayerAnswerBubblesProps {
  answers: Record<string, PlayerAnswer>;
  players: Record<string, ScoredPlayer>;
  pinkCowPlayerId: string | null;
  renderBubbleContent?(playerAnswer: PlayerAnswer): JSX.Element | null;
  renderBubbleFooter?(playerAnswer: PlayerAnswer): JSX.Element | null;
  renderBubbleEndmark?(playerAnswer: PlayerAnswer): JSX.Element | null;
}

export default function PlayerAnswerBubbles({ answers, pinkCowPlayerId, players, renderBubbleContent, renderBubbleFooter, renderBubbleEndmark }: PlayerAnswerBubblesProps): JSX.Element {
  const playerData = Object.values(players).sort((a, b) => {
    if (a.id === pinkCowPlayerId) {
      return -1
    } else if (b.id === pinkCowPlayerId) {
      return 1
    } else return b.score - a.score
  })

  return (
    <Container className={`grid-rows-${playerData.length}`}>
      {playerData.map((player, idx) => {
        const playerAnswer = answers[player.id] ?? {
          playerId: player.id,
          isLocked: false,
          isTyping: false,
          text: "",
        };

        return (
          <Fragment key={player.id}>
            <PlayerAnswerBubble
              className={classNames("col-start-1", `row-start-${idx + 1}`)}
              player={player}
              isPinkCow={player.id === pinkCowPlayerId}
              footer={renderBubbleFooter && renderBubbleFooter(playerAnswer)}
            >
              {renderBubbleContent && renderBubbleContent(playerAnswer)}
            </PlayerAnswerBubble>
            <Endmark style={{ opacity: renderBubbleEndmark ? 1 : 0 }}>
              {renderBubbleEndmark ? renderBubbleEndmark(playerAnswer) : <NeutralIcon size={32} />}
            </Endmark>
          </Fragment>
        );
      })}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
`

const Endmark = styled.span.attrs({
  className: 'flex'
})``