// Historical head-to-head results since 2018 (World Cup, Copa America, Euro, Nations League, friendlies)
export interface HistoricalMatch {
  date: string;
  team1: string;
  team2: string;
  score: [number, number];
  competition: string;
}

export const historicalMatches: HistoricalMatch[] = [
  // 2022 World Cup
  { date: "2022-12-18", team1: "Argentina", team2: "France", score: [3, 3], competition: "Copa 2022 Final" },
  { date: "2022-12-14", team1: "Argentina", team2: "Croatia", score: [3, 0], competition: "Copa 2022 Semi" },
  { date: "2022-12-14", team1: "France", team2: "Morocco", score: [2, 0], competition: "Copa 2022 Semi" },
  { date: "2022-12-10", team1: "Morocco", team2: "Portugal", score: [1, 0], competition: "Copa 2022 Quartas" },
  { date: "2022-12-10", team1: "England", team2: "France", score: [1, 2], competition: "Copa 2022 Quartas" },
  { date: "2022-12-09", team1: "Croatia", team2: "Brazil", score: [1, 1], competition: "Copa 2022 Quartas" },
  { date: "2022-12-09", team1: "Netherlands", team2: "Argentina", score: [2, 2], competition: "Copa 2022 Quartas" },
  { date: "2022-12-06", team1: "Brazil", team2: "South Korea", score: [4, 1], competition: "Copa 2022 Oitavas" },
  { date: "2022-12-05", team1: "Japan", team2: "Croatia", score: [1, 1], competition: "Copa 2022 Oitavas" },
  { date: "2022-12-05", team1: "Spain", team2: "Morocco", score: [0, 0], competition: "Copa 2022 Oitavas" },
  { date: "2022-12-03", team1: "England", team2: "Senegal", score: [3, 0], competition: "Copa 2022 Oitavas" },
  { date: "2022-12-03", team1: "France", team2: "Poland", score: [3, 1], competition: "Copa 2022 Oitavas" },
  { date: "2022-12-02", team1: "Portugal", team2: "Switzerland", score: [6, 1], competition: "Copa 2022 Oitavas" },
  { date: "2022-11-30", team1: "Argentina", team2: "Australia", score: [2, 1], competition: "Copa 2022 Oitavas" },
  { date: "2022-11-22", team1: "Argentina", team2: "Saudi Arabia", score: [1, 2], competition: "Copa 2022 Grupos" },
  { date: "2022-11-23", team1: "Germany", team2: "Japan", score: [1, 2], competition: "Copa 2022 Grupos" },
  { date: "2022-11-23", team1: "Spain", team2: "Germany", score: [1, 1], competition: "Copa 2022 Grupos" },
  { date: "2022-11-24", team1: "Brazil", team2: "Serbia", score: [2, 0], competition: "Copa 2022 Grupos" },
  { date: "2022-11-25", team1: "France", team2: "Australia", score: [4, 1], competition: "Copa 2022 Grupos" },
  { date: "2022-11-25", team1: "Spain", team2: "Japan", score: [1, 2], competition: "Copa 2022 Grupos" },
  { date: "2022-11-25", team1: "Belgium", team2: "Morocco", score: [0, 2], competition: "Copa 2022 Grupos" },
  { date: "2022-11-24", team1: "Portugal", team2: "Ghana", score: [3, 2], competition: "Copa 2022 Grupos" },
  { date: "2022-11-25", team1: "England", team2: "USA", score: [0, 0], competition: "Copa 2022 Grupos" },
  { date: "2022-11-29", team1: "USA", team2: "Iran", score: [1, 0], competition: "Copa 2022 Grupos" },
  { date: "2022-11-22", team1: "Mexico", team2: "Poland", score: [0, 0], competition: "Copa 2022 Grupos" },
  { date: "2022-11-26", team1: "Argentina", team2: "Mexico", score: [2, 0], competition: "Copa 2022 Grupos" },
  { date: "2022-11-28", team1: "Brazil", team2: "Switzerland", score: [1, 0], competition: "Copa 2022 Grupos" },
  { date: "2022-11-28", team1: "Portugal", team2: "Uruguay", score: [2, 0], competition: "Copa 2022 Grupos" },
  { date: "2022-11-28", team1: "South Korea", team2: "Ghana", score: [2, 3], competition: "Copa 2022 Grupos" },
  { date: "2022-11-29", team1: "Netherlands", team2: "USA", score: [3, 1], competition: "Copa 2022 Oitavas" },

  // 2018 World Cup
  { date: "2018-07-15", team1: "France", team2: "Croatia", score: [4, 2], competition: "Copa 2018 Final" },
  { date: "2018-07-10", team1: "France", team2: "Belgium", score: [1, 0], competition: "Copa 2018 Semi" },
  { date: "2018-07-07", team1: "Brazil", team2: "Belgium", score: [1, 2], competition: "Copa 2018 Quartas" },
  { date: "2018-07-06", team1: "France", team2: "Uruguay", score: [2, 0], competition: "Copa 2018 Quartas" },
  { date: "2018-07-06", team1: "England", team2: "Colombia", score: [1, 1], competition: "Copa 2018 Oitavas" },
  { date: "2018-06-27", team1: "Germany", team2: "South Korea", score: [0, 2], competition: "Copa 2018 Grupos" },
  { date: "2018-06-17", team1: "Germany", team2: "Mexico", score: [0, 1], competition: "Copa 2018 Grupos" },
  { date: "2018-06-15", team1: "Portugal", team2: "Spain", score: [3, 3], competition: "Copa 2018 Grupos" },

  // Copa America 2024
  { date: "2024-07-14", team1: "Argentina", team2: "Colombia", score: [1, 0], competition: "Copa América 2024 Final" },
  { date: "2024-07-10", team1: "Argentina", team2: "Canada", score: [2, 0], competition: "Copa América 2024 Semi" },
  { date: "2024-07-10", team1: "Uruguay", team2: "Colombia", score: [0, 1], competition: "Copa América 2024 Semi" },
  { date: "2024-07-06", team1: "Argentina", team2: "Ecuador", score: [1, 1], competition: "Copa América 2024 Quartas" },
  { date: "2024-07-06", team1: "Uruguay", team2: "Brazil", score: [0, 0], competition: "Copa América 2024 Quartas" },
  { date: "2024-06-20", team1: "Argentina", team2: "Canada", score: [2, 0], competition: "Copa América 2024 Grupos" },
  { date: "2024-06-24", team1: "Brazil", team2: "Paraguay", score: [4, 1], competition: "Copa América 2024 Grupos" },
  { date: "2024-06-24", team1: "Colombia", team2: "Paraguay", score: [2, 1], competition: "Copa América 2024 Grupos" },

  // Euro 2024
  { date: "2024-07-14", team1: "Spain", team2: "England", score: [2, 1], competition: "Euro 2024 Final" },
  { date: "2024-07-10", team1: "Spain", team2: "France", score: [2, 1], competition: "Euro 2024 Semi" },
  { date: "2024-07-10", team1: "Netherlands", team2: "England", score: [1, 2], competition: "Euro 2024 Semi" },
  { date: "2024-07-06", team1: "France", team2: "Portugal", score: [0, 0], competition: "Euro 2024 Quartas" },
  { date: "2024-07-06", team1: "Germany", team2: "Spain", score: [1, 2], competition: "Euro 2024 Quartas" },
  { date: "2024-07-05", team1: "Netherlands", team2: "Turkey", score: [2, 1], competition: "Euro 2024 Quartas" },
  { date: "2024-07-05", team1: "Switzerland", team2: "England", score: [1, 1], competition: "Euro 2024 Quartas" },
  { date: "2024-06-29", team1: "France", team2: "Belgium", score: [1, 0], competition: "Euro 2024 Oitavas" },
  { date: "2024-06-29", team1: "Portugal", team2: "Switzerland", score: [0, 0], competition: "Euro 2024 Oitavas" },

  // Nations League / Friendlies notáveis
  { date: "2024-03-26", team1: "France", team2: "Germany", score: [0, 2], competition: "Amistoso" },
  { date: "2024-03-23", team1: "England", team2: "Brazil", score: [0, 1], competition: "Amistoso" },
  { date: "2023-11-21", team1: "Brazil", team2: "Argentina", score: [0, 1], competition: "Eliminatórias" },
  { date: "2023-06-09", team1: "Spain", team2: "Brazil", score: [3, 3], competition: "Amistoso" },
  { date: "2023-03-27", team1: "Germany", team2: "Belgium", score: [2, 3], competition: "Amistoso" },
  { date: "2024-09-07", team1: "Brazil", team2: "Ecuador", score: [1, 0], competition: "Eliminatórias" },
  { date: "2024-10-15", team1: "Colombia", team2: "Ecuador", score: [0, 0], competition: "Eliminatórias" },
];

export function getHistoricalH2H(team1: string, team2: string): HistoricalMatch[] {
  return historicalMatches.filter(
    (m) =>
      (m.team1 === team1 && m.team2 === team2) ||
      (m.team1 === team2 && m.team2 === team1)
  ).sort((a, b) => b.date.localeCompare(a.date));
}
