import { useLocaleStore } from "@/store/localeStore";

interface MapSectionProps {
  mapIframeUrl: string;
}

export default function MapSection({ mapIframeUrl }: MapSectionProps) {
  const { t } = useLocaleStore();

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">{t("contact.locationTitle")}</h2>
      <div className="w-full h-96 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900">
        <iframe
          src={mapIframeUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
        />
      </div>
    </section>
  );
}
