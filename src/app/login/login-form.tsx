"use client";

import { useActionState } from "react";

import {
  signIn,
  signUp,
  type AuthActionState,
} from "./actions";

const initialState: AuthActionState = {};

function inputClassName() {
  return "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50";
}

function buttonClassName(variant: "primary" | "secondary") {
  if (variant === "primary") {
    return "w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200";
  }

  return "w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800";
}

function AuthForm({
  action,
  submitLabel,
  pendingLabel,
}: {
  action: (
    prevState: AuthActionState,
    formData: FormData,
  ) => Promise<AuthActionState>;
  submitLabel: string;
  pendingLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClassName()}
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          className={inputClassName()}
        />
      </div>
      {state.error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {state.error}
        </p>
      ) : null}
      {state.message ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
          {state.message}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className={buttonClassName("primary")}>
        {pending ? pendingLabel : submitLabel}
      </button>
    </form>
  );
}

export function LoginForm() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
            Sign in
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Welcome back. Continue your quiet time.
          </p>
        </div>
        <AuthForm
          action={signIn}
          submitLabel="Sign in"
          pendingLabel="Signing in..."
        />
      </section>
      <div className="border-t border-zinc-200 dark:border-zinc-800" />
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
            Create account
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Start building a daily rhythm in Scripture and prayer.
          </p>
        </div>
        <AuthForm
          action={signUp}
          submitLabel="Create account"
          pendingLabel="Creating account..."
        />
      </section>
    </div>
  );
}
