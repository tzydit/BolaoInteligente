export default function AvisoLegal() {
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Aviso Legal</h1>
        <p className="text-[13px] text-silver-dim">Informações importantes sobre o uso desta plataforma</p>
      </div>

      <div className="glass rounded-xl p-6 mb-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
            <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">Esta NÃO é uma plataforma de sugestão de investimento</h2>
        </div>

        <div className="space-y-4 text-[13px] leading-relaxed text-silver-mid">
          <p>
            O <strong className="text-white">Bolão Inteligente</strong> é uma plataforma de <strong className="text-field">entretenimento e estatísticas esportivas</strong>.
            Todos os dados, análises e palpites apresentados são baseados em estatísticas públicas e têm caráter exclusivamente informativo e recreativo.
          </p>

          <p>
            Os palpites gerados pela funcionalidade de "IA" são baseados em dados estatísticos como ranking FIFA,
            resultados recentes e histórico de confrontos. Eles <strong className="text-gold">NÃO constituem recomendação, sugestão ou incentivo a apostas esportivas</strong> ou qualquer tipo de investimento financeiro.
          </p>
        </div>
      </div>

      <div className="glass rounded-xl p-6 mb-4">
        <h3 className="mb-3 text-sm font-semibold text-gold">O que esta plataforma oferece</h3>
        <ul className="space-y-2.5">
          {[
            "Dados estatísticos reais das seleções participantes da Copa do Mundo 2026",
            "Ranking FIFA atualizado e resultados oficiais dos jogos",
            "Análise comparativa entre seleções baseada em dados públicos",
            "Estimativas estatísticas de probabilidade (escanteios, posse de bola, etc.)",
            "Ferramenta de gerenciamento de bolão entre amigos (entretenimento)",
            "Alertas informativos sobre horários de jogos",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[13px] text-silver-mid">
              <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-field/10">
                <svg className="h-2.5 w-2.5 text-field" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-xl p-6 mb-4">
        <h3 className="mb-3 text-sm font-semibold text-gold">O que esta plataforma NÃO faz</h3>
        <ul className="space-y-2.5">
          {[
            "NÃO sugere, incentiva ou recomenda apostas esportivas de nenhum tipo",
            "NÃO fornece consultoria financeira ou de investimento",
            "NÃO garante resultados ou acuracidade nas previsões estatísticas",
            "NÃO tem vínculo com casas de apostas ou operadoras de jogos",
            "NÃO se responsabiliza por decisões tomadas com base nas informações apresentadas",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[13px] text-silver-mid">
              <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-danger/10">
                <svg className="h-2.5 w-2.5 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-xl p-6">
        <h3 className="mb-3 text-sm font-semibold text-gold">Responsabilidade do Usuário</h3>
        <div className="space-y-3 text-[13px] leading-relaxed text-silver-mid">
          <p>
            O usuário reconhece que todas as informações estatísticas são fornecidas "como estão" (as is),
            sem garantias de qualquer natureza. Resultados passados não garantem resultados futuros.
          </p>
          <p>
            Ao utilizar esta plataforma, o usuário concorda que o faz por sua própria conta e risco,
            exclusivamente para fins de entretenimento e gestão de bolões recreativos entre amigos.
          </p>
          <p>
            Caso você ou alguém que você conhece tenha problemas com jogos de azar,
            procure ajuda profissional. No Brasil, ligue para o CVV: <strong className="text-white">188</strong>.
          </p>
        </div>

        <div className="mt-5 rounded-lg bg-gold/5 px-4 py-3 text-center text-[12px] text-gold">
          Plataforma de entretenimento e estatísticas · Sem vínculo com apostas esportivas
        </div>
      </div>
    </div>
  );
}
