import { ContactInfo } from "@/hooks/contact/type";
import { useLocaleStore } from "@/store/localeStore";

interface AddressCardProps {
  contactData?: ContactInfo | null;
}

export default function AddressCard({ contactData }: AddressCardProps) {
  const { t } = useLocaleStore();

  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
        &#128205;
      </div>
      <h3 className="text-xl font-bold text-white">{t("contact.addressTitle")}</h3>
      <div className="text-sm text-slate-300 space-y-1">
        <p>{contactData?.physicalAddress || "Siège Social, Krest Holding"}</p>
        {contactData?.postalBox && <p className="text-slate-400">BP: {contactData.postalBox}</p>}
      </div>
    </div>
  );
}
