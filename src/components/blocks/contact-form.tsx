"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { serverAction } from "@/actions/server-action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/i18n/navigation";
import { formSchema } from "@/lib/form-schema";

type Schema = z.infer<typeof formSchema>;

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lockedHeight, setLockedHeight] = useState<number | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const form = useForm<Schema, any, Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inquiryType: "business",
      name: "",
      email: "",
      company: "",
      employees: "",
      message: "",
      agree: false,
      website: "",
      startedAt: 0,
    },
  });
  useEffect(() => {
    form.setValue("startedAt", Date.now(), { shouldDirty: false });
  }, [form]);

  useLayoutEffect(() => {
    if (lockedHeight != null) return;
    const el = measureRef.current;
    if (!el) return;
    setLockedHeight(el.offsetHeight);
  }, [lockedHeight]);
  const formAction = useAction(serverAction, {
    onSuccess: ({ data }) => {
      if (!data?.success) {
        setSubmitError(data?.message ?? t("errors.unavailable"));
        return;
      }
      setSubmitError(null);
      form.reset({
        inquiryType: "business",
        name: "",
        email: "",
        company: "",
        employees: "",
        message: "",
        agree: false,
        website: "",
        startedAt: 0,
      });
    },
    onError: () => {
      setSubmitError(t("errors.submit"));
    },
  });
  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    formAction.execute(data);
  });

  const { isExecuting, hasSucceeded } = formAction;

  return (
    <div
      className="relative"
      style={
        hasSucceeded && lockedHeight ? { height: `${lockedHeight}px` } : {}
      }
    >
      <div
        ref={measureRef}
        className={hasSucceeded ? "pointer-events-none invisible" : ""}
      >
        <div className="mb-6">
          <h2 className="text-foreground text-xl font-semibold">
            {t("title")}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {t("description")}
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-2 space-y-4 rounded-md"
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              {...form.register("website")}
            />
            <input
              type="hidden"
              {...form.register("startedAt", { valueAsNumber: true })}
            />
            <FormField
              control={form.control}
              name="inquiryType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("fields.inquiryType.label")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={t("fields.inquiryType.placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="registration">
                        {t("fields.inquiryType.options.registration")}
                      </SelectItem>
                      <SelectItem value="business">
                        {t("fields.inquiryType.options.business")}
                      </SelectItem>
                      <SelectItem value="careers">
                        {t("fields.inquiryType.options.careers")}
                      </SelectItem>
                      <SelectItem value="other">
                        {t("fields.inquiryType.options.other")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("fields.name.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      value={field.value}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val);
                      }}
                      placeholder={t("fields.name.placeholder")}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("fields.email.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      value={field.value}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val);
                      }}
                      placeholder={t("fields.email.placeholder")}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              rules={{ required: false }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("fields.company.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      value={field.value}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val);
                      }}
                      placeholder={t("fields.company.placeholder")}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              rules={{ required: false }}
              name="employees"
              render={({ field }) => {
                const options = [
                  { value: "1", label: "1" },
                  { value: "2-10", label: "2-10" },
                  { value: "11-50", label: "11-50" },
                  { value: "51-500", label: "51-500" },
                ];
                return (
                  <FormItem className="w-full">
                    <FormLabel>{t("fields.employees.label")}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={t("fields.employees.placeholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options.map(({ label, value }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="message"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.message.label")}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t("fields.message.placeholder")}
                      className="resize-none"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              rules={{ required: true }}
              name="agree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-1">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      required
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {t("terms.prefix")}{" "}
                      <Link
                        href="/privacy"
                        className="underline underline-offset-4"
                      >
                        {t("terms.link")}
                      </Link>
                    </FormLabel>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex w-full items-center justify-end pt-3">
              <Button className="rounded-lg" size="sm" disabled={isExecuting}>
                {isExecuting ? t("submitting") : t("submit")}
              </Button>
            </div>
            {submitError ? (
              <p className="text-sm text-red-600" role="alert">
                {submitError}
              </p>
            ) : null}
          </form>
        </Form>

        <p className="text-muted-foreground mt-4 text-xs">
          {t("privacy.prefix")}{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            {t("privacy.link")}
          </Link>
          .
        </p>
      </div>

      {hasSucceeded ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, stiffness: 300, damping: 25 }}
          className="absolute inset-0 flex items-center justify-center text-center"
          role="status"
          aria-live="polite"
        >
          <div className="px-3 py-6">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.15,
                type: "spring",
                stiffness: 500,
                damping: 15,
              }}
              className="mx-auto mb-4 flex w-fit justify-center rounded-full bg-emerald-500/10 p-3 text-emerald-600"
            >
              <Check className="size-8" aria-hidden />
            </motion.div>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight">
              {t("success.title")}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
              {t("success.description")}
            </p>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
