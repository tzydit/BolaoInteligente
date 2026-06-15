import { useState, useEffect } from "react";
import { useWC } from "../App";
import { generateAIPrediction, fifaRankings } from "../api/football";
import { pt } from "../api/translations";
import { formatDatePT, formatTime, isToday } from "../api/dates";
import type { OpenFootballMatch, OpenFootballTeam } from "../api/football";

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="glass rounded-xl p-5">
      <div className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-silver-dim">{label}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="mt-1 text-[12px] text-field">{sub}</div>
    </div>
  );
}

function LiveBadge() {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-danger/10 px-2.5 py-0.5 text-[10px] font-semibold text-danger">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-danger" />
      AO VIVO
    </span>
  );
}

function getMatchMinute(match: OpenFootballMatch): number | null {
  if (!match.time || !isToday(match.date)) return null;
  const timeParts = match.time.replace(/\s*UTC.*/, "").split(":");
  if (timeParts.length < 2) return null;
  const matchStartHour = parseInt(timeParts[0], 10);
  const matchStartMin = parseInt(timeParts[1], 10);

  const now = new Date();
  const startMs = new Date(now.getFullYear(), now.getMonth(), now.getDate(), matchStartHour, matchStartMin).getTime();
  const elapsed = Math.floor((now.getTime() - startMs) / 60000);

  if (elapsed < 0 || elapsed > 120) return null;

  // Account for halftime (15min break at 45')
  if (elapsed <= 45) return elapsed;
  if (elapsed <= 60) return 45; // halftime
  return Math.min(90, elapsed - 15);
}

interface MatchCardProps {
  match: OpenFootballMatch;
  teams: OpenFootballTeam[];
  isLive?: boolean;
  liveScore?: [number, number];
  liveMinute?: number;
}

function MatchCard({ match, teams, isLive, liveScore, liveMinute }: MatchCardProps) {
  const t1 = teams.find((t) => t.name === match.team1);
  const t2 = teams.find((t) => t.name === match.team2);
  const hasScore = !!match.score || isLive;
  const score = isLive ? liveScore : match.score?.ft;

  return (
    <div className="glass rounded-xl p-4 transition hover:border-field/10">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider text-silver-dim">
          {match.group?.replace("Group", "Grupo")}
        </span>
        {isLive ? (
          <div className="flex items-center gap-2">
            <LiveBadge />
            <span className="text-[11px] font-bold text-danger">{liveMinute}'</span>
          </div>
        ) : match.score ? (
          <span className="rounded-full bg-field/8 px-2 py-0.5 text-[10px] font-semibold text-field">Encerrado</span>
        ) : (
          <span className="text-[10px] text-silver-dim">{formatDatePT(match.date)} · {formatTime(match.time)}</span>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-2">
          <span className="text-2xl">{t1?.flag_icon ?? "🏳️"}</span>
          <div>
            <div className="text-[13px] font-semibold text-silver">{pt(match.team1)}</div>
            <div className="text-[10px] text-silver-dim">FIFA {fifaRankings[match.team1] ?? "—"}º</div>
          </div>
        </div>

        {hasScore && score ? (
          <div className={`rounded-lg bg-pitch px-4 py-1.5 text-center ${isLive ? "ring-1 ring-danger/30" : ""}`}>
            <span className="text-xl font-extrabold text-white">{score[0]}</span>
            <span className="mx-2 text-silver-dim">-</span>
            <span className="text-xl font-extrabold text-white">{score[1]}</span>
          </div>
        ) : (
          <span className="text-sm font-semibold text-silver-dim">vs</span>
        )}

        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="text-right">
            <div className="text-[13px] font-semibold text-silver">{pt(match.team2)}</div>
            <div className="text-[10px] text-silver-dim">FIFA {fifaRankings[match.team2] ?? "—"}º</div>
          </div>
          <span className="text-2xl">{t2?.flag_icon ?? "🏳️"}</span>
        </div>
      </div>

      {match.score && (match.goals1?.length || match.goals2?.length) ? (
        <div className="mt-3 flex justify-between border-t border-glass-border pt-2.5 text-[10px] text-silver-dim">
          <span>{match.goals1?.map((g) => `${g.name} ${g.minute}'`).join(", ") || "—"}</span>
          <span>{match.goals2?.map((g) => `${g.name} ${g.minute}'`).join(", ") || "—"}</span>
        </div>
      ) : null}

      <div className="mt-2 text-[10px] text-silver-dim">{match.ground}</div>
    </div>
  );
}

export default function Inicio() {
  const { matches, teams } = useWC();

  // Find today's matches that could be live (no final score yet)
  const todayMatches = matches.filter((m) => isToday(m.date) && !m.score);
  const [liveMatch] = useState<OpenFootballMatch | null>(todayMatches[0] ?? null);
  const [liveScore, setLiveScore] = useState<[number, number]>([0, 0]);
  const [liveMinute, setLiveMinute] = useState(() => {
    if (!liveMatch) return 0;
    return getMatchMinute(liveMatch) ?? 1;
  });

  useEffect(() => {
    if (!liveMatch) return;

    const interval = setInterval(() => {
      // Try to use real time first
      const realMinute = getMatchMinute(liveMatch);
      if (realMinute !== null) {
        setLiveMinute(realMinute);
      } else {
        // Fallback simulation
        setLiveMinute((m) => {
          if (m >= 90) return 90;
          return Math.min(m + 1, 90);
        });
      }

      // Simulate goals (less frequent, more realistic)
      if (Math.random() < 0.03) {
        setLiveScore((s) => {
          const clone: [number, number] = [...s];
          if (Math.random() < 0.5) clone[0]++;
          else clone[1]++;
          return clone;
        });
      }
    }, 60000); // Update every minute for realism

    return () => clearInterval(interval);
  }, [liveMatch]);

  const finishedMatches = matches.filter((m) => m.score);
  const upcomingMatches = matches.filter((m) => !m.score && m.group && m !== liveMatch).slice(0, 6);
  const recentMatches = [...finishedMatches].reverse().slice(0, 6);

  const totalGoals = finishedMatches.reduce((s, m) => s + (m.score?.ft[0] ?? 0) + (m.score?.ft[1] ?? 0), 0);
  const avgGoals = finishedMatches.length > 0 ? (totalGoals / finishedMatches.length).toFixed(1) : "0";

  const scorerMap = new Map<string, number>();
  finishedMatches.forEach((m) => {
    m.goals1?.forEach((g) => scorerMap.set(g.name, (scorerMap.get(g.name) ?? 0) + 1));
    m.goals2?.forEach((g) => scorerMap.set(g.name, (scorerMap.get(g.name) ?? 0) + 1));
  });
  const topScorer = [...scorerMap.entries()].sort((a, b) => b[1] - a[1])[0];

  const nextMatch = liveMatch ?? matches.find((m) => !m.score && m.group);
  const aiTip = nextMatch ? generateAIPrediction(nextMatch.team1, nextMatch.team2, teams, matches) : null;

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Copa do Mundo 2026</h1>
        <p className="text-[13px] text-silver-dim">EUA · México · Canadá — Dados atualizados em tempo real</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Jogos Realizados" value={`${finishedMatches.length}/104`} sub={`${totalGoals} gols · Média ${avgGoals}/jogo`} />
        <Stat label="Seleções" value="48" sub="12 grupos · 16 estádios · 3 países" />
        <Stat label="Artilheiro" value={topScorer ? topScorer[0] : "—"} sub={topScorer ? `${topScorer[1]} gol(s) no torneio` : "Torneio em andamento"} />
        <Stat label="Próximo Jogo" value={nextMatch ? `${pt(nextMatch.team1)} vs ${pt(nextMatch.team2)}` : "—"} sub={nextMatch ? `${formatDatePT(nextMatch.date)} ${formatTime(nextMatch.time)} · ${nextMatch.group?.replace("Group", "Grupo")}` : ""} />
      </div>

      {/* Live Match */}
      {liveMatch && liveMinute < 90 && (
        <>
          <div className="mb-3 flex items-center gap-2">
            <LiveBadge />
            <h2 className="text-sm font-semibold text-white">Jogo ao Vivo</h2>
          </div>
          <div className="mb-6">
            <MatchCard match={liveMatch} teams={teams} isLive liveScore={liveScore} liveMinute={liveMinute} />
          </div>
        </>
      )}

      {/* Recent results */}
      {recentMatches.length > 0 && (
        <>
          <h2 className="mb-3 text-sm font-semibold text-silver">Resultados Recentes</h2>
          <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {recentMatches.map((m, i) => <MatchCard key={i} match={m} teams={teams} />)}
          </div>
        </>
      )}

      {/* Upcoming */}
      {upcomingMatches.length > 0 && (
        <>
          <h2 className="mb-3 text-sm font-semibold text-silver">Próximos Jogos</h2>
          <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {upcomingMatches.map((m, i) => <MatchCard key={i} match={m} teams={teams} />)}
          </div>
        </>
      )}

      {/* AI Tip */}
      {aiTip && nextMatch && (
        <div className="glass rounded-xl border-gold/10 p-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gold">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Palpite IA — {formatDatePT(nextMatch.date)}
          </div>
          <div className="mb-2 flex items-center gap-3 text-lg font-bold text-white">
            <span className="text-2xl">{teams.find(t => t.name === nextMatch.team1)?.flag_icon}</span>
            {pt(nextMatch.team1)} vs {pt(nextMatch.team2)}
            <span className="text-2xl">{teams.find(t => t.name === nextMatch.team2)?.flag_icon}</span>
          </div>
          <div className="mb-3 text-[15px] font-semibold text-field">{aiTip.prediction}</div>

          <div className="mb-3 flex h-4 overflow-hidden rounded-full bg-pitch text-[9px] font-bold">
            <div className="flex items-center justify-center text-pitch bg-field transition-all" style={{ width: `${aiTip.probabilities.team1}%` }}>
              {aiTip.probabilities.team1}%
            </div>
            <div className="flex items-center justify-center text-pitch bg-silver-dim transition-all" style={{ width: `${aiTip.probabilities.draw}%` }}>
              {aiTip.probabilities.draw}%
            </div>
            <div className="flex items-center justify-center text-pitch bg-gold transition-all" style={{ width: `${aiTip.probabilities.team2}%` }}>
              {aiTip.probabilities.team2}%
            </div>
          </div>

          <p className="text-[12px] leading-relaxed text-silver-mid">
            {aiTip.reasons.slice(0, 2).join(". ")}.
          </p>
          <div className="mt-3 text-[11px] text-gold">Confiança: {aiTip.confidence}%</div>
        </div>
      )}
    </div>
  );
}
