import { useState } from "react";
import { useWC, useAuth } from "../App";

function Toggle({ initial = false }: { initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative h-6 w-10 shrink-0 rounded-full transition ${on ? "bg-field" : "border border-glass-border bg-surface"}`}
    >
      <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${on ? "left-5" : "left-1"}`} />
    </button>
  );
}

function Row({ label, sub, right }: { label: string; sub: string; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-glass-border/30 last:border-0">
      <div>
        <div className="text-[13px] text-silver">{label}</div>
        <div className="text-[11px] text-silver-dim">{sub}</div>
      </div>
      {right}
    </div>
  );
}

export default function Config() {
  const { teams, matches } = useWC();
  const { user, paid, logout } = useAuth();
  const finished = matches.filter((m) => m.score).length;

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Configurações</h1>
        <p className="text-[13px] text-silver-dim">Personalize sua experiência</p>
      </div>

      <div className="glass mb-4 rounded-xl p-5">
        <h3 className="mb-3 text-[13px] font-semibold text-gold">Notificações</h3>
        <Row label="Lembrete antes dos jogos" sub="Alerta 30min antes do início" right={<Toggle initial />} />
        <Row label="Placar ao vivo" sub="Notificações de gols em tempo real" right={<Toggle initial />} />
        <Row label="Palpite do dia" sub="Sugestão da IA antes de cada rodada" right={<Toggle initial />} />
      </div>

      <div className="glass mb-4 rounded-xl p-5">
        <h3 className="mb-3 text-[13px] font-semibold text-gold">Conta</h3>
        {user ? (
          <>
            <Row label="E-mail" sub={user.email ?? "—"} right={
              <span className="rounded-full bg-field/10 px-2.5 py-0.5 text-[10px] font-medium text-field">Logado</span>
            } />
            <Row label="Pagamento" sub={paid ? "Acesso liberado via Cakto" : "Acesso via link direto"} right={
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${paid ? "bg-gold/10 text-gold" : "bg-field/10 text-field"}`}>
                {paid ? "Pago" : "Ativo"}
              </span>
            } />
            <div className="mt-3 pt-3 border-t border-glass-border/30">
              <button
                onClick={logout}
                className="rounded-lg bg-danger/10 px-4 py-2 text-[12px] font-medium text-danger transition hover:bg-danger/20"
              >
                Sair da conta
              </button>
            </div>
          </>
        ) : (
          <Row label="Acesso" sub="Via link direto (sem conta)" right={
            <span className="rounded-full bg-field/10 px-2.5 py-0.5 text-[10px] font-medium text-field">Ativo</span>
          } />
        )}
      </div>

      <div className="glass mb-4 rounded-xl p-5">
        <h3 className="mb-3 text-[13px] font-semibold text-gold">Dados</h3>
        <Row label="Fonte de dados" sub="openfootball/worldcup.json (GitHub)" right={
          <span className="rounded-full bg-field/10 px-2.5 py-0.5 text-[10px] font-medium text-field">Conectado</span>
        } />
        <Row label="Times carregados" sub={`${teams.length} seleções`} right={
          <span className="text-[12px] text-silver">{teams.length}</span>
        } />
        <Row label="Jogos atualizados" sub={`${finished} jogos com resultado`} right={
          <span className="text-[12px] text-silver">{finished}/104</span>
        } />
        <Row label="Cache" sub="Dados atualizados a cada 5 minutos" right={
          <button onClick={() => { localStorage.removeItem("bolao_wc_data"); window.location.reload(); }} className="rounded-md bg-surface px-3 py-1.5 text-[11px] text-silver-dim transition hover:text-field">
            Atualizar agora
          </button>
        } />
      </div>

      <div className="glass rounded-xl p-5">
        <h3 className="mb-3 text-[13px] font-semibold text-gold">Plano</h3>
        <Row label="Status" sub="Premium · Acesso completo" right={
          <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[10px] font-medium text-gold">Ativo</span>
        } />
      </div>
    </div>
  );
}
