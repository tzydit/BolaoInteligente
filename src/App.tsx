import { useState, useEffect, createContext, useContext } from "react";
import Paywall from "./components/Paywall";
import Sidebar from "./components/Sidebar";
import Inicio from "./pages/Inicio";
import Analise from "./pages/Analise";
import GeradorIA from "./pages/GeradorIA";
import Alertas from "./pages/Alertas";
import Config from "./pages/Config";
import AvisoLegal from "./pages/AvisoLegal";
import AuthModal from "./components/AuthModal";
import { useWorldCup } from "./hooks/useWorldCup";
import { onAuthChange, checkUserPaid, logoutUser, type User } from "./api/firebase";
import type { WorldCupData } from "./api/football";

export type PageId = "inicio" | "analise" | "gerador" | "alertas" | "aviso" | "config";

export const WorldCupContext = createContext<WorldCupData | null>(null);
export function useWC() {
  const ctx = useContext(WorldCupContext);
  if (!ctx) throw new Error("WorldCupContext not provided");
  return ctx;
}

interface AuthContextValue {
  user: User | null;
  paid: boolean;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextValue>({ user: null, paid: false, logout: () => {} });
export function useAuth() {
  return useContext(AuthContext);
}

const pages: Record<PageId, React.FC> = {
  inicio: Inicio,
  analise: Analise,
  gerador: GeradorIA,
  alertas: Alertas,
  aviso: AvisoLegal,
  config: Config,
};

function checkLegacyAccess(): boolean {
  if (localStorage.getItem("bolao_acesso") === "true") return true;
  const params = new URLSearchParams(window.location.search);
  if (params.get("acesso") === "true") {
    localStorage.setItem("bolao_acesso", "true");
    window.history.replaceState({}, "", window.location.pathname);
    return true;
  }
  return false;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [paid, setPaid] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [currentPage, setCurrentPage] = useState<PageId>("inicio");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, loading, error } = useWorldCup();

  const legacyAccess = checkLegacyAccess();
  const isAdmin = user?.email === "miguelcastanhoreisr@gmail.com";
  const unlocked = legacyAccess || paid || isAdmin;

  useEffect(() => {
    const unsub = onAuthChange(async (u) => {
      setUser(u);
      if (u) {
        const isPaid = await checkUserPaid(u.uid);
        setPaid(isPaid);
      } else {
        setPaid(false);
      }
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const onStorage = () => {
      if (localStorage.getItem("bolao_acesso") === "true") setPaid(true);
    };
    window.addEventListener("storage", onStorage);
    const onFocus = () => {
      if (checkLegacyAccess()) setPaid(true);
    };
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  // Auto-open register modal from email link (?register=email@...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const regEmail = params.get("register");
    if (regEmail) {
      setRegisterEmail(regEmail);
      setShowAuth(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  async function handleLogout() {
    await logoutUser();
    localStorage.removeItem("bolao_acesso");
    setPaid(false);
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pitch">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-pitch-line border-t-field animate-spin" />
          <p className="text-sm text-silver-dim">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <>
        <Paywall onLogin={() => setShowAuth(true)} />
        {showAuth && (
          <AuthModal
            onSuccess={() => setShowAuth(false)}
            onClose={() => setShowAuth(false)}
            defaultEmail={registerEmail}
            defaultMode={registerEmail ? "register" : "login"}
          />
        )}
      </>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pitch">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-pitch-line border-t-field animate-spin" />
          <p className="text-sm text-silver-dim">Carregando dados da Copa...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pitch">
        <div className="text-center">
          <p className="mb-2 text-sm text-danger">Erro ao carregar dados</p>
          <p className="text-xs text-silver-dim">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 rounded-lg bg-field/10 px-4 py-2 text-xs text-field transition hover:bg-field/20">
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const PageComponent = pages[currentPage];

  return (
    <AuthContext.Provider value={{ user, paid, logout: handleLogout }}>
      <WorldCupContext.Provider value={data}>
        <div className="flex min-h-screen bg-pitch">
          <Sidebar
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="fixed top-0 left-0 right-0 z-30 flex h-12 items-center justify-between border-b border-glass-border bg-pitch-light/90 backdrop-blur-xl px-4 md:hidden">
            <span className="text-[13px] font-semibold text-white">Bolão Inteligente</span>
            <button onClick={() => setSidebarOpen(true)} className="text-silver-mid">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <main className="min-h-screen flex-1 px-6 py-6 md:ml-56 max-md:mt-12 max-md:px-4">
            <PageComponent />
          </main>
        </div>
      </WorldCupContext.Provider>
    </AuthContext.Provider>
  );
}
