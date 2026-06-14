export interface Participant {
  name: string;
  totalPts: number;
  exatos: number;
  parciais: number;
}

export const initialParticipants: Participant[] = [
  { name: "Carlos Silva", totalPts: 102, exatos: 8, parciais: 16 },
  { name: "Ana Santos", totalPts: 95, exatos: 7, parciais: 15 },
  { name: "João Miguel", totalPts: 87, exatos: 6, parciais: 14 },
  { name: "Pedro Oliveira", totalPts: 81, exatos: 5, parciais: 14 },
  { name: "Maria Costa", totalPts: 76, exatos: 5, parciais: 13 },
  { name: "Lucas Ferreira", totalPts: 70, exatos: 4, parciais: 12 },
  { name: "Fernanda Lima", totalPts: 64, exatos: 3, parciais: 11 },
  { name: "Rafael Souza", totalPts: 58, exatos: 3, parciais: 10 },
];

export interface RoundGame {
  match: string;
  guesses: Record<string, string>;
  result: string;
}

export const rounds: Record<string, RoundGame[]> = {
  "Rodada 1": [
    {
      match: "🇧🇷 Brasil 2 x 0 Marrocos 🇲🇦",
      guesses: { "Carlos Silva": "2x0", "Ana Santos": "2x1", "João Miguel": "1x0", "Pedro Oliveira": "2x0", "Maria Costa": "3x0", "Lucas Ferreira": "1x1", "Fernanda Lima": "2x0", "Rafael Souza": "0x1" },
      result: "2x0",
    },
    {
      match: "🇩🇪 Alemanha 1 x 1 Japão 🇯🇵",
      guesses: { "Carlos Silva": "2x0", "Ana Santos": "1x1", "João Miguel": "1x0", "Pedro Oliveira": "1x1", "Maria Costa": "2x1", "Lucas Ferreira": "1x1", "Fernanda Lima": "0x1", "Rafael Souza": "1x1" },
      result: "1x1",
    },
  ],
  "Rodada 2": [
    {
      match: "🇦🇷 Argentina 3 x 1 Austrália 🇦🇺",
      guesses: { "Carlos Silva": "3x1", "Ana Santos": "2x0", "João Miguel": "3x0", "Pedro Oliveira": "2x1", "Maria Costa": "3x1", "Lucas Ferreira": "1x0", "Fernanda Lima": "2x1", "Rafael Souza": "3x2" },
      result: "3x1",
    },
    {
      match: "🇫🇷 França 2 x 2 Nigéria 🇳🇬",
      guesses: { "Carlos Silva": "3x0", "Ana Santos": "2x1", "João Miguel": "2x2", "Pedro Oliveira": "1x0", "Maria Costa": "2x0", "Lucas Ferreira": "2x2", "Fernanda Lima": "1x1", "Rafael Souza": "0x0" },
      result: "2x2",
    },
  ],
  "Rodada 3": [
    {
      match: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra 2 x 1 Espanha 🇪🇸",
      guesses: { "Carlos Silva": "1x2", "Ana Santos": "2x1", "João Miguel": "2x1", "Pedro Oliveira": "1x1", "Maria Costa": "0x2", "Lucas Ferreira": "1x0", "Fernanda Lima": "2x1", "Rafael Souza": "1x1" },
      result: "2x1",
    },
  ],
};

export function calcPoints(guess: string, result: string): { pts: number; type: "exact" | "partial" | "miss" } {
  if (guess === "-" || !guess) return { pts: 0, type: "miss" };
  if (guess === result) return { pts: 10, type: "exact" };

  const [gA, gB] = guess.split("x").map(Number);
  const [rA, rB] = result.split("x").map(Number);

  const guessOutcome = gA > gB ? "w" : gA < gB ? "l" : "d";
  const resultOutcome = rA > rB ? "w" : rA < rB ? "l" : "d";

  if (guessOutcome === resultOutcome) return { pts: 6, type: "partial" };
  return { pts: 0, type: "miss" };
}
