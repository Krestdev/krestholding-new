interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{title}</h1>
      <p className="text-slate-400 max-w-2xl text-lg">{subtitle}</p>
    </>
  );
}
