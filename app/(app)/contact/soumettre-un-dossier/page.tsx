"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import WizardChrome from "@/components/dossier/WizardChrome";
import WizardIntro from "@/components/dossier/WizardIntro";
import StepCompany from "@/components/dossier/StepCompany";
import StepProject from "@/components/dossier/StepProject";
import StepDocuments from "@/components/dossier/StepDocuments";
import WizardSuccess from "@/components/dossier/WizardSuccess";
import { dossierSubmissionsQuery } from "@/hooks/dossierSubmissions/dossierSubmissionsQuery";
import { DossierSubmissionInput } from "@/hooks/dossierSubmissions/type";

type Screen = "intro" | 1 | 2 | 3 | "success";

export default function SoumettreUnDossierPage() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [data, setData] = useState<Partial<DossierSubmissionInput>>({});
  const [reference, setReference] = useState<string>();

  const mutation = useMutation({
    mutationFn: () => dossierSubmissionsQuery.post(data as DossierSubmissionInput),
    onSuccess: (result) => {
      setReference(result.reference || undefined);
      setScreen("success");
    },
  });

  const patch = (update: Partial<DossierSubmissionInput>) => setData((prev) => ({ ...prev, ...update }));

  return (
    <div className="-mt-[81px]">
      <WizardChrome>
        {screen === "intro" && <WizardIntro onStart={() => setScreen(1)} />}

        {screen === 1 && (
          <StepCompany data={data} onChange={patch} onNext={() => setScreen(2)} onBack={() => setScreen("intro")} />
        )}

        {screen === 2 && (
          <StepProject data={data} onChange={patch} onNext={() => setScreen(3)} onBack={() => setScreen(1)} />
        )}

        {screen === 3 && (
          <StepDocuments
            data={data}
            onChange={patch}
            onSubmit={() => mutation.mutate()}
            onBack={() => setScreen(2)}
            submitting={mutation.isPending}
            submitError={mutation.isError ? "Une erreur est survenue, veuillez réessayer." : undefined}
          />
        )}

        {screen === "success" && <WizardSuccess reference={reference} />}
      </WizardChrome>
    </div>
  );
}
