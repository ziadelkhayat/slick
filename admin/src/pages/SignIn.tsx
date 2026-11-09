import { useState, type FormEvent } from "react";
import { useAuth } from "../lib/auth";
import { sb } from "../lib/supabase";
import "./signin.css";

// Same sign-in card as the current back office: account number, email, password, forgot password
export function SignIn() {
  const { signIn, error: accessError, session, signOut } = useAuth();
  const [acct, setAcct] = useState(() => { try { return localStorage.getItem("slick_acct")?.replace(/"/g, "") ?? ""; } catch { return ""; } });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok?: boolean } | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const err = await signIn(acct, email, password);
    setBusy(false);
    if (err) setMsg({ text: err });
  };
  const forgot = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email.trim()) { setMsg({ text: "Type your email first, then tap Forgot password." }); return; }
    const { error } = await sb.auth.resetPasswordForEmail(email.trim(), { redirectTo: location.href.split("#")[0] });
    setMsg(error ? { text: error.message } : { text: "Check your email for a link to set a new password.", ok: true });
  };

  return (
    <div className="wk-gate">
      <form className="wk-card" autoComplete="on" onSubmit={submit}>
        <div className="wk-logo">S</div>
        <h1>Slick</h1>
        <p>Sign in to the back office</p>
        {session && accessError ? (
          <>
            <div className="wk-err">{accessError}</div>
            <button type="button" onClick={signOut}>Use another account</button>
          </>
        ) : (
          <>
            <label htmlFor="wkAcct">Account number</label>
            <input id="wkAcct" inputMode="numeric" autoComplete="organization" required value={acct} onChange={(e) => setAcct(e.target.value)} />
            <label htmlFor="wkEmail">Email</label>
            <input id="wkEmail" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="wkPass">Password</label>
            <input id="wkPass" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button disabled={busy}>Sign in</button>
            <a href="#" className="wk-forgot" onClick={forgot}>Forgot password?</a>
            <div className="wk-err" style={msg?.ok ? { color: "#1f7a3d" } : undefined}>{msg?.text ?? ""}</div>
          </>
        )}
      </form>
    </div>
  );
}
