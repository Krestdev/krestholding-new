import { useLocaleStore } from "@/store/localeStore";

export default function ContactHeader() {
  const { t } = useLocaleStore();

  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
        {t("contact.title")}
      </h1>
      <p className="text-slate-400 max-w-2xl mx-auto text-lg">{t("contact.subtitle")}</p>
    </div>
  );
}
