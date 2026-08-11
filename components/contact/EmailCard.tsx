import { ContactEmail } from "@/hooks/contact/type";
import { useLocaleStore } from "@/store/localeStore";

interface EmailCardProps {
  emails: ContactEmail[];
}

export default function EmailCard({ emails }: EmailCardProps) {
  const { t } = useLocaleStore();

  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
        @
      </div>
      <h3 className="text-xl font-bold text-white">{t("contact.emailsTitle")}</h3>
      {emails.length > 0 ? (
        <ul className="space-y-2 text-sm text-slate-300">
          {emails.map((e, idx) => (
            <li key={e.id || idx}>
              <a href={`mailto:${e.email}`} className="hover:text-indigo-400 transition-colors">
                {e.email}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-400">contact@krestholding.com</p>
      )}
    </div>
  );
}
