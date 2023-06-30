import "server-only";
import type { Locale } from "../i18n-config";

// We enumerate all languages here for better linting and typescript support
// We also get the default import for cleaner types
const languages = {
  en: () => import("../locale/en.json").then((module) => module.default),
  jp: () => import("../locale/jp.json").then((module) => module.default),
};

export const getLanguage = async (locale: Locale) => languages[locale]();
