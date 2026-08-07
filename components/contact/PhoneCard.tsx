import { ContactPhone } from "@/hooks/contact/type";
import { useLocaleStore } from "@/store/localeStore";

interface PhoneCardProps {
  phones: ContactPhone[];
}

export default function PhoneCard({ phones }: PhoneCardProps) {
  const { t } = useLocaleStore();

  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
        &#9742;
      </div>
      <h3 className="text-xl font-bold text-white">{t("contact.phonesTitle")}</h3>
      {phones.length > 0 ? (
        <ul className="space-y-2 text-sm text-slate-300">
          {phones.map((p, idx) => (
            <li key={p.id || idx}>
              <a href={`tel:${p.phone}`} className="hover:text-emerald-400 transition-colors">
                {p.phone}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-400">+229 00 00 00 00</p>
      )}
    </div>
  );
}
