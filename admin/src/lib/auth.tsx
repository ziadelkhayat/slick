import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { sb } from "./supabase";

export type Staff = { user_id: string; name: string | null; role: "owner" | "admin" | "agent" | "cashier"; company_id: string; branch_id: string | null };
export type Company = { id: string; name: string; account_no: string | null };

type AuthState = {
  loading: boolean;
  session: Session | null;
  staff: Staff | null;
  company: Company | null;
  error: string | null;
  signIn: (acct: string, email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [staff, setStaff] = useState<Staff | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [error, setError] = useState<string | null>(null);

  // who is signed in: their staff record (role + company). A user added under Manage → Users gets one on first sign-in.
  const loadStaff = useCallback(async (s: Session | null) => {
    setSession(s);
    setStaff(null); setCompany(null); setError(null);
    if (!s) { setLoading(false); return; }
    let { data } = await sb.from("staff").select("user_id,name,role,company_id,branch_id").eq("user_id", s.user.id).maybeSingle();
    if (!data) {
      const claimed = await sb.rpc("slick_claim_login");
      if (claimed.data) ({ data } = await sb.from("staff").select("user_id,name,role,company_id,branch_id").eq("user_id", s.user.id).maybeSingle());
    }
    if (!data || data.role === "cashier") {
      setError("This account doesn't have back-office access.");
      setLoading(false);
      return;
    }
    setStaff(data as Staff);
    const co = await sb.from("companies").select("id,name,account_no").eq("id", data.company_id).maybeSingle();
    setCompany((co.data as Company) ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    sb.auth.getSession().then(({ data }) => loadStaff(data.session));
    const { data: sub } = sb.auth.onAuthStateChange((event, s) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") loadStaff(s);
      else if (event === "TOKEN_REFRESHED") setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, [loadStaff]);

  // same check as the current back office: the business's account number (given by Slick) must match
  const signIn = async (acct: string, email: string, password: string) => {
    const wrong = "Wrong account number, email or password.";
    const a = acct.replace(/\s+/g, "");
    const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
    if (error) return error.message === "Invalid login credentials" ? wrong : error.message;
    try {
      const [{ data: s }, { data: c }] = await Promise.all([
        sb.from("settings").select("data").eq("id", "company").maybeSingle(),
        sb.from("companies").select("account_no").maybeSingle(),
      ]);
      const want = String(c?.account_no || s?.data?.accountNo || "").replace(/\s+/g, "");
      if (want && want !== a) { await sb.auth.signOut(); return wrong; }
    } catch { /* keep the old behaviour: no number set means no check */ }
    try { localStorage.setItem("slick_acct", JSON.stringify(a)); } catch { /* private mode */ }
    return null;
  };
  const signOut = async () => { await sb.auth.signOut(); };

  return <Ctx.Provider value={{ loading, session, staff, company, error, signIn, signOut }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth outside AuthProvider");
  return v;
}
