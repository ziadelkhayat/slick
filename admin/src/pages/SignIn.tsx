import { useState, type FormEvent } from "react";
import { useAuth } from "../lib/auth";

export function SignIn() {
  const { signIn, error: accessError, session, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null);
    const err = await signIn(email, password);
    setBusy(false);
    if (err) setError(err);
  };

  return (
    <div className="signin">
      <form className="card" onSubmit={submit}>
        <div className="brand big">
          <span className="logo" aria-hidden>S</span>
          <b>Slick</b>
        </div>
        <h2>Sign In to the Back Office</h2>
        {session && accessError ? (
          <>
            <p className="err">{accessError}</p>
            <button type="button" className="btn" onClick={signOut}>Use Another Account</button>
          </>
        ) : (
          <>
            <label>Email<input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus /></label>
            <label>Password<input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
            {error && <p className="err">{error}</p>}
            <button className="btn primary" disabled={busy}>{busy ? "Signing In…" : "Sign In"}</button>
          </>
        )}
      </form>
    </div>
  );
}
