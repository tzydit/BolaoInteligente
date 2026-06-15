import { useState, useMemo } from "react";
import { useWC } from "../App";
import { fifaRankings } from "../api/football";
import { pt } from "../api/translations";

export default function Analise() {
  const { teams, matches, groups } = useWC();
  const [groupFilter, setGroupFilter] = useState("all");
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");

  const teamStats = useMemo(() => {
    const stats: Record<string, { gm: number; gs: number; w: number; d: number; l: number; pts: number }> = {};
    teams.forEach((t) => { stats[t.name] = { gm: 0, gs: 0, w: 0, d: 0, l: 0, pts: 0 }; });

    matches.forEach((m) => {
      if (!m.score) return;
      const [s1, s2] = m.score.ft;
      if (stats[m.team1]) { stats[m.team1].gm += s1; stats[m.team1].gs += s2; }
      if (stats[m.team2]) { stats[m.team2].gm += s2; stats[m.team2].gs += s1; }
      if (s1 > s2) { if (stats[m.team1]) { stats[m.team1].w++; stats[m.team1].pts += 3; } if (stats[m.team2]) stats[m.team2].l++; }
      else if (s1 < s2) { if (stats[m.team2]) { stats[m.team2].w++; stats[m.team2].pts += 3; } if (stats[m.team1]) stats[m.team1].l++; }
      else { if (stats[m.team1]) { stats[m.team1].d++; stats[m.team1].pts += 1; } if (stats[m.team2]) { stats[m.team2].d++; stats[m.team2].pts += 1; } }
    });

    return stats;
  }, [teams, matches]);

  // Filter and sort by standings
  const filtered = useMemo(() => {
    const list = groupFilter === "all" ? [...teams] : teams.filter((t) => t.group === groupFilter);
    return list.sort((a, b) => {
      const sa = teamStats[a.name] ?? { pts: 0, gm: 0, gs: 0 };
      const sb = teamStats[b.name] ?? { pts: 0, gm: 0, gs: 0 };
      // Sort by: points desc, goal diff desc, goals scored desc, FIFA ranking asc
      if (sb.pts !== sa.pts) return sb.pts - sa.pts;
      const gdA = sa.gm - sa.gs, gdB = sb.gm - sb.gs;
      if (gdB !== gdA) return gdB - gdA;
      if (sb.gm !== sa.gm) return sb.gm - sa.gm;
      return (fifaRankings[a.name] ?? 99) - (fifaRankings[b.name] ?? 99);
    });
  }, [teams, groupFilter, teamStats]);

  // Confronto
  const tA = teams.find((t) => t.name === teamA);
  const tB = teams.find((t) => t.name === teamB);
  const showConfrontoBar = tA && tB && teamA !== teamB;

  let probA = 0, probDraw = 0, probB = 0;
  if (showConfrontoBar) {
    const rA = fifaRankings[teamA] ?? 48;
    const rB = fifaRankings[teamB] ?? 48;
    const pA = (50 - rA) * 2 + (teamStats[teamA]?.pts ?? 0) * 3;
    const pB = (50 - rB) * 2 + (teamStats[teamB]?.pts ?? 0) * 3;
    const total = pA + pB || 1;
    probA = Math.round((pA / total) * 75);
    probB = Math.round((pB / total) * 75);
    probDraw = 100 - probA - probB;
  }

  const selectCls = "rounded-lg border border-glass-border bg-surface px-3 py-2 text-[13px] text-silver outline-none transition focus:border-field/30";

  // Determine if showing a single group
  const isGroupView = groupFilter !== "all";

  return (
    <div className="animate-fade-up space-y-6">
      <div>
        <div className="mb-1 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-field/15 to-gold/10 text-lg">📊</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Classificação</h1>
            <p className="text-[12px] text-silver-dim">48 seleções · Ranking FIFA atualizado</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)} className={selectCls}>
          <option value="all">Todos os Grupos</option>
          {groups.map((g) => <option key={g.name} value={g.name.replace("Group ", "")}>Grupo {g.name.replace("Group ", "")}</option>)}
        </select>
        {isGroupView && (
          <span className="flex items-center rounded-lg bg-field/8 px-3 py-1.5 text-[11px] font-medium text-field">
            Grupo {groupFilter}
          </span>
        )}
      </div>

      <div className="glass overflow-x-auto rounded-2xl">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-glass-border text-[10px] uppercase tracking-wider text-silver-dim">
              {isGroupView && <th className="px-3 py-3 text-center w-8">#</th>}
              <th className="px-4 py-3 text-left">Seleção</th>
              {!isGroupView && <th className="px-3 py-3 text-left">Gr.</th>}
              <th className="px-3 py-3 text-center">FIFA</th>
              <th className="px-3 py-3 text-center">J</th>
              <th className="px-3 py-3 text-center">V</th>
              <th className="px-3 py-3 text-center">E</th>
              <th className="px-3 py-3 text-center">D</th>
              <th className="px-3 py-3 text-center">GM</th>
              <th className="px-3 py-3 text-center">GS</th>
              <th className="px-3 py-3 text-center">SG</th>
              <th className="px-3 py-3 text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, idx) => {
              const s = teamStats[t.name] ?? { gm: 0, gs: 0, w: 0, d: 0, l: 0, pts: 0 };
              const played = s.w + s.d + s.l;
              const saldo = s.gm - s.gs;
              const qualifies = isGroupView && idx < 2;
              return (
                <tr key={t.name} className={`border-b border-glass-border/50 transition hover:bg-white/[0.02] ${qualifies ? "bg-field/[0.03]" : ""}`}>
                  {isGroupView && (
                    <td className={`px-3 py-2.5 text-center text-[12px] font-bold ${idx === 0 ? "text-gold" : idx === 1 ? "text-field" : "text-silver-dim"}`}>
                      {idx + 1}
                    </td>
                  )}
                  <td className="px-4 py-2.5 font-medium">
                    <span className="mr-2">{t.flag_icon}</span>{pt(t.name)}
                  </td>
                  {!isGroupView && <td className="px-3 py-2.5 text-silver-dim">{t.group}</td>}
                  <td className="px-3 py-2.5 text-center text-gold">{fifaRankings[t.name] ?? "—"}º</td>
                  <td className="px-3 py-2.5 text-center">{played}</td>
                  <td className="px-3 py-2.5 text-center text-field">{s.w}</td>
                  <td className="px-3 py-2.5 text-center">{s.d}</td>
                  <td className="px-3 py-2.5 text-center text-danger">{s.l}</td>
                  <td className="px-3 py-2.5 text-center">{s.gm}</td>
                  <td className="px-3 py-2.5 text-center">{s.gs}</td>
                  <td className={`px-3 py-2.5 text-center font-semibold ${saldo > 0 ? "text-field" : saldo < 0 ? "text-danger" : "text-silver-dim"}`}>
                    {saldo > 0 ? "+" : ""}{saldo}
                  </td>
                  <td className="px-3 py-2.5 text-center font-bold text-white">{s.pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isGroupView && (
          <div className="border-t border-glass-border px-4 py-2 text-[10px] text-silver-dim">
            Top 2 classificam para fase eliminatória · Ordenado por: Pts → SG → GM → Ranking FIFA
          </div>
        )}
      </div>

      {/* Confronto */}
      <div className="glass rounded-2xl p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
          <span className="text-base">⚔️</span> Confronto Direto
        </h3>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <select value={teamA} onChange={(e) => setTeamA(e.target.value)} className={`min-w-[150px] ${selectCls}`}>
            <option value="">Selecionar...</option>
            {teams.map((t) => <option key={t.name} value={t.name}>{t.flag_icon} {pt(t.name)}</option>)}
          </select>
          <span className="text-sm font-bold text-silver-dim">VS</span>
          <select value={teamB} onChange={(e) => setTeamB(e.target.value)} className={`min-w-[150px] ${selectCls}`}>
            <option value="">Selecionar...</option>
            {teams.map((t) => <option key={t.name} value={t.name}>{t.flag_icon} {pt(t.name)}</option>)}
          </select>
        </div>

        {showConfrontoBar && (
          <div className="mt-5 animate-fade-up">
            <div className="mb-2 flex justify-between text-[12px] font-medium">
              <span className="text-field">{tA.flag_icon} {pt(tA.name)} · {probA}%</span>
              <span className="text-silver-dim">Empate · {probDraw}%</span>
              <span className="text-gold">{tB.flag_icon} {pt(tB.name)} · {probB}%</span>
            </div>
            <div className="flex h-6 overflow-hidden rounded-full bg-pitch">
              <div className="flex items-center justify-center text-[10px] font-bold text-pitch transition-all duration-700 bg-field" style={{ width: `${probA}%` }}>
                {probA > 10 ? `${probA}%` : ""}
              </div>
              <div className="flex items-center justify-center text-[10px] font-bold text-pitch transition-all duration-700 bg-silver-dim" style={{ width: `${probDraw}%` }}>
                {probDraw > 8 ? `${probDraw}%` : ""}
              </div>
              <div className="flex items-center justify-center text-[10px] font-bold text-pitch transition-all duration-700 bg-gold" style={{ width: `${probB}%` }}>
                {probB > 10 ? `${probB}%` : ""}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px]">
              <div><div className="font-bold text-white">{fifaRankings[teamA] ?? "—"}º</div><div className="text-silver-dim">Ranking</div></div>
              <div className="text-silver-dim">vs</div>
              <div><div className="font-bold text-white">{fifaRankings[teamB] ?? "—"}º</div><div className="text-silver-dim">Ranking</div></div>
              <div><div className="font-bold text-field">{teamStats[teamA]?.gm ?? 0}</div><div className="text-silver-dim">Gols</div></div>
              <div className="text-silver-dim">—</div>
              <div><div className="font-bold text-field">{teamStats[teamB]?.gm ?? 0}</div><div className="text-silver-dim">Gols</div></div>
              <div><div className="font-bold text-white">{teamStats[teamA]?.pts ?? 0}</div><div className="text-silver-dim">Pontos</div></div>
              <div className="text-silver-dim">—</div>
              <div><div className="font-bold text-white">{teamStats[teamB]?.pts ?? 0}</div><div className="text-silver-dim">Pontos</div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
