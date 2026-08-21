import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const [base, guidebook] = await Promise.all([
    import(`../../messages/${locale}.json`),
    import(`../../messages/guidebook/${locale}.json`),
  ]);

  return {
    locale,
    messages: {
      ...base.default,
      Guidebook: guidebook.default,
    },
  };
});

