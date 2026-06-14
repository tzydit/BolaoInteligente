export interface Team {
  name: string;
  flag: string;
  group: string;
  ranking: number;
  aprov: number;
  gm: number;
  gs: number;
}

export const teams: Team[] = [
  { name: "Brasil", flag: "🇧🇷", group: "A", ranking: 1, aprov: 82, gm: 8, gs: 2 },
  { name: "Alemanha", flag: "🇩🇪", group: "A", ranking: 3, aprov: 75, gm: 7, gs: 3 },
  { name: "Japão", flag: "🇯🇵", group: "A", ranking: 18, aprov: 60, gm: 4, gs: 4 },
  { name: "Marrocos", flag: "🇲🇦", group: "A", ranking: 13, aprov: 58, gm: 3, gs: 3 },
  { name: "Argentina", flag: "🇦🇷", group: "B", ranking: 2, aprov: 80, gm: 9, gs: 2 },
  { name: "França", flag: "🇫🇷", group: "B", ranking: 4, aprov: 78, gm: 7, gs: 3 },
  { name: "Austrália", flag: "🇦🇺", group: "B", ranking: 25, aprov: 45, gm: 3, gs: 6 },
  { name: "Nigéria", flag: "🇳🇬", group: "B", ranking: 30, aprov: 50, gm: 4, gs: 5 },
  { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "C", ranking: 5, aprov: 72, gm: 6, gs: 3 },
  { name: "Espanha", flag: "🇪🇸", group: "C", ranking: 6, aprov: 74, gm: 8, gs: 3 },
  { name: "México", flag: "🇲🇽", group: "C", ranking: 15, aprov: 55, gm: 4, gs: 4 },
  { name: "Coreia do Sul", flag: "🇰🇷", group: "C", ranking: 22, aprov: 52, gm: 3, gs: 5 },
  { name: "Portugal", flag: "🇵🇹", group: "D", ranking: 7, aprov: 76, gm: 7, gs: 2 },
  { name: "Holanda", flag: "🇳🇱", group: "D", ranking: 8, aprov: 70, gm: 6, gs: 3 },
  { name: "EUA", flag: "🇺🇸", group: "D", ranking: 14, aprov: 58, gm: 5, gs: 4 },
  { name: "Gana", flag: "🇬🇭", group: "D", ranking: 35, aprov: 42, gm: 3, gs: 6 },
  { name: "Uruguai", flag: "🇺🇾", group: "E", ranking: 9, aprov: 68, gm: 5, gs: 2 },
  { name: "Croácia", flag: "🇭🇷", group: "E", ranking: 10, aprov: 66, gm: 5, gs: 3 },
  { name: "Canadá", flag: "🇨🇦", group: "E", ranking: 40, aprov: 40, gm: 2, gs: 5 },
  { name: "Camarões", flag: "🇨🇲", group: "E", ranking: 38, aprov: 44, gm: 3, gs: 5 },
  { name: "Bélgica", flag: "🇧🇪", group: "F", ranking: 11, aprov: 64, gm: 5, gs: 3 },
  { name: "Colômbia", flag: "🇨🇴", group: "F", ranking: 12, aprov: 62, gm: 5, gs: 4 },
  { name: "Senegal", flag: "🇸🇳", group: "F", ranking: 20, aprov: 56, gm: 4, gs: 4 },
  { name: "Equador", flag: "🇪🇨", group: "F", ranking: 28, aprov: 48, gm: 3, gs: 4 },
  { name: "Itália", flag: "🇮🇹", group: "G", ranking: 9, aprov: 70, gm: 6, gs: 2 },
  { name: "Dinamarca", flag: "🇩🇰", group: "G", ranking: 16, aprov: 60, gm: 4, gs: 3 },
  { name: "Tunísia", flag: "🇹🇳", group: "G", ranking: 32, aprov: 46, gm: 3, gs: 5 },
  { name: "Arábia Saudita", flag: "🇸🇦", group: "G", ranking: 50, aprov: 38, gm: 2, gs: 6 },
  { name: "Suíça", flag: "🇨🇭", group: "H", ranking: 17, aprov: 62, gm: 5, gs: 3 },
  { name: "Sérvia", flag: "🇷🇸", group: "H", ranking: 24, aprov: 54, gm: 4, gs: 4 },
  { name: "Polônia", flag: "🇵🇱", group: "H", ranking: 26, aprov: 52, gm: 4, gs: 4 },
  { name: "Costa Rica", flag: "🇨🇷", group: "H", ranking: 45, aprov: 40, gm: 2, gs: 5 },
];

export function getTeamByName(name: string) {
  return teams.find((t) => t.name === name);
}
