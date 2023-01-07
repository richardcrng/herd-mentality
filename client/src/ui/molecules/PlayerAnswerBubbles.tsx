import classNames from "classnames";
import styled from "styled-components";
import { MdSentimentNeutral as NeutralIcon } from "react-icons/md";
import { Player } from "../../types/player.types";
import { PlayerAnswer } from "../../types/round.types";
import PlayerAnswerBubble from "../atoms/PlayerAnswerBubble";

export interface PlayerAnswerBubblesProps {
  answers: Record<string, PlayerAnswer>;
  players: Record<string, Player>;
  renderBubbleContent?(playerAnswer: PlayerAnswer): JSX.Element | null;
  renderBubbleFooter?(playerAnswer: PlayerAnswer): JSX.Element | null;
  renderBubbleEndmark?(playerAnswer: PlayerAnswer): JSX.Element | null;
}

export default function PlayerAnswerBubbles({ answers, players, renderBubbleContent, renderBubbleFooter, renderBubbleEndmark }: PlayerAnswerBubblesProps): JSX.Element {
  const playerData = Object.values(players)

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
          <>
            <PlayerAnswerBubble
              className={classNames("col-start-1", `row-start-${idx + 1}`)}
              key={player.id}
              player={player}
              footer={renderBubbleFooter && renderBubbleFooter(playerAnswer)}
            >
              {renderBubbleContent && renderBubbleContent(playerAnswer)}
            </PlayerAnswerBubble>
            <Endmark style={{ opacity: renderBubbleEndmark ? 1 : 0 }}>
              {renderBubbleEndmark ? renderBubbleEndmark(playerAnswer) : <NeutralIcon size={32} />}
            </Endmark>
          </>
        );
      })}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
`

const Endmark = styled.span.attrs({
  className: 'flex flex-col justify-center'
})``