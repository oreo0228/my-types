"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Header() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const nextLocale = locale === "ja" ? "en" : "ja";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-gray-900">
          {t("siteName")}
        </Link>
        <button
          onClick={switchLocale}
          className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {t("switchLanguage")}
        </button>
      </div>
    </header>
  );
}
