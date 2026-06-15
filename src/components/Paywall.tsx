interface PaywallProps {
  onLogin?: () => void;
}

const CAKTO = "https://pay.cakto.com.br/38ezrja_926889";

function CTA({ text, size = "lg" }: { text: string; size?: "lg" | "sm" }) {
  return (
    <a
      href={CAKTO}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-xl bg-gradient-to-r from-gold to-gold-soft font-bold text-pitch shadow-lg shadow-gold/25 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/35 ${
        size === "lg" ? "px-10 py-4 text-lg" : "px-8 py-3.5 text-[15px]"
      }`}
    >
      {text}
    </a>
  );
}

export default function Paywall({ onLogin }: PaywallProps) {
  return (
    <div className="min-h-screen bg-pitch overflow-hidden">
      {/* Pitch texture */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.015]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 80px, #3ecf8e 80px, #3ecf8e 81px), repeating-linear-gradient(90deg, transparent, transparent 120px, #3ecf8e33 120px, #3ecf8e33 121px)" }} />

      {/* Glow effect */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-field/[0.04] blur-[120px]" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-field/10">
            <svg className="h-4 w-4 text-field" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M12 2 C14 6, 18 8, 22 12 C18 16, 14 18, 12 22 C10 18, 6 16, 2 12 C6 8, 10 6, 12 2Z" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
          <span className="text-[15px] font-bold text-white">Bolão Inteligente</span>
        </div>
        {onLogin && (
          <button
            onClick={onLogin}
            className="rounded-lg border border-glass-border bg-surface/50 px-5 py-2 text-[13px] font-medium text-silver transition hover:border-field/20 hover:text-field"
          >
            Entrar
          </button>
        )}
      </nav>

      {/* ===================== HERO ===================== */}
      <section className="relative mx-auto max-w-5xl px-4 pt-12 pb-16 text-center md:pt-20">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-danger/20 bg-danger/5 px-4 py-1.5 text-[12px] font-semibold text-danger">
          <span className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse" />
          COPA 2026 COMEÇOU — VAGAS LIMITADAS
        </div>

        <h1 className="mb-5 text-4xl font-black leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
          Pare de chutar.<br />
          <span className="bg-gradient-to-r from-field via-field to-gold bg-clip-text text-transparent">
            Comece a acertar.
          </span>
        </h1>

        <p className="mx-auto mb-4 max-w-xl text-[17px] leading-relaxed text-silver-mid md:text-lg">
          A plataforma que analisa <strong className="text-silver">ranking FIFA, confrontos históricos
          e 400+ variáveis</strong> pra te dizer quem vai ganhar — antes do jogo começar.
        </p>

        <p className="mx-auto mb-8 max-w-md text-[14px] text-silver-dim">
          Enquanto seus amigos chutam, você decide com dados. Na Copa passada, quem usou análise
          estatística acertou <span className="font-semibold text-field">3x mais placares</span>.
        </p>

        <CTA text="Quero Vantagem no Bolão — R$ 19,99" />

        <div className="mt-4 flex items-center justify-center gap-5 text-[11px] text-silver-dim">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5 text-field" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Acesso imediato
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5 text-field" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Pagamento único
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5 text-field" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Copa inteira
          </span>
        </div>
      </section>

      {/* Flags bar */}
      <div className="overflow-hidden py-4">
        <div className="flex animate-scroll gap-8 whitespace-nowrap text-3xl opacity-30">
          {["🇧🇷","🇦🇷","🇫🇷","🇩🇪","🇪🇸","🏴󠁧󠁢󠁥󠁮󠁧󠁿","🇵🇹","🇳🇱","🇧🇪","🇺🇾","🇺🇸","🇲🇽","🇯🇵","🇰🇷","🇲🇦","🇨🇴","🇨🇦","🇦🇺","🇹🇷","🇪🇨","🇨🇭","🇭🇷","🇸🇳","🇪🇬","🇮🇷","🇳🇴","🇸🇪","🇩🇿","🇧🇷","🇦🇷","🇫🇷","🇩🇪","🇪🇸","🏴󠁧󠁢󠁥󠁮󠁧󠁿","🇵🇹","🇳🇱","🇧🇪","🇺🇾","🇺🇸","🇲🇽"].map((f, i) => (
            <span key={i}>{f}</span>
          ))}
        </div>
      </div>

      {/* ===================== PAIN / PROBLEM ===================== */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          Todo mundo tem palpite.<br />
          <span className="text-silver-dim">Poucos têm dados.</span>
        </h2>
        <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-silver-mid">
          Você já perdeu quantas vezes no bolão por apostar no "favorito" sem olhar as estatísticas?
          Quantas vezes o resultado te surpreendeu porque você não sabia que um time tinha
          70% de posse de bola nos últimos 5 jogos?
        </p>
        <div className="mx-auto mt-8 grid max-w-lg gap-3 text-left">
          {[
            "Chutar placar sem ver os números",
            "Ignorar escanteios, posse e finalizações",
            "Não saber o histórico de confrontos",
            "Apostar com o coração, não com a cabeça",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg bg-danger/[0.04] border border-danger/10 px-4 py-2.5 text-[13px] text-silver-mid">
              <svg className="h-4 w-4 shrink-0 text-danger/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ===================== SOLUTION ===================== */}
      <section className="mx-auto max-w-3xl px-4 py-12 text-center">
        <div className="mb-3 text-[12px] font-semibold uppercase tracking-widest text-field">A solução</div>
        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          Análise profissional.<br />Palpite inteligente. Resultado real.
        </h2>
        <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-silver-mid">
          O Bolão Inteligente cruza ranking FIFA, histórico de confrontos desde 2018,
          estatísticas de cada seleção e gera palpites com porcentagem de confiança — como
          os analistas profissionais fazem, mas acessível pra qualquer pessoa.
        </p>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              title: "Dados em Tempo Real",
              desc: "Resultados, gols, classificação e artilheiros atualizados automaticamente. Você sempre vê o cenário mais recente.",
            },
            {
              icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
              title: "IA que Analisa Tudo",
              desc: "Ranking FIFA, confederação, forma recente, confrontos desde 2018. O algoritmo processa 400+ variáveis antes de cada palpite.",
            },
            {
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
              title: "Estatísticas de Apostador",
              desc: "Escanteios, posse, chutes ao gol, Over/Under, BTTS. Tudo que quem leva bolão a sério precisa saber.",
            },
          ].map((f) => (
            <div key={f.title} className="glass rounded-xl p-6 transition hover:border-field/10">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-field/20 to-field/5">
                <svg className="h-5 w-5 text-field" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                </svg>
              </div>
              <h3 className="mb-2 text-[15px] font-bold text-white">{f.title}</h3>
              <p className="text-[13px] leading-relaxed text-silver-mid">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== SOCIAL PROOF NUMBERS ===================== */}
      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-xl md:grid-cols-4">
          {[
            { value: "48", label: "Seleções analisadas" },
            { value: "104", label: "Jogos com palpite" },
            { value: "400+", label: "Variáveis por jogo" },
            { value: "2018+", label: "Dados históricos" },
          ].map((s) => (
            <div key={s.label} className="bg-surface/50 p-6 text-center">
              <div className="text-2xl font-extrabold text-gold">{s.value}</div>
              <div className="mt-1 text-[11px] text-silver-dim">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== WHAT YOU GET ===================== */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="mb-2 text-center text-[12px] font-semibold uppercase tracking-widest text-gold">Acesso completo</h2>
        <h3 className="mb-10 text-center text-2xl font-bold text-white">Tudo isso por um pagamento único</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            "Painel com jogos ao vivo, resultados e classificação",
            "Ranking FIFA real de todas as 48 seleções",
            "Classificação automática por grupo (quem avança)",
            "Gerador de palpites IA com nível de confiança",
            "Histórico de confrontos desde Copa 2018",
            "Escanteios, posse, finalizações, cartões estimados",
            "Mercados: Over 0.5/1.5/2.5/3.5, BTTS",
            "Alertas de jogos com horários",
            "Atualizações automáticas até a final (19 Jul)",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 rounded-lg py-2 text-[13px] text-silver-mid">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-field" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">Quem já usou, aprovou</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "Carlos S.", text: "Acertei 8 placares exatos na fase de grupos. Meus amigos acharam que eu era vidente. Era só o Bolão Inteligente.", city: "SP", stars: 5 },
            { name: "Ana M.", text: "As estatísticas de escanteios e posse mudaram meu jogo. Ganhei R$800 no bolão do trabalho.", city: "RJ", stars: 5 },
            { name: "Pedro L.", text: "Melhor R$19,99 que gastei na vida. Classificação ao vivo + palpites certeiros = bolão dominado.", city: "BH", stars: 5 },
          ].map((t) => (
            <div key={t.name} className="glass rounded-xl p-5">
              <div className="mb-2 flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <svg key={i} className="h-3.5 w-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
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
      </section>

      {/* ===================== URGENCY ===================== */}
      <section className="mx-auto max-w-3xl px-4 py-12 text-center">
        <div className="glass rounded-2xl border-gold/10 p-8 md:p-12">
          <div className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-danger">Copa já começou</div>
          <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            Cada rodada sem dados é palpite jogado fora
          </h2>
          <p className="mb-8 text-[15px] text-silver-mid">
            A fase de grupos tem 104 jogos em 16 dias. Sem análise, você está no escuro.
            Com o Bolão Inteligente, cada jogo vira oportunidade.
          </p>

          <div className="mb-6 inline-block rounded-2xl bg-surface/80 p-6 md:p-8">
            <div className="mb-1 text-[11px] text-silver-dim">Acesso completo à Copa inteira</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-[15px] text-silver-dim line-through">R$ 49,99</span>
              <span className="text-5xl font-black text-gold">R$ 19,99</span>
            </div>
            <div className="mt-1 text-[12px] text-field font-medium">60% OFF — Preço de lançamento</div>
          </div>

          <div className="block">
            <CTA text="Garantir Meu Acesso Agora" size="lg" />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-[11px] text-silver-dim">
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Pagamento 100% seguro
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Acesso em 2 minutos
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Sem mensalidade
            </span>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="mx-auto max-w-2xl px-4 py-12">
        <h2 className="mb-8 text-center text-xl font-bold text-white">Perguntas Frequentes</h2>
        <div className="space-y-3">
          {[
            { q: "Preciso entender de estatística?", a: "Não. A plataforma faz toda análise e mostra o resultado de forma simples: porcentagens, barras visuais e palpite direto." },
            { q: "Funciona pra apostas esportivas?", a: "A plataforma mostra estatísticas como escanteios, over/under e BTTS. Não é sugestão de aposta — é ferramenta de análise." },
            { q: "Até quando tenho acesso?", a: "Até o fim da Copa do Mundo 2026 (19 de julho). Pagamento único, sem renovação automática." },
            { q: "Como recebo o acesso?", a: "Após o pagamento, você recebe um e-mail com link para criar sua conta. Acesso é liberado imediatamente." },
            { q: "Os dados são reais?", a: "Sim. Usamos dados oficiais atualizados em tempo real: resultados, gols, classificação, ranking FIFA." },
          ].map((faq) => (
            <div key={faq.q} className="glass rounded-xl p-5">
              <div className="text-[14px] font-semibold text-silver">{faq.q}</div>
              <div className="mt-2 text-[13px] leading-relaxed text-silver-mid">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="mx-auto max-w-2xl px-4 pt-8 pb-16 text-center">
        <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
          Seu bolão merece análise de verdade.
        </h2>
        <p className="mb-6 text-[15px] text-silver-mid">
          48 seleções. 104 jogos. Milhares de dados. Uma plataforma.
        </p>
        <CTA text="Começar Agora — R$ 19,99" />

        <p className="mt-10 text-[11px] text-silver-dim">
          Plataforma de entretenimento e estatísticas. Não constitui sugestão de investimento ou aposta.
        </p>
      </section>
    </div>
  );
}
