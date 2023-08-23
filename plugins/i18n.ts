import { createI18n } from "vue-i18n";
import sv from "@/locales/sv";
import en from "@/locales/en";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "en",
    messages: {
      sv: sv(),
      en: en(),
    },
  });
  vueApp.use(i18n);

  return {
    provide: { i18n: i18n.global },
  };
});
