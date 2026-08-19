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
  theme?: "light" | "dark";
}

export default function InfoGrid({ leftRows, rightRows, theme = "light" }: InfoGridProps) {
  const isDark = theme === "dark";
  const outerBorder = isDark ? "border-white/24" : "border-[rgba(0,0,0,0.24)]";
  const outerBg = isDark ? "bg-white/[0.02]" : "bg-[rgba(0,0,0,0.02)]";
  const shadedBg = isDark ? "bg-white/10" : "bg-[rgba(0,0,0,0.1)]";
  const labelColor = isDark ? "text-white/64" : "text-[rgba(1,1,1,0.64)]";
  const valueColor = isDark ? "text-white" : "text-[#010101]";
  const placeholderColor = isDark ? "text-white/48" : "text-[rgba(1,1,1,0.48)]";
  const dividerBorder = isDark ? "border-white/32" : "border-[rgba(0,0,0,0.32)]";

  const columns = [leftRows, rightRows];

  return (
    <div className={`border ${outerBorder} ${outerBg} flex items-start w-full`}>
      {columns.map((rows, colIdx) => (
        <div
          key={colIdx}
          className={`flex-1 min-w-0 flex flex-col items-start ${colIdx === 1 ? `border-l ${dividerBorder}` : ""}`}
        >
          {rows.map((row, rowIdx) => {
            const shaded = (rowIdx + colIdx) % 2 === 0;
            return (
              <div
                key={row.label}
                className={`flex items-center gap-4 p-6 w-full ${shaded ? shadedBg : ""} ${row.tall ? "min-h-[72px]" : ""}`}
              >
                <span className={`flex-1 text-base ${labelColor}`}>{row.label}</span>
                <span
                  className={`flex-1 text-base text-right ${row.placeholder ? `italic ${placeholderColor}` : valueColor}`}
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
