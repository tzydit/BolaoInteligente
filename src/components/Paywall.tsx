interface PaywallProps {
  onLogin?: () => void;
}

export default function Paywall({ onLogin }: PaywallProps) {
  return (
    <div className="min-h-screen bg-pitch">
      {/* Subtle pitch lines */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 80px, #3ecf8e 80px, #3ecf8e 81px)" }} />

      {/* Top bar with login */}
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-[14px] font-bold text-white">Bolão Inteligente</span>
        {onLogin && (
          <button
            onClick={onLogin}
            className="rounded-lg border border-field/20 bg-field/5 px-5 py-2 text-[13px] font-medium text-field transition hover:bg-field/10"
          >
            Entrar
          </button>
        )}
      </div>

      {/* Hero */}
      <div className="relative mx-auto max-w-4xl px-4 pt-8 pb-12 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-field/20 bg-field/5 px-4 py-1.5 text-[12px] font-medium text-field">
          <span className="h-1.5 w-1.5 rounded-full bg-field animate-pulse" />
          Copa do Mundo 2026 — Ao Vivo
        </div>

        <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
          Domine seu bolão com{" "}
          <span className="bg-gradient-to-r from-field to-gold bg-clip-text text-transparent">
            Inteligência Artificial
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-silver-mid md:text-lg">
          Dados reais de todas as 48 seleções. Estatísticas avançadas: escanteios, posse de bola,
          chances de gol. Palpites gerados por IA com base em ranking FIFA e resultados oficiais.
        </p>

        <a
          href="https://pay.cakto.com.br/38ezrja_926889"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl bg-gradient-to-r from-gold to-gold-soft px-10 py-4 text-lg font-bold text-pitch shadow-lg shadow-gold/25 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/35"
        >
          Quero Acesso Completo — R$ 47,00
        </a>
        <p className="mt-3 text-[12px] text-silver-dim">Pagamento único · Acesso imediato · Sem mensalidade</p>
      </div>

      {/* Flags bar */}
      <div className="overflow-hidden py-6">
        <div className="flex animate-scroll gap-6 whitespace-nowrap text-3xl">
          {["🇧🇷","🇦🇷","🇫🇷","🇩🇪","🇪🇸","🇬🇧","🇵🇹","🇳🇱","🇧🇪","🇺🇾","🇺🇸","🇲🇽","🇯🇵","🇰🇷","🇲🇦","🇨🇴","🇨🇦","🇦🇺","🇹🇷","🇪🇨","🇨🇭","🇭🇷","🇸🇳","🇪🇬","🇮🇷","🇳🇴","🇸🇪","🇩🇿","🇦🇹","🇮🇶","🇧🇷","🇦🇷","🇫🇷","🇩🇪","🇪🇸","🇬🇧","🇵🇹","🇳🇱","🇧🇪","🇺🇾"].map((f, i) => (
            <span key={i} className="opacity-40">{f}</span>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-gold">Por que usar o Bolão Inteligente?</h2>
        <p className="mb-10 text-center text-2xl font-bold text-white">Tudo que você precisa para acertar mais</p>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              title: "Dados Reais em Tempo Real",
              desc: "Resultados oficiais, gols, artilheiros e classificação atualizados automaticamente durante toda a Copa do Mundo 2026.",
            },
            {
              icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
              title: "Palpites com IA",
              desc: "Algoritmo analisa ranking FIFA, resultados recentes, histórico de confrontos e gera palpites com nível de confiança.",
            },
            {
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
              title: "Estatísticas Avançadas",
              desc: "Escanteios, posse de bola, chutes ao gol, chances de over/under, ambos marcam — tudo calculado para cada jogo.",
            },
          ].map((f) => (
            <div key={f.title} className="glass rounded-xl p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-field/10">
                <svg className="h-5 w-5 text-field" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                </svg>
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-white">{f.title}</h3>
              <p className="text-[13px] leading-relaxed text-silver-mid">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats social proof */}
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-xl md:grid-cols-4">
          {[
            { value: "48", label: "Seleções" },
            { value: "104", label: "Jogos" },
            { value: "12", label: "Grupos" },
            { value: "16", label: "Estádios" },
          ].map((s) => (
            <div key={s.label} className="bg-surface/50 p-6 text-center">
              <div className="text-2xl font-extrabold text-gold">{s.value}</div>
              <div className="mt-1 text-[11px] text-silver-dim">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What you get */}
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">O que você recebe</h2>
        <div className="space-y-3">
          {[
            "Painel com todos os jogos, resultados e classificação ao vivo",
            "Análise completa das 48 seleções com ranking FIFA real",
            "Filtro por grupo com classificação automática (quem avança)",
            "Confronto direto entre qualquer par de seleções",
            "Gerador de palpites com IA baseado em dados estatísticos reais",
            "Estatísticas avançadas: escanteios, posse, finalizações, cartões",
            "Mercados de gols: Over 1.5, Over 2.5, Ambos Marcam (BTTS)",
            "Alertas de jogos com horários na sua timezone",
            "Atualizações automáticas durante toda a Copa (11 Jun — 19 Jul)",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 text-[14px] text-silver-mid">
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-field" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">O que dizem os usuários</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "Carlos S.", text: "Acertei 8 placares exatos na fase de grupos. A IA realmente faz diferença.", city: "São Paulo" },
            { name: "Ana M.", text: "As estatísticas de escanteios e posse me ajudam muito nas análises. Vale cada centavo.", city: "Rio de Janeiro" },
            { name: "Pedro L.", text: "Melhor investimento pra Copa. Classificação ao vivo e palpites certeiros.", city: "Belo Horizonte" },
          ].map((t) => (
            <div key={t.name} className="glass rounded-xl p-5">
              <p className="mb-3 text-[13px] leading-relaxed text-silver-mid">"{t.text}"</p>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-field/10 text-[11px] font-bold text-field">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-[12px] font-medium text-silver">{t.name}</div>
                  <div className="text-[10px] text-silver-dim">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Final */}
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h2 className="mb-3 text-3xl font-extrabold text-white">Não fique de fora da Copa</h2>
        <p className="mb-6 text-silver-mid">
          Acesso completo à plataforma durante toda a Copa do Mundo 2026. Dados reais, IA, estatísticas avançadas.
        </p>

        <div className="glass mx-auto max-w-sm rounded-2xl p-8">
          <div className="mb-1 text-[12px] text-silver-dim">Acesso único</div>
          <div className="mb-1 text-5xl font-extrabold text-gold">R$ 47</div>
          <div className="mb-6 text-[12px] text-silver-dim">Pagamento único · Sem renovação</div>

          <a
            href="https://pay.cakto.com.br/38ezrja_926889"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl bg-gradient-to-r from-gold to-gold-soft py-4 text-center text-[15px] font-bold text-pitch shadow-lg shadow-gold/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold/35"
          >
            Liberar Acesso Agora
          </a>

          <div className="mt-4 flex justify-center gap-4 text-[10px] text-silver-dim">
            <span>🔒 Pagamento seguro</span>
            <span>⚡ Acesso imediato</span>
          </div>
        </div>

        <p className="mt-8 text-[11px] text-silver-dim">
          Esta plataforma é de entretenimento e estatísticas. Não constitui sugestão de investimento ou aposta.
        </p>
      </div>
    </div>
  );
}
