import { useState, useEffect, useRef, useMemo } from "react";
import { useWC } from "../App";
import { generateAIPrediction, generateAdvancedStats, fifaRankings } from "../api/football";
import { pt } from "../api/translations";
import { formatDatePT, formatTime } from "../api/dates";
import { getHistoricalH2H } from "../data/h2h";

const steps = [
  "Coletando ranking FIFA...",
  "Analisando histórico desde 2018...",
  "Calculando escanteios e posse...",
  "Processando chances de gol...",
  "Cruzando dados de confrontos...",
  "Finalizando palpite...",
];

function StatBar({ label, v1, v2, unit }: { label: string; v1: number; v2: number; unit?: string }) {
  const total = v1 + v2 || 1;
  const p1 = Math.round((v1 / total) * 100);
  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between text-[11px]">
        <span className="text-field font-medium">{v1}{unit}</span>
        <span className="text-silver-dim">{label}</span>
        <span className="text-gold font-medium">{v2}{unit}</span>
      </div>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-pitch">
        <div className="bg-field transition-all duration-700" style={{ width: `${p1}%` }} />
        <div className="bg-gold transition-all duration-700" style={{ width: `${100 - p1}%` }} />
      </div>
    </div>
  );
}

function OddCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg bg-pitch p-3 text-center">
      <div className="text-[10px] text-silver-dim uppercase tracking-wider">{label}</div>
      <div className="mt-1 text-lg font-bold text-white">{value}</div>
      <div className="text-[10px] text-silver-dim">{sub}</div>
    </div>
  );
}

export default function GeradorIA() {
  const { matches, teams } = useWC();
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => () => clearInterval(timer.current), []);

  // Filter upcoming matches, sorted by nearest date first
  const groupMatches = useMemo(() => {
    return matches
      .filter((m) => m.group && !m.score)
      .sort((a, b) => {
        const da = a.date + (a.time ?? "");
        const db = b.date + (b.time ?? "");
        return da.localeCompare(db);
      });
  }, [matches]);

  // Parse selected match
  const [sel1, sel2] = selected ? selected.split(" vs ") : ["", ""];
  const t1 = teams.find((t) => t.name === sel1);
  const t2 = teams.find((t) => t.name === sel2);

  // Head-to-head in current tournament
  const h2hTournament = useMemo(() => {
    if (!sel1 || !sel2) return [];
    return matches.filter(
      (m) => m.score && ((m.team1 === sel1 && m.team2 === sel2) || (m.team1 === sel2 && m.team2 === sel1))
    );
  }, [sel1, sel2, matches]);

  // Historical H2H since 2018
  const h2hHistorical = useMemo(() => {
    if (!sel1 || !sel2) return [];
    return getHistoricalH2H(sel1, sel2);
  }, [sel1, sel2]);

  const hasAnyH2H = h2hTournament.length > 0 || h2hHistorical.length > 0;

  const result = useMemo(() => {
    if (!showResult || !sel1 || !sel2) return null;
    return generateAIPrediction(sel1, sel2, teams, matches);
  }, [showResult, sel1, sel2, teams, matches]);

  const advancedStats = useMemo(() => {
    if (!showResult || !sel1 || !sel2) return null;
    return generateAdvancedStats(sel1, sel2);
  }, [showResult, sel1, sel2]);

  function generate() {
    if (!selected || loading) return;
    setShowResult(false);
    setLoading(true);
    setStep(0);

    let s = 0;
    timer.current = setInterval(() => { s++; if (s < steps.length) setStep(s); }, 450);

    setTimeout(() => {
      clearInterval(timer.current);
      setLoading(false);
      setShowResult(true);
    }, 3000);
  }

  // Team form in tournament (W/D/L)
  function getTeamForm(team: string) {
    const results = matches.filter((m) => m.score && (m.team1 === team || m.team2 === team));
    return results.slice(-5).map((m) => {
      const gf = m.team1 === team ? m.score!.ft[0] : m.score!.ft[1];
      const ga = m.team1 === team ? m.score!.ft[1] : m.score!.ft[0];
      if (gf > ga) return "V";
      if (gf < ga) return "D";
      return "E";
    });
  }

  const form1 = sel1 ? getTeamForm(sel1) : [];
  const form2 = sel2 ? getTeamForm(sel2) : [];

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Gerador de Palpites IA</h1>
        <p className="text-[13px] text-silver-dim">Ranking FIFA · Histórico desde 2018 · Escanteios · Chances de gol</p>
      </div>

      <div className="glass rounded-xl p-6">
        <label className="mb-2 block text-[13px] font-medium text-silver">Selecione o jogo</label>
        <select
          value={selected}
          onChange={(e) => { setSelected(e.target.value); setShowResult(false); }}
          className="mb-5 w-full rounded-lg border border-glass-border bg-surface px-4 py-2.5 text-[13px] text-silver outline-none transition focus:border-field/30"
        >
          <option value="">Escolha um jogo...</option>
          {groupMatches.map((m, i) => (
            <option key={i} value={`${m.team1} vs ${m.team2}`}>
              {pt(m.team1)} vs {pt(m.team2)} — {formatDatePT(m.date)} {formatTime(m.time)} · {m.group?.replace("Group", "Gr.")}
            </option>
          ))}
        </select>

        {/* Team info cards when selected */}
        {sel1 && sel2 && (
          <div className="mb-5 grid grid-cols-2 gap-3">
            {[{ team: sel1, t: t1, form: form1 }, { team: sel2, t: t2, form: form2 }].map(({ team, t, form }, idx) => (
              <div key={idx} className="rounded-lg bg-pitch/50 p-3 text-center">
                <span className="text-2xl">{t?.flag_icon ?? "🏳️"}</span>
                <div className="mt-1 text-[13px] font-semibold text-silver">{pt(team)}</div>
                <div className="text-[10px] text-silver-dim">FIFA {fifaRankings[team] ?? "—"}º · {t?.confed}</div>
                {form.length > 0 && (
                  <div className="mt-2 flex justify-center gap-1">
                    {form.map((r, i) => (
                      <span key={i} className={`inline-flex h-5 w-5 items-center justify-center rounded text-[9px] font-bold ${
                        r === "V" ? "bg-field/20 text-field" : r === "D" ? "bg-danger/20 text-danger" : "bg-silver-dim/20 text-silver-dim"
                      }`}>{r}</span>
                    ))}
                  </div>
                )}
                {form.length === 0 && <div className="mt-1 text-[10px] text-silver-dim">Sem jogos no torneio</div>}
              </div>
            ))}
          </div>
        )}

        {/* Head to head section — always show when match selected */}
        {sel1 && sel2 && (
          <div className="mb-5 rounded-lg bg-pitch/50 p-4">
            <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-gold">
              Confronto Direto {hasAnyH2H ? "" : ""}
            </div>

            {/* Current tournament H2H */}
            {h2hTournament.length > 0 && (
              <>
                <div className="mb-1.5 text-[10px] font-medium text-field">Copa 2026</div>
                {h2hTournament.map((m, i) => (
                  <div key={`t-${i}`} className="flex items-center justify-between py-1.5 text-[13px]">
                    <span className="flex items-center gap-2 text-silver">
                      <span className="text-lg">{teams.find(t => t.name === m.team1)?.flag_icon}</span>
                      {pt(m.team1)}
                    </span>
                    <div className="text-center">
                      <span className="rounded bg-surface px-3 py-1 font-bold text-white">
                        {m.score!.ft[0]} - {m.score!.ft[1]}
                      </span>
                      <div className="mt-0.5 text-[10px] text-silver-dim">{formatDatePT(m.date)}</div>
                    </div>
                    <span className="flex items-center gap-2 text-silver">
                      {pt(m.team2)}
                      <span className="text-lg">{teams.find(t => t.name === m.team2)?.flag_icon}</span>
                    </span>
                  </div>
                ))}
              </>
            )}

            {/* Historical H2H */}
            {h2hHistorical.length > 0 && (
              <>
                <div className={`mb-1.5 text-[10px] font-medium text-gold ${h2hTournament.length > 0 ? "mt-3 border-t border-glass-border/30 pt-2" : ""}`}>
                  Histórico (desde 2018)
                </div>
                {h2hHistorical.map((m, i) => (
                  <div key={`h-${i}`} className="flex items-center justify-between py-1.5 text-[12px]">
                    <span className="flex items-center gap-2 text-silver-mid">
                      <span className="text-base">{teams.find(t => t.name === m.team1)?.flag_icon ?? "🏳️"}</span>
                      {pt(m.team1)}
                    </span>
                    <div className="text-center">
                      <span className="rounded bg-surface/80 px-2.5 py-0.5 text-[12px] font-bold text-silver">
                        {m.score[0]} - {m.score[1]}
                      </span>
                      <div className="mt-0.5 text-[9px] text-silver-dim">{m.competition}</div>
                    </div>
                    <span className="flex items-center gap-2 text-silver-mid">
                      {pt(m.team2)}
                      <span className="text-base">{teams.find(t => t.name === m.team2)?.flag_icon ?? "🏳️"}</span>
                    </span>
                  </div>
                ))}
              </>
            )}

            {/* No H2H at all */}
            {!hasAnyH2H && (
              <div className="py-3 text-center text-[12px] text-silver-dim">
                Sem confrontos diretos registrados desde 2018. Análise baseada em ranking FIFA e desempenho geral.
              </div>
            )}
          </div>
        )}

        <button
          onClick={generate}
          disabled={!selected || loading}
          className="rounded-lg bg-gradient-to-r from-field to-field-dim px-6 py-2.5 text-[13px] font-bold text-pitch transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-field/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:transform-none"
        >
          Gerar Análise Completa
        </button>

        {loading && (
          <div className="mt-8 animate-fade-up text-center">
            <div className="mx-auto mb-3 h-8 w-8 rounded-full border-2 border-pitch-line border-t-field animate-spin" />
            <p className="text-[12px] text-field">{steps[step]}</p>
          </div>
        )}

        {result && advancedStats && !loading && (
          <div className="mt-6 animate-fade-up space-y-4">

            {/* Prediction */}
            <div className="rounded-xl border border-field/8 bg-field/[0.03] p-5">
              <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-gold">Palpite</div>
              <div className="mb-4 text-xl font-bold text-white">{result.prediction}</div>

              <div className="mb-1.5 flex justify-between text-[11px] text-silver-dim">
                <span>{t1?.flag_icon} {pt(sel1)}</span>
                <span>Empate</span>
                <span>{pt(sel2)} {t2?.flag_icon}</span>
              </div>
              <div className="flex h-5 overflow-hidden rounded-full bg-pitch">
                <div className="bg-field transition-all duration-700 flex items-center justify-center text-[9px] font-bold text-pitch" style={{ width: `${result.probabilities.team1}%` }}>
                  {result.probabilities.team1}%
                </div>
                <div className="bg-silver-dim transition-all duration-700 flex items-center justify-center text-[9px] font-bold text-pitch" style={{ width: `${result.probabilities.draw}%` }}>
                  {result.probabilities.draw}%
                </div>
                <div className="bg-gold transition-all duration-700 flex items-center justify-center text-[9px] font-bold text-pitch" style={{ width: `${result.probabilities.team2}%` }}>
                  {result.probabilities.team2}%
                </div>
              </div>
            </div>

            {/* Goal Markets */}
            <div className="rounded-xl border border-glass-border bg-surface/50 p-5">
              <div className="mb-3 text-[11px] font-medium uppercase tracking-wider text-gold">Mercados de Gols</div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <OddCard label="Over 0.5" value={`${Math.min(95, advancedStats.goalsOver15 + 20)}%`} sub="+ de 0 gols" />
                <OddCard label="Over 1.5" value={`${advancedStats.goalsOver15}%`} sub="+ de 1 gol" />
                <OddCard label="Over 2.5" value={`${advancedStats.goalsOver25}%`} sub="+ de 2 gols" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <OddCard label="Over 3.5" value={`${Math.max(10, advancedStats.goalsOver25 - 20)}%`} sub="+ de 3 gols" />
                <OddCard label="BTTS Sim" value={`${advancedStats.bothTeamsScore}%`} sub="Ambos marcam" />
                <OddCard label="BTTS Não" value={`${100 - advancedStats.bothTeamsScore}%`} sub="Não ambos" />
              </div>
            </div>

            {/* Advanced Stats */}
            <div className="rounded-xl border border-glass-border bg-surface/50 p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-gold">Estatísticas Estimadas</span>
                <span className="text-[10px] text-silver-dim">
                  {t1?.flag_icon} {pt(sel1)} vs {pt(sel2)} {t2?.flag_icon}
                </span>
              </div>

              <StatBar label="Posse de Bola" v1={advancedStats.possession[0]} v2={advancedStats.possession[1]} unit="%" />
              <StatBar label="Escanteios" v1={advancedStats.corners[0]} v2={advancedStats.corners[1]} />
              <StatBar label="Finalizações" v1={advancedStats.totalShots[0]} v2={advancedStats.totalShots[1]} />
              <StatBar label="Chutes ao Gol" v1={advancedStats.shotsOnTarget[0]} v2={advancedStats.shotsOnTarget[1]} />
              <StatBar label="Faltas" v1={advancedStats.fouls[0]} v2={advancedStats.fouls[1]} />
              <StatBar label="Cartões Amarelos" v1={advancedStats.yellowCards[0]} v2={advancedStats.yellowCards[1]} />
              <StatBar label="Impedimentos" v1={advancedStats.offsides[0]} v2={advancedStats.offsides[1]} />
            </div>

            {/* Reasons */}
            <div className="rounded-xl border border-glass-border bg-surface/50 p-5">
              <div className="mb-3 text-[11px] font-medium uppercase tracking-wider text-gold">Fundamentos da Análise</div>
              <ul className="space-y-2">
                {result.reasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] leading-relaxed text-silver-mid">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-field/50" />
                    {r}
                  </li>
                ))}
              </ul>

              <div className="mt-4 rounded-lg bg-gold/5 px-3 py-2 text-[11px] text-gold">
                Confiança: {result.confidence}% · Rankings: {fifaRankings[sel1] ?? "—"}º vs {fifaRankings[sel2] ?? "—"}º
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-lg border border-gold/10 bg-gold/[0.03] px-4 py-3 text-[11px] text-silver-dim">
              Estatísticas para fins informativos. Não constitui sugestão de aposta ou investimento.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
