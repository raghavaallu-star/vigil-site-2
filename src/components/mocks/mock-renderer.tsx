"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { MockKind, PlantArea } from "@/content/types";
import { energyMock, trendMock } from "@/content/mocks";
import { MockFrame } from "./mock-frame";
import {
  AlertListMock,
  ChecklistMock,
  HealthGaugeMock,
  HistorianMock,
  KpiTilesMock,
  MaturityMock,
  RootCauseMock,
  WorkOrderMock,
  FleetHealthMock,
  MillMock,
  ConveyorMock,
  TilesMock,
  AssetsMock,
} from "./static-mocks";

function ChartSkeleton({ title, height }: { title: string; height: string }) {
  return (
    <MockFrame title={title}>
      <div className={`${height} w-full animate-pulse rounded-lg bg-ink-950/[0.03]`} />
    </MockFrame>
  );
}

// Recharts is only loaded when a chart mock is actually rendered.
const TrendChartMock = dynamic(() => import("./chart-mocks").then((m) => m.TrendChartMock), {
  ssr: false,
  loading: () => <ChartSkeleton title={trendMock.title} height="h-60" />,
});
const EnergyBarsMock = dynamic(() => import("./chart-mocks").then((m) => m.EnergyBarsMock), {
  ssr: false,
  loading: () => <ChartSkeleton title={energyMock.title} height="h-72" />,
});

/** Renders the skeleton until the chart is near the viewport, then loads Recharts. */
function WhenNear({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref}>{near ? children : fallback}</div>;
}

export function MockRenderer({ kind, className, area }: { kind: MockKind; className?: string; area?: PlantArea }) {
  switch (kind) {
    case "trend":
      return (
        <WhenNear fallback={<ChartSkeleton title={trendMock.title} height="h-60" />}>
          <TrendChartMock className={className} />
        </WhenNear>
      );
    case "energy":
      return (
        <WhenNear fallback={<ChartSkeleton title={energyMock.title} height="h-72" />}>
          <EnergyBarsMock className={className} />
        </WhenNear>
      );
    case "gauge":
      return <HealthGaugeMock className={className} />;
    case "alerts":
      return <AlertListMock className={className} />;
    case "workorder":
      return <WorkOrderMock className={className} />;
    case "checklist":
      return <ChecklistMock className={className} />;
    case "kpis":
      return <KpiTilesMock className={className} />;
    case "historian":
      return <HistorianMock className={className} />;
    case "rootcause":
      return <RootCauseMock className={className} />;
    case "maturity":
      return <MaturityMock className={className} />;
    case "fleet":
      return <FleetHealthMock className={className} />;
    case "mill":
      return <MillMock className={className} />;
    case "conveyor":
      return <ConveyorMock className={className} />;
    case "dispatch":
      return <ConveyorMock className={className} variant="dispatch" />;
    case "batch":
    case "integrity":
    case "furnace":
    case "oee":
      return <TilesMock kind={kind} className={className} />;
    case "assets":
      return area ? <AssetsMock area={area} className={className} /> : null;
  }
}
