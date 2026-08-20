interface StepProgressProps {
  step: 1 | 2 | 3;
  title: string;
}

const TOTAL_STEPS = 3;

export default function StepProgress({ step, title }: StepProgressProps) {
  return (
    <div className="flex flex-col gap-8">
      <p className="font-mono text-white text-xs tracking-[0.5px] uppercase">
        Etape {step}/{TOTAL_STEPS}
      </p>
      <div className="flex flex-col gap-4">
        <h1 className="font-sans font-medium text-white text-4xl sm:text-[42px]">{title}</h1>
        <div className="flex gap-2.5 h-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, idx) => (
            <div key={idx} className={`h-full w-[100px] ${idx < step ? "bg-[#f29308]" : "bg-white/20"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
