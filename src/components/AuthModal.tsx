import { useState } from "react";
import { registerUser, loginUser } from "../api/firebase";

interface AuthModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function AuthModal({ onSuccess, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        if (password.length < 6) {
          setError("Senha deve ter no mínimo 6 caracteres");
          setLoading(false);
          return;
        }
        await registerUser(email, password);
      } else {
        await loginUser(email, password);
      }
      onSuccess();
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      const map: Record<string, string> = {
        "auth/email-already-in-use": "Este e-mail já está cadastrado",
        "auth/invalid-email": "E-mail inválido",
        "auth/weak-password": "Senha muito fraca (mínimo 6 caracteres)",
        "auth/user-not-found": "Usuário não encontrado",
        "auth/wrong-password": "Senha incorreta",
        "auth/invalid-credential": "E-mail ou senha incorretos",
        "auth/too-many-requests": "Muitas tentativas. Aguarde um momento",
      };
      setError(map[code] ?? "Erro ao autenticar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="glass w-full max-w-md rounded-2xl p-8 animate-fade-up">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-white">
            {mode === "login" ? "Entrar" : "Criar Conta"}
          </h2>
          <p className="mt-1 text-[13px] text-silver-dim">
            {mode === "login"
              ? "Acesse sua conta do Bolão Inteligente"
              : "Cadastre-se para acessar a plataforma"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-silver-mid">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-lg border border-glass-border bg-surface px-4 py-2.5 text-[13px] text-silver outline-none transition placeholder:text-silver-dim/50 focus:border-field/30"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-silver-mid">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full rounded-lg border border-glass-border bg-surface px-4 py-2.5 text-[13px] text-silver outline-none transition placeholder:text-silver-dim/50 focus:border-field/30"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-danger/10 px-3 py-2 text-[12px] text-danger">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-field to-field-dim py-3 text-[14px] font-bold text-pitch transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-field/20 disabled:opacity-50 disabled:transform-none"
          >
            {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar Conta"}
          </button>
        </form>

        <div className="mt-5 text-center text-[12px] text-silver-dim">
          {mode === "login" ? (
            <>
              Não tem conta?{" "}
              <button onClick={() => { setMode("register"); setError(""); }} className="text-field hover:underline">
                Cadastre-se
              </button>
            </>
          ) : (
            <>
              Já tem conta?{" "}
              <button onClick={() => { setMode("login"); setError(""); }} className="text-field hover:underline">
                Faça login
              </button>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-silver-dim transition hover:text-silver"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
