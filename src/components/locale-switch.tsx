"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 text-caption">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={
            loc === locale
              ? "text-primary font-medium px-1.5"
              : "text-muted-foreground hover:text-foreground px-1.5"
          }
          aria-current={loc === locale}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
