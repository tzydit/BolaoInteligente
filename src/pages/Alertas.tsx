import { useState, useMemo } from "react";
import { useWC } from "../App";
import { pt } from "../api/translations";
import { formatDatePT, formatTime } from "../api/dates";

export default function Alertas() {
  const { matches, teams } = useWC();
  const upcoming = matches.filter((m) => !m.score && m.group);
  const [alerts, setAlerts] = useState<Set<number>>(new Set([0, 2, 5]));

  function toggle(i: number) {
    setAlerts((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  }

  const grouped = useMemo(() => {
    const map = new Map<string, { match: typeof upcoming[0]; idx: number }[]>();
    upcoming.forEach((m, i) => {
      const key = m.date;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push({ match: m, idx: i });
    });
    return [...map.entries()];
  }, [upcoming]);

  return (
    <div className="animate-fade-up space-y-6">
      <div>
        <div className="mb-1 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-field/15 to-gold/10 text-lg">📅</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Calendário</h1>
            <p className="text-[12px] text-silver-dim">{upcoming.length} jogos restantes · Ative lembretes</p>
          </div>
        </div>
      </div>

      {grouped.map(([date, items]) => (
        <div key={date}>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-px flex-1 bg-glass-border" />
            <span className="text-[11px] font-semibold text-gold">{formatDatePT(date)}</span>
            <div className="h-px flex-1 bg-glass-border" />
          </div>
          <div className="space-y-2">
            {items.map(({ match: m, idx: i }) => {
              const t1 = teams.find((t) => t.name === m.team1);
              const t2 = teams.find((t) => t.name === m.team2);
              const active = alerts.has(i);

              return (
                <div key={i} className="glass flex items-center justify-between rounded-2xl px-5 py-3.5 transition hover:border-field/12">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{t1?.flag_icon}</span>
                    <div>
                      <div className="text-[13px] font-medium text-silver">{pt(m.team1)} vs {pt(m.team2)}</div>
                      <div className="text-[11px] text-silver-dim">{formatTime(m.time)} · {m.group?.replace("Group", "Grupo")}</div>
                    </div>
                    <span className="text-lg">{t2?.flag_icon}</span>
                  </div>

                  <button
                    onClick={() => toggle(i)}
                    className={`relative h-6 w-10 shrink-0 rounded-full transition ${
                      active ? "bg-field" : "border border-glass-border bg-surface"
                    }`}
                  >
                    <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${active ? "left-5" : "left-1"}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {upcoming.length === 0 && (
        <div className="glass rounded-2xl p-8 text-center text-sm text-silver-dim">
          Nenhum jogo futuro encontrado
        </div>
      )}
    </div>
  );
}
