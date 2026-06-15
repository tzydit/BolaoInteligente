import type { PageId } from "../App";
import { useAuth } from "../App";

const navItems: { id: PageId; label: string; icon: string; badge?: string }[] = [
  { id: "inicio", label: "Início", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "analise", label: "Classificação", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { id: "gerador", label: "Palpites IA", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", badge: "IA" },
  { id: "alertas", label: "Calendário", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { id: "aviso", label: "Aviso Legal", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" },
  { id: "config", label: "Configurações", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ currentPage, onNavigate, open, onClose }: SidebarProps) {
  const { user, paid } = useAuth();
  const displayName = user?.email?.split("@")[0] ?? "Usuário";
  const initial = displayName[0]?.toUpperCase() ?? "U";

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={onClose} />}

      <nav className={`fixed left-0 top-0 bottom-0 z-50 flex w-60 flex-col border-r border-glass-border bg-pitch-light/98 backdrop-blur-xl transition-transform duration-300 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-field/20 to-field/5 ring-1 ring-field/10">
            <span className="text-base">⚽</span>
          </div>
          <div>
            <div className="text-[14px] font-bold text-white tracking-tight">Bolão Inteligente</div>
            <div className="text-[10px] text-field font-medium">Copa 2026</div>
          </div>
        </div>

        <div className="mx-4 h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />

        {/* Nav */}
        <div className="flex flex-1 flex-col gap-0.5 px-3 py-4">
          <div className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-silver-dim">Menu</div>
          {navItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); onClose(); }}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-all ${
                  active
                    ? "bg-field/10 text-field shadow-sm shadow-field/5"
                    : "text-silver-dim hover:bg-white/[0.04] hover:text-silver"
                }`}
              >
                <svg className={`h-[18px] w-[18px] transition ${active ? "text-field" : "text-silver-dim group-hover:text-silver-mid"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold ${active ? "bg-field/20 text-field" : "bg-gold/10 text-gold"}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mx-4 h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />

        {/* User */}
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-field to-gold text-[12px] font-bold text-pitch shadow-sm">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12px] font-medium text-silver">{displayName}</div>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-field" />
              <span className="text-[10px] text-field">{paid ? "Premium" : "Ativo"}</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
