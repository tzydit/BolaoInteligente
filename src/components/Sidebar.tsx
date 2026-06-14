import type { PageId } from "../App";

const navItems: { id: PageId; label: string; path: string }[] = [
  { id: "inicio", label: "Início", path: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "analise", label: "Análise", path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { id: "gerador", label: "Palpites IA", path: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { id: "alertas", label: "Alertas", path: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
  { id: "aviso", label: "Aviso Legal", path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" },
  { id: "config", label: "Config", path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  open: boolean;
  onClose: () => void;
}

function NavIcon({ path }: { path: string }) {
  return (
    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export default function Sidebar({ currentPage, onNavigate, open, onClose }: SidebarProps) {
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" onClick={onClose} />}

      <nav className={`fixed left-0 top-0 bottom-0 z-50 flex w-56 flex-col bg-pitch-light/95 backdrop-blur-xl transition-transform duration-300 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-field/10">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-field" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2 L14 7 L12 9 L10 7 Z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">Bolão Inteligente</span>
        </div>

        <div className="mx-4 h-px bg-glass-border" />

        <div className="flex flex-1 flex-col gap-0.5 px-3 py-3">
          {navItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); onClose(); }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-all ${
                  active
                    ? "bg-field/10 text-field"
                    : "text-silver-dim hover:bg-white/[0.03] hover:text-silver-mid"
                }`}
              >
                <NavIcon path={item.path} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mx-4 h-px bg-glass-border" />
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-field to-gold text-[11px] font-bold text-pitch">
            JM
          </div>
          <div>
            <div className="text-[12px] font-medium text-silver">João Miguel</div>
            <div className="text-[10px] text-gold">Premium</div>
          </div>
        </div>
      </nav>
    </>
  );
}
