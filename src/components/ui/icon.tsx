import {
  Boxes,
  ChartLine,
  Clock,
  Anvil,
  BatteryCharging,
  Bot,
  Car,
  Container,
  Droplets,
  Factory,
  Fuel,
  Hammer,
  PackageCheck,
  PaintRoller,
  Pill,
  Syringe,
  TestTube,
  Thermometer,
  Warehouse,
  Waves,
  Wind,
  Cog,
  FlaskConical,
  Mountain,
  PlugZap,
  Truck,
  Crosshair,
  Eye,
  Flame,
  Gauge,
  Layers,
  ShieldCheck,
  Smartphone,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { SVGProps } from "react";
import type { IconName } from "@/content/types";

type SvgProps = SVGProps<SVGSVGElement>;

/* Original line icons for cement equipment, drawn on a 24px grid at 1.6 stroke. */

function KilnIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9.5 19.5 6.5a2 2 0 0 1 2.3 1.6l.4 2.2a2 2 0 0 1-1.6 2.3L4.2 15.6" />
      <ellipse cx="3.6" cy="12.5" rx="1.3" ry="3" />
      <path d="M8 9v5.5M13 8v5.5M8 18.5h2M13 17.5h2M9 14.5v4M14 13.5v4" />
      <path d="M1.5 21h21" />
    </svg>
  );
}

function MillIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="6" width="15" height="9" rx="4.5" />
      <path d="M18 10.5h3M3 10.5H1.5" />
      <circle cx="8" cy="10.5" r="1" />
      <circle cx="12" cy="9.2" r="1" />
      <circle cx="11" cy="12" r="1" />
      <path d="M6 15v4M15 15v4M3.5 19h14" />
    </svg>
  );
}

function FanIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <circle cx="11" cy="11" r="1.6" />
      <path d="M11 9.4c0-2.6 1-4.4 3-4.4 1 0 1.6 1 .8 2.2L12.4 10M12.5 11.6c2.3 1.2 3.4 2.9 2.4 4.6-.5.9-1.7.9-2.3-.4L11.6 12.6M9.6 11.8c-2.2 1.4-4.2 1.4-5.2-.3-.5-.9.1-1.9 1.5-1.8l3.4.3" />
      <path d="M19 11h3.5M7 19l-1.5 3M15 19l1.5 3" />
    </svg>
  );
}

function CoolerIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 8h20v8H2z" />
      <path d="M4 13.5h16" strokeDasharray="1.5 1.5" />
      <path d="M6 16v3M12 16v3M18 16v3" />
      <path d="M6 5.5c0-1 1-1 1-2M11 5.5c0-1 1-1 1-2M16 5.5c0-1 1-1 1-2" />
      <path d="M5 11h3M10 11h3M15 11h3" />
    </svg>
  );
}

function CrusherIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 3h16l-4 8H8z" />
      <circle cx="9" cy="14.5" r="2.5" />
      <circle cx="15" cy="14.5" r="2.5" />
      <path d="M7 20.5h10M9.5 18.5l-.5 2M14.5 18.5l.5 2" />
      <path d="M10 6h1M13 6.5h1" />
    </svg>
  );
}

function HistorianIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="10" cy="5" rx="7" ry="2.5" />
      <path d="M3 5v12c0 1.4 3.1 2.5 7 2.5M17 5v5" />
      <path d="M3 11c0 1.4 3.1 2.5 7 2.5" />
      <path d="m13 19 2.5-3.5 2 2L21 13" />
    </svg>
  );
}

function SensorIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="11" width="6" height="10" rx="1.5" />
      <path d="M12 11V8" />
      <circle cx="12" cy="7" r="1" />
      <path d="M8.5 4.5a5 5 0 0 1 7 0M6 2a8.5 8.5 0 0 1 12 0" />
      <path d="M11 15h2" />
    </svg>
  );
}

function ConveyorIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 15 20 8" />
      <circle cx="3.5" cy="16.5" r="1.8" />
      <circle cx="20.5" cy="9.5" r="1.8" />
      <path d="M3.6 18.3 20.6 11.3" />
      <path d="M8 10.5l2-1 1 2-2 1zM13 8.5l2-1 1 2-2 1z" />
      <path d="M6 18v3M18 13v8M4 21h16" />
    </svg>
  );
}

function SiloIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3v11l-4 3H9l-4-3Z" />
      <path d="M5 6c0 1.7 3.1 3 7 3s7-1.3 7-3" />
      <path d="M9 20v2M15 20v2M5 12h14" />
    </svg>
  );
}

function CycloneIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 3h12v6l-4 6h-4L6 9Z" />
      <path d="M10 15v4h4v-4M12 19v2" />
      <path d="M18 5h3M3 7h3M9 6h6" />
    </svg>
  );
}

function PackerIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="5" />
      <path d="M12 3v2M17 8h-2M12 13v-2M7 8h2" />
      <path d="M8 16h8l1 5H7Z" />
      <path d="M10 18.5h4" />
    </svg>
  );
}

function CompressorIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="11" width="18" height="7" rx="3.5" />
      <path d="M7 11V7h5v4M9.5 7V4.5" />
      <circle cx="17" cy="6" r="2.5" />
      <path d="M17 8.5V11M6 18v3M18 18v3" />
    </svg>
  );
}

function MotorIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="7" width="13" height="10" rx="2" />
      <path d="M7 7v10M10 7v10M13 7v10" />
      <path d="M17 12h4M3 19h15M6 17v2M15 17v2M9 7V5h3v2" />
    </svg>
  );
}

function PumpIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="10" cy="13" r="5" />
      <path d="M10 8V4h8v3M2 13h3M15 13h2a3 3 0 0 0 3-3V7" />
      <path d="M8 13a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
      <path d="M6 18l-1 3h10l-1-3" />
    </svg>
  );
}

function FilterIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 3h16v10l-5 5H9l-5-5Z" />
      <path d="M8 3v9M12 3v9M16 3v9" />
      <path d="M10 18v3h4v-3" />
    </svg>
  );
}

const lucideMap: Partial<Record<IconName, LucideIcon>> = {
  gauge: Gauge,
  wrench: Wrench,
  shield: ShieldCheck,
  bolt: Zap,
  flame: Flame,
  chart: ChartLine,
  phone: Smartphone,
  users: Users,
  boxes: Boxes,
  target: Crosshair,
  eye: Eye,
  layers: Layers,
  clock: Clock,
  pill: Pill,
  fuel: Fuel,
  factory: Factory,
  car: Car,
  bot: Bot,
  droplets: Droplets,
  anvil: Anvil,
  thermometer: Thermometer,
  syringe: Syringe,
  package: PackageCheck,
  wind: Wind,
  hammer: Hammer,
  container: Container,
  paint: PaintRoller,
  battery: BatteryCharging,
  waves: Waves,
  warehouse: Warehouse,
  testtube: TestTube,
  quarry: Mountain,
  gearbox: Cog,
  truck: Truck,
  power: PlugZap,
  flask: FlaskConical,
};

const customMap: Partial<Record<IconName, (p: SvgProps) => React.JSX.Element>> = {
  kiln: KilnIcon,
  mill: MillIcon,
  fan: FanIcon,
  cooler: CoolerIcon,
  crusher: CrusherIcon,
  historian: HistorianIcon,
  sensor: SensorIcon,
  conveyor: ConveyorIcon,
  silo: SiloIcon,
  cyclone: CycloneIcon,
  packer: PackerIcon,
  compressor: CompressorIcon,
  motor: MotorIcon,
  pump: PumpIcon,
  filter: FilterIcon,
};

export function Icon({ name, className, ...rest }: { name: IconName; className?: string } & SvgProps) {
  const Custom = customMap[name];
  if (Custom) return <Custom aria-hidden="true" className={className} {...rest} />;
  const Lucide = lucideMap[name] ?? Eye;
  return <Lucide aria-hidden="true" className={className} strokeWidth={1.6} />;
}
