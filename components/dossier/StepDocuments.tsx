"use client";

import { useRef, useState } from "react";
import { ArrowLeft, FileArrowUp, Trash } from "@phosphor-icons/react";
import CtaArrow from "@/components/ui/CtaArrow";
import StepProgress from "./StepProgress";
import { dossierDocumentsQuery } from "@/hooks/dossierSubmissions/dossierDocumentsQuery";
import { DossierSubmissionInput } from "@/hooks/dossierSubmissions/type";

interface StepDocumentsProps {
  data: Partial<DossierSubmissionInput>;
  onChange: (patch: Partial<DossierSubmissionInput>) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
  submitError?: string;
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

export default function StepDocuments({
  data,
  onChange,
  onSubmit,
  onBack,
  submitting,
  submitError,
}: StepDocumentsProps) {
  const [uploads, setUploads] = useState<UploadingFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
          onChange({ documents: [...(data.documents || []), doc.id] });
        })
        .catch(() => {
          setUploads((prev) => prev.map((u) => (u.localId === localId ? { ...u, status: "error" } : u)));
        });
    });
  };

  const removeFile = async (upload: UploadingFile) => {
    setUploads((prev) => prev.filter((u) => u.localId !== upload.localId));
    if (upload.mediaId) {
      onChange({ documents: (data.documents || []).filter((id) => id !== upload.mediaId) });
      dossierDocumentsQuery.delete(upload.mediaId).catch(() => {});
    }
  };

  const consentAccepted = Boolean(data.consentAccepted);

  return (
    <div className="flex flex-col gap-[43px] pb-24">
      <StepProgress step={3} title="Vos documents" />

      <div className="flex flex-col gap-6 max-w-[515px]">
        <label className="font-mono text-white text-xs tracking-[0.5px] uppercase">Telecharger vos documents</label>

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
          className={`border border-dashed h-[173px] flex items-center justify-center px-3 py-4 transition-colors ${
            dragging ? "border-white/60 bg-white/[0.04]" : "border-white/20"
          }`}
        >
          <div className="flex flex-col gap-8 items-center text-center">
            <div className="flex gap-3 items-center flex-wrap justify-center">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="font-bold text-sm text-white underline"
              >
                Choisir un fichier
              </button>
              <span className="text-white/60 text-base">Ou</span>
              <span className="text-white text-sm">Déposer votre(vos) fichier(s) ici</span>
            </div>
            <p className="text-white/60 text-base">Zip, PDF ou Word · 10 Mo maximum</p>
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
            <p className="font-bold text-xs text-white/64">Fichiers téléchargés</p>
            <div className="flex flex-col gap-3 w-full">
              {uploads.map((u) => (
                <div key={u.localId} className="flex items-start justify-between w-full gap-4">
                  <div className="flex gap-2 items-center min-w-0">
                    {u.status === "done" && <span className="size-3 rounded-full bg-[#00b445] shrink-0" />}
                    <FileArrowUp size={24} className="text-white shrink-0" />
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <p className="text-white text-xs truncate">{u.name}</p>
                      <div className="flex gap-4 text-xs">
                        {u.status === "done" ? (
                          <span className="text-[#00b445]">Téléchargé · {u.sizeLabel}</span>
                        ) : u.status === "error" ? (
                          <span className="text-[#cf2538]">Échec de l&apos;envoi</span>
                        ) : (
                          <span className="text-white/80">
                            En cours · {u.progress}% de {u.sizeLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeFile(u)} aria-label="Supprimer" className="shrink-0">
                    <Trash size={16} className="text-white/60 hover:text-white transition-colors" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consentAccepted}
            onChange={(e) => onChange({ consentAccepted: e.target.checked })}
            className="mt-1 size-2 accent-white"
          />
          <span className="text-white/64 text-xs leading-relaxed">
            J&apos;accepte que mes données soient traitées dans le cadre de l&apos;examen de mon dossier.{" "}
            <a href="/mentions-legales" className="underline hover:text-white">
              Politique de confidentialité
            </a>
          </span>
        </label>
      </div>

      {submitError && <p className="text-[#cf2538] text-sm">{submitError}</p>}

      <div className="flex items-start gap-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 border border-white/56 text-white/56 font-mono text-sm uppercase tracking-wide transition-colors hover:bg-white/10"
        >
          <ArrowLeft size={20} />
          <span>Retour</span>
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!consentAccepted || submitting}
          className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-[#f29308] text-black font-mono text-sm uppercase tracking-wide transition-colors hover:bg-[#f29308]/85 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>{submitting ? "Envoi..." : "Envoyer mon dossier"}</span>
          <CtaArrow size={20} />
        </button>
      </div>
    </div>
  );
}
