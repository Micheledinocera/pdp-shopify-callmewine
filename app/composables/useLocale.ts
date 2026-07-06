import type {LocaleConfig, SupportedLanguages} from '~~/types/Locale';

export const useLocale = () => {
  const supportedLocales: Record<SupportedLanguages, LocaleConfig> = {
    it: {language: 'IT', country: 'IT', label: '🇮🇹 IT (EUR)'},
    en: {language: 'EN', country: 'GB', label: '🇬🇧 GB (GBP)'},
    es: {language: 'ES', country: 'ES', label: '🇪🇸 ES (EUR)'},
    fr: {language: 'FR', country: 'FR', label: '🇫🇷 FR (EUR)'},
  };

  const defaultLocale = supportedLocales.en;

  const currentLocale = useState<LocaleConfig>(
    'current-locale',
    () => defaultLocale,
  );
  const cookie = useCookie<string | undefined>('store-locale', {
    maxAge: 60 * 60 * 24 * 365,
  });

  const isValidLocale = (
    key: string | undefined | null,
  ): key is SupportedLanguages => {
    return !!key && key in supportedLocales;
  };

  const syncI18n = (langKey: SupportedLanguages) => {
    const {$i18n} = useNuxtApp();
    if ($i18n && typeof $i18n.setLocale === 'function') {
      $i18n.setLocale(langKey);
    }
  };

  if (isValidLocale(cookie.value)) {
    currentLocale.value = supportedLocales[cookie.value];
    syncI18n(cookie.value);
  } else if (import.meta.client) {
    const browserLang = navigator.language.split('-')[0];

    if (isValidLocale(browserLang)) {
      currentLocale.value = supportedLocales[browserLang];
      cookie.value = browserLang;
      syncI18n(browserLang);
    } else {
      syncI18n('en');
    }
  }

  const setLocale = (langKey: string) => {
    if (isValidLocale(langKey)) {
      currentLocale.value = supportedLocales[langKey];
      cookie.value = langKey;

      syncI18n(langKey);

      const {clearCart} = useCart();
      clearCart();

      reloadNuxtApp({
        persistState: false,
        ttl: 0,
      });
    }
  };

  return {
    currentLocale,
    supportedLocales,
    setLocale,
  };
};
