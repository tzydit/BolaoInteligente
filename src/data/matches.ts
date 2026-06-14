export interface Match {
  id: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  status: "live" | "upcoming" | "finished";
  time: string;
  stadium: string;
}

export const matches: Match[] = [
  { id: "m1", teamA: "Brasil", teamB: "Alemanha", scoreA: 1, scoreB: 1, status: "live", time: "62'", stadium: "MetLife Stadium, NY" },
  { id: "m2", teamA: "Argentina", teamB: "França", scoreA: 0, scoreB: 0, status: "upcoming", time: "19:00", stadium: "AT&T Stadium, Dallas" },
  { id: "m3", teamA: "Inglaterra", teamB: "Espanha", scoreA: 2, scoreB: 1, status: "finished", time: "Encerrado", stadium: "SoFi Stadium, LA" },
  { id: "m4", teamA: "Portugal", teamB: "Holanda", scoreA: 0, scoreB: 0, status: "upcoming", time: "Amanhã 16:00", stadium: "Hard Rock Stadium, Miami" },
  { id: "m5", teamA: "Uruguai", teamB: "Croácia", scoreA: 0, scoreB: 0, status: "upcoming", time: "Amanhã 19:00", stadium: "Lincoln Financial, Filadélfia" },
  { id: "m6", teamA: "Bélgica", teamB: "Colômbia", scoreA: 0, scoreB: 0, status: "upcoming", time: "17/06 13:00", stadium: "Lumen Field, Seattle" },
];

export interface AIPrediction {
  prediction: string;
  reasons: string[];
  confidence: number;
}

export const aiPredictions: Record<string, AIPrediction> = {
  "Brasil vs Alemanha": {
    prediction: "Brasil 2 x 1 Alemanha",
    reasons: [
      "Brasil com 82% de aproveitamento e melhor ataque do Grupo A (8 gols marcados)",
      "Vinicius Jr. artilheiro do torneio com 4 gols — forma excepcional",
      "Alemanha sofreu 3 gols nas últimas 2 partidas, defesa vulnerável",
      "Histórico em Copas: Brasil venceu 5 dos últimos 8 confrontos diretos",
      "Fator tático: esquema 4-2-3-1 do Brasil explora laterais, ponto fraco alemão",
    ],
    confidence: 72,
  },
  "Argentina vs França": {
    prediction: "Argentina 2 x 2 França",
    reasons: [
      "Argentina líder do ranking FIFA com 80% de aproveitamento — defesa sólida",
      "França com 78% de aproveitamento e Mbappé decisivo com 3 gols",
      "Dois dos melhores elencos do mundo — equilíbrio tático esperado",
      "Últimos 3 confrontos diretos terminaram empatados ou com 1 gol de diferença",
      "Messi com 2 assistências no torneio, fator desequilíbrio nos contra-ataques",
    ],
    confidence: 58,
  },
  "Portugal vs Holanda": {
    prediction: "Portugal 1 x 0 Holanda",
    reasons: [
      "Portugal com 76% de aproveitamento e 2ª melhor defesa do torneio",
      "Cristiano Ronaldo com 2 gols — experiência em jogos decisivos",
      "Holanda oscilou nos últimos 2 jogos, perdendo eficiência ofensiva",
      "Portugal invicto há 8 jogos consecutivos — sequência impressionante",
      "Confrontos diretos recentes favorecem Portugal com 3 vitórias em 5 jogos",
    ],
    confidence: 65,
  },
  "Uruguai vs Croácia": {
    prediction: "Uruguai 1 x 1 Croácia",
    reasons: [
      "Uruguai com melhor defesa do Grupo E — apenas 2 gols sofridos",
      "Croácia especialista em jogos equilibrados — 66% de aproveitamento",
      "Modric vs Valverde: meio-campo decide o jogo — tendência de controle",
      "Últimos 2 confrontos diretos em Copas terminaram empatados",
      "Ambos times priorizam não perder, estilo conservador esperado",
    ],
    confidence: 61,
  },
  "Bélgica vs Colômbia": {
    prediction: "Colômbia 2 x 1 Bélgica",
    reasons: [
      "Colômbia em ascensão com 62% de aproveitamento e elenco jovem motivado",
      "Bélgica mostra sinais de desgaste — elenco mais veterano do grupo",
      "Luis Díaz em excelente forma com 3 gols e 2 assistências",
      "Colômbia invicta nos últimos 5 jogos — confiança alta",
      "Bélgica perdeu De Bruyne por lesão — impacto significativo na criação",
    ],
    confidence: 55,
  },
  "Inglaterra vs Espanha": {
    prediction: "Inglaterra 1 x 1 Espanha",
    reasons: [
      "Jogo já encerrado — análise retrospectiva disponível",
      "Inglaterra com contra-ataques letais — Kane decisivo",
      "Espanha com posse dominante (62%) mas pouca eficiência",
      "Defesa inglesa bem organizada — 3 gols sofridos em 5 jogos",
      "Confronto tático clássico: posse vs contra-ataque",
    ],
    confidence: 60,
  },
};

export const futureAlerts = [
  { teamA: "Argentina", flagA: "🇦🇷", teamB: "França", flagB: "🇫🇷", date: "Hoje, 19:00", active: true },
  { teamA: "Portugal", flagA: "🇵🇹", teamB: "Holanda", flagB: "🇳🇱", date: "Amanhã, 16:00", active: false },
  { teamA: "Uruguai", flagA: "🇺🇾", teamB: "Croácia", flagB: "🇭🇷", date: "Amanhã, 19:00", active: true },
  { teamA: "Bélgica", flagA: "🇧🇪", teamB: "Colômbia", flagB: "🇨🇴", date: "17/06, 13:00", active: false },
  { teamA: "Itália", flagA: "🇮🇹", teamB: "Dinamarca", flagB: "🇩🇰", date: "17/06, 16:00", active: false },
  { teamA: "Brasil", flagA: "🇧🇷", teamB: "Japão", flagB: "🇯🇵", date: "18/06, 13:00", active: true },
  { teamA: "Espanha", flagA: "🇪🇸", teamB: "Coreia do Sul", flagB: "🇰🇷", date: "18/06, 16:00", active: false },
  { teamA: "Suíça", flagA: "🇨🇭", teamB: "Sérvia", flagB: "🇷🇸", date: "18/06, 19:00", active: false },
];
