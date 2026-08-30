import { ReactNode } from "react";

export interface InfoGridRow {
  label: string;
  value: ReactNode;
  placeholder?: boolean;
  tall?: boolean;
}

interface InfoGridProps {
  leftRows: InfoGridRow[];
  rightRows: InfoGridRow[];
}

export default function InfoGrid({ leftRows, rightRows }: InfoGridProps) {
  const columns = [leftRows, rightRows];

  return (
    <div className="border border-[rgba(0,0,0,0.24)] dark:border-white/24 bg-[rgba(0,0,0,0.02)] dark:bg-white/[0.02] flex items-start w-full">
      {columns.map((rows, colIdx) => (
        <div
          key={colIdx}
          className={`flex-1 min-w-0 flex flex-col items-start ${colIdx === 1 ? "border-l border-[rgba(0,0,0,0.32)] dark:border-white/32" : ""}`}
        >
          {rows.map((row, rowIdx) => {
            const shaded = (rowIdx + colIdx) % 2 === 0;
            return (
              <div
                key={row.label}
                className={`flex items-center gap-4 p-6 w-full ${shaded ? "bg-[rgba(0,0,0,0.1)] dark:bg-white/10" : ""} ${row.tall ? "min-h-[72px]" : ""}`}
              >
                <span className="flex-1 text-base text-[rgba(1,1,1,0.64)] dark:text-white/64">{row.label}</span>
                <span
                  className={`flex-1 text-base text-right ${
                    row.placeholder
                      ? "italic text-[rgba(1,1,1,0.48)] dark:text-white/48"
                      : "text-[#010101] dark:text-white"
                  }`}
                >
                  {row.value}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
