"use client";

export default function TierCard({
  title,
  color,
  icon,
  children,
}) {
  return (
    <div
      className={`rounded-2xl border p-5 min-h-[420px] transition-all duration-300 hover:-translate-y-2 ${color}`}
    >
      <div className="text-center">

        <div className="text-5xl">
          {icon}
        </div>

        <h2 className="text-2xl font-black mt-3">
          {title}
        </h2>

      </div>

      <div className="mt-6">
        {children}
      </div>

    </div>
  );
}