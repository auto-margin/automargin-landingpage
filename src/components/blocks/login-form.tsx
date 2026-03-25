"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { loginAction } from "@/actions/login-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/auth-schema";

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      website: "",
      startedAt: 0,
    },
  });
  useEffect(() => {
    form.setValue("startedAt", Date.now(), { shouldDirty: false });
  }, [form]);

  const action = useAction(loginAction, {
    onSuccess: ({ data }) => {
      if (!data?.success) {
        setSubmitError(data?.message ?? "Unable to log in right now.");
        return;
      }
      setSubmitError(null);
      form.reset();
    },
    onError: () => {
      setSubmitError("Unable to log in right now.");
    },
  });

  const handleSubmit = form.handleSubmit((data) => action.execute(data));

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...form.register("website")}
      />
      <input type="hidden" {...form.register("startedAt", { valueAsNumber: true })} />
      <Input
        type="email"
        placeholder="Enter your email"
        required
        {...form.register("email")}
      />
      <div>
        <Input
          type="password"
          placeholder="Enter your password"
          required
          {...form.register("password")}
        />
      </div>
      <Button type="submit" className="mt-2 w-full" disabled={action.isExecuting}>
        {action.isExecuting ? "Logging in..." : "Log in"}
      </Button>
      {submitError ? (
        <p className="text-sm text-red-600" role="alert">
          {submitError}
        </p>
      ) : null}
    </form>
  );
}
