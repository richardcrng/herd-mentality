export const PATHS = {
  hostNew: "/host/new" as const,
  index: "/" as const,
  gameId: "/play/:id" as const,
  gameForId: (gameId: string) => `/play/${gameId}` as const,
  learnTab: "/learn/:tab" as const,
  learnForTab: (tab: LearnTab) => `/learn/${tab}` as const,
  lobbyId: "/lobby/:id" as const,
  lobbyForGameId: (gameId: string) => `/lobby/${gameId}` as const,
  resultsId: "/results/:id" as const,
  resultsForId: (gameId: string) => `/results/${gameId}` as const,
};

export enum LearnTab {
  WELCOME = 'welcome',
  RULES = 'rules',
  APP = 'app'
}