import React from "react";

export default function OverViewLayout({
  children,
  sales,
  pie_stats,
  bar_stats,
  area_stats,
}: {
  children: React.ReactNode;
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="mx-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">{bar_stats}</div>
        <div className="col-span-4 md:col-span-3">
          {/* sales arallel routes */}
          {sales}
        </div>
        <div className="col-span-4">{area_stats}</div>
        <div className="col-span-4 md:col-span-3">{pie_stats}</div>
      </div>
    </>
  );
}
