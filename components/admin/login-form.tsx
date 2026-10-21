"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { login, type LoginState } from "@/app/login/actions";

const initialState: LoginState = {};

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(login, initialState);
  return <form action={action} className="mt-8 space-y-5"><input type="hidden" name="next" value={next || "/admin"} /><div><label className="form-label" htmlFor="username">Username</label><input className="field" id="username" name="username" autoComplete="username" required /></div><div><label className="form-label" htmlFor="password">Password</label><input className="field" id="password" name="password" type="password" autoComplete="current-password" required /></div>{state.error && <p role="alert" className="border-l-2 border-[#b64a45] bg-[#fff7f6] px-3 py-2 text-sm text-[#983c38]">{state.error}</p>}<button disabled={pending} className="button-primary w-full disabled:cursor-wait disabled:opacity-70">{pending ? "Signing in…" : <>Sign in <LogIn size={15} /></>}</button></form>;
}
