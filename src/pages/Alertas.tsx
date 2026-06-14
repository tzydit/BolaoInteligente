import { useState } from "react";
import { useWC } from "../App";
import { pt } from "../api/translations";

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

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Alertas de Jogos</h1>
        <p className="text-[13px] text-silver-dim">Ative lembretes para não perder nenhum jogo</p>
      </div>

      <div className="space-y-2">
        {upcoming.map((m, i) => {
          const t1 = teams.find((t) => t.name === m.team1);
          const t2 = teams.find((t) => t.name === m.team2);
          const active = alerts.has(i);

          return (
            <div key={i} className="glass flex items-center justify-between rounded-xl px-5 py-3.5 transition hover:border-field/10">
              <div className="flex items-center gap-3">
                <span className="text-lg">{t1?.flag_icon}</span>
                <div>
                  <div className="text-[13px] font-medium text-silver">{pt(m.team1)} vs {pt(m.team2)}</div>
                  <div className="text-[11px] text-silver-dim">{m.date.slice(5)} · {m.time?.replace(" UTC-6", "") ?? ""} · {m.group?.replace("Group", "Grupo")}</div>
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

        {upcoming.length === 0 && (
          <div className="glass rounded-xl p-8 text-center text-sm text-silver-dim">
            Nenhum jogo futuro encontrado
          </div>
        )}
      </div>
    </div>
  );
}
