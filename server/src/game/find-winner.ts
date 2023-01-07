export const findWinnerId = (playersWithScores: Record<string, { score: number }>, pinkCowPlayerId: string | null): string | null => {
  const playerEntries = Object.entries(playersWithScores).sort((a, b) => {
    if (a[0] === pinkCowPlayerId) {
      return 1
    } else if (b[0] === pinkCowPlayerId) {
      return -1
    } else {
      return b[1].score - a[1].score
    }
  })

  if (playerEntries[0] && playerEntries[0][1]?.score !== playerEntries[1]?.[1]?.score) {
    const winningPlayer = playerEntries[0]
    return winningPlayer[1].score >= 8 ? winningPlayer[0] : null
  }

  return null
}