"use client";

import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FileArrowUp, Trash, Check } from "@phosphor-icons/react";
import KickerIcon from "@/components/ui/KickerIcon";
import CtaArrow from "@/components/ui/CtaArrow";
import { CarrieresPageContent } from "@/hooks/carrieres/type";
import { dossierDocumentsQuery } from "@/hooks/dossierSubmissions/dossierDocumentsQuery";
import { jobApplicationsQuery } from "@/hooks/jobApplications/jobApplicationsQuery";

interface SpontaneousApplicationPrefill {
  desiredRole?: string;
  targetEntityOrSector?: string;
  relatedJobOpeningId?: number;
}

interface SpontaneousApplicationSectionProps {
  pageData?: CarrieresPageContent | null;
  prefill?: SpontaneousApplicationPrefill;
}

interface UploadingFile {
  localId: string;
  name: string;
  sizeLabel: string;
  progress: number;
  status: "uploading" | "done" | "error";
  mediaId?: number;
}

const ACCEPTED_TYPES =
  ".zip,.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/zip";
const MAX_SIZE = 10 * 1024 * 1024;

function formatSize(bytes: number) {
  const mo = bytes / (1024 * 1024);
  return mo >= 1 ? `${mo.toFixed(1)} Mo` : `${Math.round(bytes / 1024)} Ko`;
}

const inputClass =
  "w-full h-[42px] px-3 bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-base text-black dark:text-white placeholder:text-black/32 dark:placeholder:text-white/32 focus:outline-none focus:border-black/32 dark:focus:border-white/32 transition-colors";
const labelClass = "font-mono text-black dark:text-white text-xs tracking-[0.5px] uppercase";

export default function SpontaneousApplicationSection({ pageData, prefill }: SpontaneousApplicationSectionProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [targetEntityOrSector, setTargetEntityOrSector] = useState(prefill?.targetEntityOrSector || "");
  const [desiredRole, setDesiredRole] = useState(prefill?.desiredRole || "");
  const [targetCity, setTargetCity] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [documentIds, setDocumentIds] = useState<number[]>([]);
  const [uploads, setUploads] = useState<UploadingFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: () =>
      jobApplicationsQuery.post({
        fullName,
        phone,
        email,
        targetEntityOrSector,
        relatedJobOpening: prefill?.relatedJobOpeningId,
        desiredRole,
        targetCity,
        documents: documentIds,
        consentAccepted,
      }),
  });

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    Array.from(fileList).forEach((file) => {
      if (file.size > MAX_SIZE) return;
      const localId = `${file.name}-${Date.now()}-${Math.random()}`;
      setUploads((prev) => [
        ...prev,
        { localId, name: file.name, sizeLabel: formatSize(file.size), progress: 0, status: "uploading" },
      ]);

      dossierDocumentsQuery
        .upload(file, (percent) => {
          setUploads((prev) => prev.map((u) => (u.localId === localId ? { ...u, progress: percent } : u)));
        })
        .then((doc) => {
          setUploads((prev) =>
            prev.map((u) => (u.localId === localId ? { ...u, status: "done", progress: 100, mediaId: doc.id } : u)),
          );
          setDocumentIds((prev) => [...prev, doc.id]);
        })
        .catch(() => {
          setUploads((prev) => prev.map((u) => (u.localId === localId ? { ...u, status: "error" } : u)));
        });
    });
  };

  const removeFile = (upload: UploadingFile) => {
    setUploads((prev) => prev.filter((u) => u.localId !== upload.localId));
    if (upload.mediaId) {
      setDocumentIds((prev) => prev.filter((id) => id !== upload.mediaId));
      dossierDocumentsQuery.delete(upload.mediaId).catch(() => {});
    }
  };

  const isComplete =
    fullName && phone && email && targetEntityOrSector && desiredRole && targetCity && consentAccepted;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;
    mutation.mutate();
  };

  if (mutation.isSuccess) {
    return (
      <section id="candidature-spontanee" className="bg-white dark:bg-[#0d0d0d] py-16 lg:py-[120px] px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-3 text-black dark:text-white">
            <Check size={24} className="text-[#f29308]" />
            <p className="font-sans text-2xl">Merci, votre candidature a bien été envoyée.</p>
          </div>
          <p className="text-black/64 dark:text-white/64 text-base">Notre équipe RH revient vers vous si un poste correspond à votre profil.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="candidature-spontanee" className="bg-white dark:bg-[#0d0d0d] py-16 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <div className="flex items-center gap-4">
            <KickerIcon className="text-black dark:text-white" />
            <span className="font-abel text-black dark:text-white text-xl uppercase tracking-tight">
              {pageData?.spontaneousKicker || "Candidature spontanée"}
            </span>
          </div>
        </div>

        <h3 className="font-sans text-black dark:text-white text-3xl sm:text-4xl leading-tight">
          {pageData?.spontaneousHeadingLine1 || "Aucune offre ne correspond ?"}
          <br />
          {pageData?.spontaneousHeadingLine2 || "Envoyez-nous votre candidature spontanée."}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 pt-8 border-t border-black/16 dark:border-white/16 max-w-[840px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <label className={labelClass}>Nom et prénom *</label>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nom et prénom"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className={labelClass}>Téléphone *</label>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Téléphone"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className={labelClass}>Courriel *</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Courriel"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className={labelClass}>Entité ou secteur visé *</label>
              <input
                required
                value={targetEntityOrSector}
                onChange={(e) => setTargetEntityOrSector(e.target.value)}
                placeholder="Entité ou secteur visé"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className={labelClass}>Métier recherché *</label>
              <input
                required
                value={desiredRole}
                onChange={(e) => setDesiredRole(e.target.value)}
                placeholder="Métier recherché"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className={labelClass}>Ville cible *</label>
              <input
                required
                value={targetCity}
                onChange={(e) => setTargetCity(e.target.value)}
                placeholder="Ville cible"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <label className={labelClass}>Télécharger vos documents</label>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                addFiles(e.dataTransfer.files);
              }}
              className={`border border-dashed h-[123px] flex items-center justify-center px-3 py-4 transition-colors ${
                dragging ? "border-black/60 dark:border-white/60 bg-black/[0.04] dark:bg-white/[0.04]" : "border-black/20 dark:border-white/20"
              }`}
            >
              <div className="flex flex-col gap-4 items-center text-center">
                <div className="flex gap-3 items-center flex-wrap justify-center">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="font-bold text-sm text-black dark:text-white underline"
                  >
                    Choisir un fichier
                  </button>
                  <span className="text-black/60 dark:text-white/60 text-base">Ou</span>
                  <span className="text-black dark:text-white text-sm">Déposer votre(vos) fichier(s) ici</span>
                </div>
                <p className="text-black/60 dark:text-white/60 text-base">Zip, PDF ou Word · 10 Mo maximum</p>
              </div>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept={ACCEPTED_TYPES}
                onChange={(e) => addFiles(e.target.files)}
                className="hidden"
              />
            </div>

            {uploads.length > 0 && (
              <div className="flex flex-col gap-6 w-full">
                <p className="font-bold text-xs text-black/64 dark:text-white/64">Fichiers téléchargés</p>
                <div className="flex flex-col gap-3 w-full">
                  {uploads.map((u) => (
                    <div key={u.localId} className="flex items-start justify-between w-full gap-4">
                      <div className="flex gap-2 items-center min-w-0">
                        {u.status === "done" && <span className="size-3 rounded-full bg-[#00b445] shrink-0" />}
                        <FileArrowUp size={24} className="text-black dark:text-white shrink-0" />
                        <div className="flex flex-col gap-1.5 min-w-0">
                          <p className="text-black dark:text-white text-xs truncate">{u.name}</p>
                          <div className="flex gap-4 text-xs">
                            {u.status === "done" ? (
                              <span className="text-[#00b445]">Téléchargé · {u.sizeLabel}</span>
                            ) : u.status === "error" ? (
                              <span className="text-[#cf2538]">Échec de l&apos;envoi</span>
                            ) : (
                              <span className="text-black/80 dark:text-white/80">
                                En cours · {u.progress}% de {u.sizeLabel}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button type="button" onClick={() => removeFile(u)} aria-label="Supprimer" className="shrink-0">
                        <Trash size={16} className="text-black/64 dark:text-white/64 hover:text-black dark:hover:text-white transition-colors" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <label className="flex items-start gap-3 max-w-[390px] cursor-pointer">
            <input
              required
              type="checkbox"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
              className="mt-1 size-2 accent-black dark:accent-white"
            />
            <span className="text-black/64 dark:text-white/64 text-xs leading-relaxed">
              J&apos;accepte que mes données soient traitées dans le cadre de l&apos;examen de mon dossier.{" "}
              <a href="/mentions-legales" className="underline hover:text-black dark:hover:text-white">
                Politique de confidentialité
              </a>
            </span>
          </label>

          {mutation.isError && <p className="text-[#cf2538] text-sm">Une erreur est survenue, veuillez réessayer.</p>}

          <button
            type="submit"
            disabled={!isComplete || mutation.isPending}
            className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-[#f29308] text-black font-mono text-sm uppercase tracking-wide transition-colors hover:bg-[#f29308]/85 disabled:opacity-40 disabled:cursor-not-allowed w-fit"
          >
            <span>{mutation.isPending ? "Envoi..." : "Envoyer ma candidature"}</span>
            <CtaArrow size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
