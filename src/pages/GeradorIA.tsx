import { useState, useEffect, useRef, useMemo } from "react";
import { useWC } from "../App";
import { generateAIPrediction, generateAdvancedStats, fifaRankings } from "../api/football";
import { pt } from "../api/translations";
import { formatDatePT, formatTime } from "../api/dates";

const steps = [
  "Coletando ranking FIFA...",
  "Analisando resultados do torneio...",
  "Calculando escanteios e posse...",
  "Processando chances de gol...",
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

  const groupMatches = matches.filter((m) => m.group && !m.score);

  // Parse selected match
  const [sel1, sel2] = selected ? selected.split(" vs ") : ["", ""];
  const t1 = teams.find((t) => t.name === sel1);
  const t2 = teams.find((t) => t.name === sel2);

  // Find head-to-head in tournament
  const h2h = useMemo(() => {
    if (!sel1 || !sel2) return [];
    return matches.filter(
      (m) => m.score && ((m.team1 === sel1 && m.team2 === sel2) || (m.team1 === sel2 && m.team2 === sel1))
    );
  }, [sel1, sel2, matches]);

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
    timer.current = setInterval(() => { s++; if (s < steps.length) setStep(s); }, 500);

    setTimeout(() => {
      clearInterval(timer.current);
      setLoading(false);
      setShowResult(true);
    }, 2800);
  }

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Gerador de Palpites IA</h1>
        <p className="text-[13px] text-silver-dim">Ranking FIFA · Resultados reais · Escanteios · Chances de gol</p>
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

        {/* Head to head results — only show if they played */}
        {h2h.length > 0 && (
          <div className="mb-5 rounded-lg bg-pitch/50 p-4">
            <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-gold">Resultado(s) Anterior(es) no Torneio</div>
            {h2h.map((m, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 text-[13px]">
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

            {/* Odds / Goals Markets */}
            <div className="rounded-xl border border-glass-border bg-surface/50 p-5">
              <div className="mb-3 text-[11px] font-medium uppercase tracking-wider text-gold">Mercados de Gols</div>
              <div className="grid grid-cols-3 gap-2">
                <OddCard label="Over 1.5" value={`${advancedStats.goalsOver15}%`} sub="+ de 1 gol" />
                <OddCard label="Over 2.5" value={`${advancedStats.goalsOver25}%`} sub="+ de 2 gols" />
                <OddCard label="Ambos marcam" value={`${advancedStats.bothTeamsScore}%`} sub="BTTS" />
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
              ⚠️ Estatísticas para fins informativos. Não constitui sugestão de aposta ou investimento.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
