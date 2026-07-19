"use client";

import dynamic from "next/dynamic";

export const ActionPieChart = dynamic(() => import("@/app/components/Charts").then(mod => mod.ActionPieChart), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center bg-muted/20 animate-pulse rounded-lg">Loading Analytics...</div>
});

export const LocalitiesBarChart = dynamic(() => import("@/app/components/Charts").then(mod => mod.LocalitiesBarChart), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center bg-muted/20 animate-pulse rounded-lg">Loading Locality Data...</div>
});
