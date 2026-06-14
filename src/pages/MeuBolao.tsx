import { useState, Fragment } from "react";
import { initialParticipants, rounds, calcPoints } from "../data/bolao";
import type { Participant } from "../data/bolao";

export default function MeuBolao() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [currentRound, setCurrentRound] = useState("Rodada 1");
  const [newName, setNewName] = useState("");

  const roundData = rounds[currentRound] ?? [];
  const sorted = [...participants].sort((a, b) => b.totalPts - a.totalPts);

  function addParticipant() {
    const name = newName.trim();
    if (!name || participants.find((p) => p.name === name)) return;
    setParticipants((prev) => [...prev, { name, totalPts: 0, exatos: 0, parciais: 0 }]);
    setNewName("");
  }

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Meu Bolão</h1>
        <p className="text-[13px] text-silver-dim">Gerencie participantes e acompanhe o ranking</p>
      </div>

      {/* Add */}
      <div className="mb-5 flex flex-wrap gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addParticipant()}
          placeholder="Novo participante..."
          className="min-w-[180px] flex-1 rounded-lg border border-glass-border bg-surface px-4 py-2.5 text-[13px] text-silver placeholder:text-silver-dim outline-none transition focus:border-field/30"
        />
        <button onClick={addParticipant} className="rounded-lg bg-field px-5 py-2.5 text-[13px] font-semibold text-pitch transition hover:bg-field-dim">
          Adicionar
        </button>
      </div>

      {/* Rounds */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {Object.keys(rounds).map((r) => (
          <button
            key={r}
            onClick={() => setCurrentRound(r)}
            className={`rounded-full px-3.5 py-1.5 text-[12px] transition ${
              r === currentRound
                ? "bg-field font-semibold text-pitch"
                : "border border-glass-border bg-transparent text-silver-dim hover:text-silver"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Palpites table */}
      <div className="glass mb-6 overflow-x-auto rounded-xl">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-glass-border text-[10px] uppercase tracking-wider text-silver-dim">
              <th className="px-4 py-2.5 text-left">#</th>
              <th className="px-4 py-2.5 text-left">Participante</th>
              <th className="px-3 py-2.5 text-center">Palpite</th>
              <th className="px-3 py-2.5 text-center">Resultado</th>
              <th className="px-3 py-2.5 text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {roundData.map((game, gi) => (
              <Fragment key={gi}>
                <tr>
                  <td colSpan={5} className="bg-field/[0.03] px-4 py-2 text-[12px] font-semibold text-gold">
                    {game.match} → {game.result}
                  </td>
                </tr>
                {Object.entries(game.guesses).map(([name, guess], i) => {
                  const { pts, type } = calcPoints(guess, game.result);
                  return (
                    <tr key={`${gi}-${i}`} className="border-b border-glass-border/30 transition hover:bg-white/[0.01]">
                      <td className="px-4 py-2 text-silver-dim">{i + 1}</td>
                      <td className="px-4 py-2">{name}</td>
                      <td className="px-3 py-2 text-center">{guess}</td>
                      <td className="px-3 py-2 text-center text-silver-dim">{game.result}</td>
                      <td className={`px-3 py-2 text-center font-semibold ${type === "exact" ? "text-gold" : type === "partial" ? "text-field" : "text-danger"}`}>
                        {pts}
                      </td>
                    </tr>
                  );
                })}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ranking */}
      <h3 className="mb-3 text-sm font-semibold text-white">Ranking Geral</h3>
      <div className="glass overflow-x-auto rounded-xl">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-glass-border text-[10px] uppercase tracking-wider text-silver-dim">
              <th className="px-4 py-2.5 text-left">#</th>
              <th className="px-4 py-2.5 text-left">Nome</th>
              <th className="px-3 py-2.5 text-center">Pts</th>
              <th className="px-3 py-2.5 text-center">Exatos</th>
              <th className="px-3 py-2.5 text-center">Parciais</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr key={p.name} className="border-b border-glass-border/30 transition hover:bg-white/[0.01]">
                <td className={`px-4 py-2.5 font-bold ${i === 0 ? "text-gold" : i === 1 ? "text-gray-300" : i === 2 ? "text-amber-700" : "text-silver-dim"}`}>
                  {i + 1}º
                </td>
                <td className="px-4 py-2.5 font-medium">{p.name}</td>
                <td className="px-3 py-2.5 text-center font-bold text-white">{p.totalPts}</td>
                <td className="px-3 py-2.5 text-center text-field">{p.exatos}</td>
                <td className="px-3 py-2.5 text-center">{p.parciais}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
