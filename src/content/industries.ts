import { plantAreas } from "./equipment";
import type { Industry, PlantArea } from "./types";

/**
 * Industries Vigil serves. Each becomes /industries/[slug] with its process
 * areas at /industries/[slug]/[area]. Cement reuses the detailed plant areas
 * in equipment.ts; the other industries define theirs here.
 */

type AreaInput = Omit<PlantArea, "step" | "mock" | "seo"> & { seo?: PlantArea["seo"] };

/** Numbers areas in order and fills defaults so each industry reads like a process flow. */
function flow(industry: string, areas: AreaInput[]): PlantArea[] {
  return areas.map((a, i) => ({
    ...a,
    step: i + 1,
    mock: "assets",
    seo: a.seo ?? {
      title: `${a.name}: ${industry} Equipment Monitoring`,
      description: `${a.summary.split(". ")[0]}. Predictive monitoring and optimization for ${industry.toLowerCase()} ${a.name.toLowerCase()} with Vigil.AI.`,
    },
  }));
}

const pharmaAreas = flow("Pharma", [
  {
    slug: "api-synthesis",
    name: "API Synthesis & Reactors",
    short: "API & reactors",
    icon: "testtube",
    tagline: "Keep critical reactions on profile, batch after batch.",
    summary:
      "Reactors, agitators, heat exchangers, centrifuges and dryers that produce active pharmaceutical ingredients, where a drifting temperature loop or a failing seal can cost a whole batch.",
    assets: [
      { name: "Glass-lined and stainless reactors", watch: ["Jacket temperature profile", "Agitator torque", "Pressure and vacuum"] },
      { name: "Agitators and mechanical seals", watch: ["Motor current", "Vibration", "Seal pot level and temperature"] },
      { name: "Heat exchangers and chillers", watch: ["Approach temperature", "Fouling trend", "Flow"] },
      { name: "Centrifuges and filter dryers", watch: ["Vibration and imbalance", "Cycle time", "Bearing temperature"] },
    ],
    failureModes: ["Temperature-control drift", "Mechanical seal failure", "Heat-exchanger fouling", "Centrifuge imbalance"],
    signals: [
      "Critical process parameters by batch phase",
      "Agitator power and vibration",
      "Utility supply temperatures",
      "Cycle and phase durations",
    ],
    kpis: ["Batches right first time", "Batch cycle time", "Unplanned reactor downtime", "Deviation count"],
    agents: ["batch-quality", "rotating-equipment", "root-cause"],
    modules: ["historian", "predictive-failure-ai", "reliability-excellence"],
  },
  {
    slug: "oral-solid-dosage",
    name: "Oral Solid Dosage",
    short: "Oral solids",
    icon: "pill",
    tagline: "Steady granulation, compression and coating.",
    summary:
      "Granulators, fluid-bed dryers, tablet presses, coaters and capsule fillers, where small shifts in equipment condition show up as weight variation, hardness drift and rejected batches.",
    assets: [
      { name: "High-shear granulators", watch: ["Impeller power curve", "Chopper current", "End-point consistency"] },
      { name: "Fluid-bed dryers", watch: ["Inlet and outlet air temperature", "Filter ΔP", "Moisture end point"] },
      { name: "Tablet presses", watch: ["Compression force variation", "Punch and turret vibration", "Ejection force"] },
      { name: "Coaters and capsule fillers", watch: ["Spray rate and pan speed", "Exhaust temperature", "Reject rate"] },
    ],
    failureModes: ["Punch and die wear", "Filter blinding", "Spray-gun blockage", "Drive and gearbox wear"],
    signals: [
      "Compression force and tablet weight",
      "Air handling temperatures and ΔP",
      "Drive current and vibration",
      "In-process check results",
    ],
    kpis: ["OEE by line", "Batch yield", "Reject rate", "Changeover time"],
    agents: ["batch-quality", "rotating-equipment", "maintenance-planner"],
    modules: ["predictive-failure-ai", "engineer-app", "governance"],
  },
  {
    slug: "sterile-fill-finish",
    name: "Sterile & Fill-Finish",
    short: "Fill-finish",
    icon: "syringe",
    tagline: "Protect aseptic runs and lyophilization cycles.",
    summary:
      "Filling lines, isolators, lyophilizers and autoclaves, high-value equipment where an interruption mid-run can mean lost product and lengthy investigations.",
    assets: [
      { name: "Vial and syringe filling lines", watch: ["Fill-weight trend", "Stoppering faults", "Line micro-stops"] },
      { name: "Isolators and RABS", watch: ["Pressure cascade", "Glove integrity tests", "Air change rates"] },
      { name: "Lyophilizers", watch: ["Shelf temperature uniformity", "Condenser temperature", "Vacuum pump health"] },
      { name: "Autoclaves and washers", watch: ["Cycle profile vs validated", "Steam quality", "Door seal condition"] },
    ],
    failureModes: ["Vacuum pump degradation", "Refrigeration compressor failure", "Pressure-cascade excursions", "Filling-pump wear"],
    signals: ["Cycle profiles", "Room and isolator pressures", "Compressor and pump vibration", "Alarm and event history"],
    kpis: ["Cycle success rate", "Unplanned interruptions", "Investigation count", "Line availability"],
    agents: ["batch-quality", "rotating-equipment", "root-cause"],
    modules: ["predictive-failure-ai", "historian", "reliability-excellence"],
  },
  {
    slug: "pharma-packaging",
    name: "Packaging & Serialization",
    short: "Packaging",
    icon: "package",
    tagline: "Fewer micro-stops on high-speed lines.",
    summary:
      "Blister machines, cartoners, serialization and vision systems and case packers, where micro-stops and jams quietly erode line efficiency.",
    assets: [
      { name: "Blister and bottle lines", watch: ["Forming and sealing temperature", "Speed vs rated", "Jam frequency"] },
      { name: "Cartoners", watch: ["Feed faults", "Glue system", "Drive condition"] },
      { name: "Serialization and vision", watch: ["Read rate", "Reject reasons", "Camera availability"] },
      { name: "Case packers and palletizers", watch: ["Cycle time", "Fault codes", "Availability"] },
    ],
    failureModes: ["Sealing station drift", "Feeder jams", "Vision false rejects", "Drive belt wear"],
    signals: ["Machine states and stop reasons", "Speed and counts", "Reject classifications", "Station temperatures"],
    kpis: ["Packaging OEE", "Micro-stops per shift", "False reject rate", "Changeover time"],
    agents: ["line-throughput", "maintenance-planner", "root-cause"],
    modules: ["engineer-app", "maintenance-management", "governance"],
  },
  {
    slug: "clean-utilities",
    name: "Clean Utilities & HVAC",
    short: "Utilities",
    icon: "droplets",
    tagline: "Utilities that never put a batch at risk.",
    summary:
      "Cleanroom HVAC, purified water and WFI, clean steam, compressed air and chillers, shared systems whose excursions affect every product made in the facility.",
    assets: [
      { name: "Air handling units (cleanroom HVAC)", watch: ["Fan vibration", "Filter ΔP", "Room pressure and humidity"] },
      { name: "Purified water and WFI systems", watch: ["Conductivity and TOC", "Pump health", "Loop temperature"] },
      { name: "Clean steam generators", watch: ["Steam quality", "Blowdown", "Pressure stability"] },
      { name: "Compressed air and chillers", watch: ["Specific power", "Dew point", "Compressor vibration"] },
    ],
    failureModes: ["AHU fan bearing failure", "Filter loading", "Water-system pump failure", "Chiller compressor faults"],
    signals: ["Environmental monitoring trends", "Utility quality parameters", "Fan and pump vibration", "Energy use by system"],
    kpis: ["Environmental excursions", "Utility availability", "Energy per batch", "Unplanned utility downtime"],
    agents: ["energy-optimization", "rotating-equipment", "maintenance-planner"],
    modules: ["energy-optimization", "predictive-failure-ai", "historian"],
  },
]);

const oilGasAreas = flow("Oil & Gas", [
  {
    slug: "upstream-production",
    name: "Upstream Production",
    short: "Production",
    icon: "fuel",
    tagline: "Keep wells and separators producing.",
    summary:
      "Artificial lift, separators, gas lift and water handling, where pump failures and unstable separation directly cut production.",
    assets: [
      { name: "ESPs and rod pumps", watch: ["Motor current and temperature", "Intake pressure", "Vibration"] },
      { name: "Separators and treaters", watch: ["Level stability", "Pressure", "Carry-over indicators"] },
      { name: "Gas lift compressors", watch: ["Discharge temperature", "Vibration", "Valve condition"] },
      { name: "Water injection pumps", watch: ["Flow and pressure", "Seal condition", "Vibration"] },
    ],
    failureModes: ["ESP failure", "Gas locking", "Separator level upsets", "Compressor valve failure"],
    signals: ["Pump electrical signatures", "Wellhead and intake pressures", "Separator levels", "Compressor performance"],
    kpis: ["Production uptime", "Mean time between pump failures", "Deferred production", "Lifting cost per barrel"],
    agents: ["asset-integrity", "rotating-equipment", "maintenance-planner"],
    modules: ["predictive-failure-ai", "historian", "maintenance-management"],
  },
  {
    slug: "pipelines-compression",
    name: "Pipelines & Compression",
    short: "Pipelines",
    icon: "waves",
    tagline: "Reliable compression from field to terminal.",
    summary:
      "Compressor and pump stations, valves and pipeline systems, where an unplanned station trip ripples through the whole network.",
    assets: [
      { name: "Gas compressor stations", watch: ["Performance vs curve", "Vibration", "Lube oil condition"] },
      { name: "Liquid pump stations", watch: ["Efficiency", "Seal and bearing temperature", "Cavitation signatures"] },
      { name: "Gas turbines and drivers", watch: ["Exhaust temperature spread", "Fuel use", "Start reliability"] },
      { name: "Valves and pigging systems", watch: ["Stroke time", "Leak-by indicators", "Pigging intervals"] },
    ],
    failureModes: ["Compressor surge and trips", "Turbine hot-section degradation", "Pump seal failure", "Valve actuator faults"],
    signals: ["Station suction and discharge pressures", "Machine vibration and temperatures", "Turbine performance", "Flow balance"],
    kpis: ["Station availability", "Fuel gas per unit throughput", "Unplanned trips", "Maintenance cost per station"],
    agents: ["asset-integrity", "rotating-equipment", "energy-optimization"],
    modules: ["predictive-failure-ai", "energy-optimization", "reliability-excellence"],
  },
  {
    slug: "refining-units",
    name: "Refining Process Units",
    short: "Refining",
    icon: "flame",
    tagline: "Run units longer between turnarounds.",
    summary:
      "Fired heaters, distillation columns, heat-exchanger trains and conversion units, where fouling, coking and instability limit throughput and push up energy use.",
    assets: [
      { name: "Fired heaters and furnaces", watch: ["Tube skin temperatures", "Excess O₂", "Burner balance"] },
      { name: "Heat-exchanger trains", watch: ["Fouling resistance trend", "Approach temperatures", "Bypass use"] },
      { name: "Distillation columns", watch: ["Differential pressure", "Flooding indicators", "Product quality drift"] },
      {
        name: "Conversion units (FCC, hydrotreaters)",
        watch: ["Reactor temperatures", "Catalyst performance", "Recycle compressor health"],
      },
    ],
    failureModes: ["Exchanger fouling", "Heater tube overheating", "Column flooding", "Recycle compressor trips"],
    signals: ["Heater and column temperatures", "Exchanger duties", "Pressure drops", "Lab and analyzer results"],
    kpis: ["Unit run length", "Energy intensity", "Throughput vs design", "Unplanned slowdowns"],
    agents: ["energy-optimization", "asset-integrity", "root-cause"],
    modules: ["energy-optimization", "historian", "predictive-failure-ai"],
  },
  {
    slug: "rotating-equipment",
    name: "Critical Rotating Equipment",
    short: "Rotating",
    icon: "gearbox",
    tagline: "Early warning on the machines that stop units.",
    summary:
      "Centrifugal and reciprocating compressors, steam turbines, critical pumps and fans across the facility, the assets behind most unplanned shutdowns.",
    assets: [
      { name: "Centrifugal compressors", watch: ["Vibration and shaft position", "Seal gas", "Efficiency"] },
      { name: "Reciprocating compressors", watch: ["Valve temperatures", "Rod load", "Crosshead vibration"] },
      { name: "Steam turbines", watch: ["Vibration", "Steam rate", "Governor response"] },
      { name: "Critical process pumps", watch: ["Vibration", "Seal leakage", "Performance vs curve"] },
    ],
    failureModes: ["Bearing and seal failure", "Valve failure", "Imbalance and misalignment", "Lube oil degradation"],
    signals: ["Machine protection system data", "Process conditions", "Lube oil analysis", "Run hours and starts"],
    kpis: ["Critical equipment MTBF", "Unplanned shutdowns", "Maintenance cost", "Mean time to repair"],
    agents: ["rotating-equipment", "asset-integrity", "maintenance-planner"],
    modules: ["predictive-failure-ai", "reliability-excellence", "maintenance-management"],
  },
  {
    slug: "terminals-utilities",
    name: "Terminals, Storage & Utilities",
    short: "Terminals",
    icon: "container",
    tagline: "Safe, efficient storage and site utilities.",
    summary:
      "Tank farms, loading facilities, flare systems, boilers and cooling water that keep the site running and within its environmental limits.",
    assets: [
      { name: "Tank farms", watch: ["Level and temperature", "Mixer condition", "Roof drain status"] },
      { name: "Loading arms and meters", watch: ["Throughput", "Meter drift", "Pump health"] },
      { name: "Boilers and steam system", watch: ["Efficiency", "Steam trap losses", "Feedwater pumps"] },
      { name: "Cooling water and flare", watch: ["Cooling tower fan health", "Water chemistry", "Flare flow"] },
    ],
    failureModes: ["Pump and mixer failures", "Steam trap losses", "Cooling tower fan failure", "Meter drift"],
    signals: ["Tank and loading data", "Utility performance", "Fan and pump vibration", "Energy and emissions data"],
    kpis: ["Terminal throughput", "Utility energy intensity", "Flaring volume", "Utility availability"],
    agents: ["energy-optimization", "rotating-equipment", "maintenance-planner"],
    modules: ["energy-optimization", "governance", "engineer-app"],
  },
]);

const steelAreas = flow("Steel", [
  {
    slug: "ironmaking",
    name: "Ironmaking",
    short: "Ironmaking",
    icon: "flame",
    tagline: "Stable furnaces, longer campaigns.",
    summary:
      "Blast furnaces, hot blast stoves, sinter plants and coke ovens, where thermal stability and refractory health decide output and campaign life.",
    assets: [
      { name: "Blast furnace", watch: ["Stave and hearth temperatures", "Burden descent", "Top gas analysis"] },
      { name: "Hot blast stoves", watch: ["Dome temperature", "Cycle timing", "Valve condition"] },
      { name: "Sinter plant", watch: ["Strand speed", "Burn-through point", "Fan health"] },
      { name: "Coke ovens", watch: ["Heating flue temperatures", "Pushing force", "Door leakage"] },
    ],
    failureModes: ["Hearth and stave overheating", "Tuyere failures", "Stove valve faults", "Sinter fan failure"],
    signals: ["Furnace thermal profile", "Gas analysis", "Cooling water flows and temperatures", "Fan vibration and power"],
    kpis: ["Hot metal output", "Fuel rate", "Campaign life indicators", "Unplanned stoppages"],
    agents: ["furnace-health", "energy-optimization", "root-cause"],
    modules: ["predictive-failure-ai", "energy-optimization", "historian"],
  },
  {
    slug: "steelmaking",
    name: "Steelmaking",
    short: "Steelmaking",
    icon: "anvil",
    tagline: "Fewer delays at the converter and arc furnace.",
    summary:
      "Basic oxygen converters, electric arc furnaces and ladle furnaces, where power, oxygen and electrode use and equipment delays drive cost per tonne.",
    assets: [
      { name: "Electric arc furnace", watch: ["Electrode consumption", "Power-on time", "Panel cooling temperatures"] },
      { name: "Basic oxygen converter", watch: ["Lance condition", "Off-gas analysis", "Tilt drive health"] },
      { name: "Ladle furnaces", watch: ["Heating rate", "Refractory wear indicators", "Stirring gas"] },
      { name: "Fume extraction and dedusting", watch: ["Fan vibration", "Filter ΔP", "Damper control"] },
    ],
    failureModes: ["Water-cooled panel leaks", "Electrode breakage", "Tilt and drive failures", "ID fan failures"],
    signals: ["Furnace electrical data", "Cooling water temperatures", "Off-gas data", "Drive and fan condition"],
    kpis: ["Tap-to-tap time", "kWh per tonne (EAF)", "Electrode use per tonne", "Process delays"],
    agents: ["furnace-health", "energy-optimization", "rotating-equipment"],
    modules: ["energy-optimization", "predictive-failure-ai", "reliability-excellence"],
  },
  {
    slug: "continuous-casting",
    name: "Continuous Casting",
    short: "Casting",
    icon: "thermometer",
    tagline: "Avoid breakouts and segment failures.",
    summary:
      "Continuous casters with tundish, mold and strand segments, where mold behaviour and segment condition decide quality and the risk of a breakout.",
    assets: [
      { name: "Mold and oscillator", watch: ["Mold thermocouples", "Friction indicators", "Oscillation stroke"] },
      { name: "Strand segments and rolls", watch: ["Roll gap", "Bearing temperature", "Cooling water flows"] },
      { name: "Tundish and ladle turret", watch: ["Steel level", "Turret drive", "Slide gate operation"] },
      { name: "Secondary cooling system", watch: ["Spray nozzle flows", "Pump health", "Water quality"] },
    ],
    failureModes: ["Sticker breakouts", "Segment bearing failure", "Nozzle clogging", "Roll misalignment"],
    signals: ["Mold temperature patterns", "Casting speed", "Segment hydraulics", "Cooling flows and pressures"],
    kpis: ["Breakouts", "Caster availability", "Sequence length", "Slab quality defects"],
    agents: ["furnace-health", "root-cause", "maintenance-planner"],
    modules: ["predictive-failure-ai", "reliability-excellence", "historian"],
  },
  {
    slug: "rolling-mills",
    name: "Rolling Mills",
    short: "Rolling",
    icon: "mill",
    tagline: "Keep mill stands rolling and reheat furnaces efficient.",
    summary:
      "Reheat furnaces, roughing and finishing stands, coilers and cooling beds, where gearbox, bearing and furnace issues cause costly mill delays.",
    assets: [
      { name: "Reheat furnaces", watch: ["Zone temperatures", "Fuel per tonne", "Skid and refractory condition"] },
      { name: "Roughing and finishing stands", watch: ["Roll force", "Main drive torque", "Gearbox vibration"] },
      { name: "Coilers and downcoilers", watch: ["Mandrel drive", "Pinch roll wear", "Hydraulics"] },
      { name: "Roller tables and cooling beds", watch: ["Motor current", "Bearing temperature", "Roll condition"] },
    ],
    failureModes: ["Gearbox and spindle failure", "Work-roll bearing failure", "Reheat furnace inefficiency", "Hydraulic failures"],
    signals: ["Mill stand loads and torques", "Drive vibration and temperatures", "Furnace temperatures and fuel", "Hydraulic pressures"],
    kpis: ["Mill utilization", "Fuel per tonne (reheat)", "Mill delays", "Yield"],
    agents: ["rotating-equipment", "energy-optimization", "maintenance-planner"],
    modules: ["predictive-failure-ai", "energy-optimization", "maintenance-management"],
  },
  {
    slug: "steel-handling-utilities",
    name: "Material Handling & Utilities",
    short: "Handling & utilities",
    icon: "conveyor",
    tagline: "Cranes, conveyors and utilities that keep the shop moving.",
    summary:
      "Overhead cranes, raw material conveyors, oxygen plants, water treatment and power systems: shared assets whose failures stop multiple shops.",
    assets: [
      { name: "Overhead and ladle cranes", watch: ["Hoist motor current", "Brake condition", "Gearbox vibration"] },
      { name: "Raw material conveyors", watch: ["Belt speed and slip", "Pulley bearings", "Load profile"] },
      { name: "Oxygen and gas plants", watch: ["Compressor performance", "Purity", "Specific power"] },
      { name: "Water treatment and pumps", watch: ["Pump vibration", "Water quality", "Flow balance"] },
    ],
    failureModes: ["Crane brake and hoist failure", "Belt tears", "Compressor failure", "Pump failure"],
    signals: ["Crane drive data", "Conveyor status", "Utility performance", "Vibration and temperatures"],
    kpis: ["Crane availability", "Utility energy intensity", "Material flow stops", "Maintenance backlog"],
    agents: ["material-handling", "rotating-equipment", "energy-optimization"],
    modules: ["predictive-failure-ai", "engineer-app", "energy-optimization"],
  },
]);

const automotiveAreas = flow("Automotive", [
  {
    slug: "press-shop",
    name: "Press Shop",
    short: "Press shop",
    icon: "hammer",
    tagline: "Fewer press stops, longer die life.",
    summary: "Stamping presses, transfer systems and dies, where press faults and die wear cause line stops and scrap downstream.",
    assets: [
      { name: "Mechanical and servo presses", watch: ["Tonnage signature", "Clutch and brake", "Main drive vibration"] },
      { name: "Transfer and feeder systems", watch: ["Cycle consistency", "Fault codes", "Servo current"] },
      { name: "Dies and tooling", watch: ["Hit count", "Tonnage drift", "Quality feedback"] },
      { name: "Hydraulics and lubrication", watch: ["Pressure", "Oil temperature", "Leak indicators"] },
    ],
    failureModes: ["Clutch and brake wear", "Die cracking", "Transfer faults", "Hydraulic leaks"],
    signals: ["Press tonnage curves", "Machine states and stops", "Drive condition", "Hydraulic data"],
    kpis: ["Press OEE", "Strokes per hour", "Die change time", "Scrap rate"],
    agents: ["line-throughput", "rotating-equipment", "maintenance-planner"],
    modules: ["predictive-failure-ai", "maintenance-management", "engineer-app"],
  },
  {
    slug: "body-shop",
    name: "Body Shop",
    short: "Body shop",
    icon: "bot",
    tagline: "Healthy robots and welders at line speed.",
    summary: "Welding robots, fixtures, sealers and conveyors in body-in-white, where a single robot fault can stop the whole line.",
    assets: [
      { name: "Welding and handling robots", watch: ["Joint torque and temperature", "Cycle time drift", "Gearbox wear indicators"] },
      { name: "Spot and laser welders", watch: ["Weld current signature", "Tip wear", "Cooling water"] },
      { name: "Fixtures and clamps", watch: ["Clamp time", "Sensor faults", "Pneumatic pressure"] },
      { name: "Body conveyors and lifts", watch: ["Drive current", "Positioning faults", "Chain wear"] },
    ],
    failureModes: ["Robot reducer failure", "Weld tip degradation", "Clamp and sensor faults", "Conveyor drive failure"],
    signals: ["Robot controller data", "Weld parameters", "Station cycle times", "Pneumatic and drive data"],
    kpis: ["Line OEE", "Jobs per hour", "Robot-caused downtime", "Weld quality defects"],
    agents: ["line-throughput", "rotating-equipment", "root-cause"],
    modules: ["predictive-failure-ai", "reliability-excellence", "historian"],
  },
  {
    slug: "paint-shop",
    name: "Paint Shop",
    short: "Paint shop",
    icon: "paint",
    tagline: "Stable booths and ovens, lower energy per car.",
    summary:
      "Pretreatment, e-coat, paint booths, robots and curing ovens, the most energy-intensive part of a vehicle plant and a frequent source of quality issues.",
    assets: [
      { name: "Pretreatment and e-coat tanks", watch: ["Bath temperature and chemistry", "Pump health", "Rectifier condition"] },
      { name: "Paint booths and air supply", watch: ["Booth air balance", "Humidity and temperature", "Supply fan health"] },
      { name: "Paint robots and atomizers", watch: ["Bell speed", "Flow consistency", "Fault rate"] },
      { name: "Curing ovens", watch: ["Zone temperatures", "Burner health", "Exhaust fan vibration"] },
    ],
    failureModes: ["Supply-fan failure", "Oven burner faults", "Atomizer wear", "Circulation pump failure"],
    signals: ["Booth and oven environmental data", "Robot and atomizer data", "Fan and pump vibration", "Energy by system"],
    kpis: ["First-run paint quality", "Energy per vehicle", "Paint shop availability", "Rework rate"],
    agents: ["energy-optimization", "line-throughput", "rotating-equipment"],
    modules: ["energy-optimization", "predictive-failure-ai", "governance"],
  },
  {
    slug: "powertrain-machining",
    name: "Powertrain, Machining & EV Battery",
    short: "Powertrain",
    icon: "battery",
    tagline: "Precision machining and battery assembly without surprises.",
    summary:
      "CNC machining centres, transfer lines, test rigs and EV battery module and pack assembly, where spindle health and process stability drive throughput and quality.",
    assets: [
      { name: "CNC machining centres", watch: ["Spindle vibration and temperature", "Tool wear indicators", "Coolant condition"] },
      { name: "Transfer lines", watch: ["Station cycle times", "Fault frequency", "Drive condition"] },
      { name: "Test benches and end-of-line rigs", watch: ["Test pass rates", "Rig availability", "Calibration status"] },
      {
        name: "Battery module and pack assembly",
        watch: ["Dispensing and joining parameters", "Formation equipment health", "Station OEE"],
      },
    ],
    failureModes: ["Spindle bearing failure", "Tool breakage", "Coolant system faults", "Assembly station faults"],
    signals: ["CNC controller data", "Vibration and temperatures", "Process parameters", "Test and quality results"],
    kpis: ["Machining OEE", "Spindle MTBF", "First-pass yield", "Cost per part"],
    agents: ["line-throughput", "rotating-equipment", "root-cause"],
    modules: ["predictive-failure-ai", "historian", "reliability-excellence"],
  },
  {
    slug: "general-assembly",
    name: "General Assembly & Logistics",
    short: "Assembly",
    icon: "car",
    tagline: "Keep the final line and intralogistics flowing.",
    summary:
      "Assembly conveyors, AGVs, torque tools, fluid fill and end-of-line testing, where small stops add up to lost vehicles every shift.",
    assets: [
      { name: "Assembly conveyors and skillets", watch: ["Drive current", "Stop reasons", "Chain and roller wear"] },
      { name: "AGVs and tuggers", watch: ["Battery health", "Fault codes", "Route delays"] },
      { name: "Torque tools and fastening", watch: ["Torque-angle results", "Tool calibration", "Rework rate"] },
      { name: "End-of-line test and fluid fill", watch: ["Test cycle time", "Pass rate", "Equipment availability"] },
    ],
    failureModes: ["Conveyor drive failure", "AGV battery and drive faults", "Tool drift", "Test rig downtime"],
    signals: ["Line states and andon events", "Tool results", "Logistics system data", "Test results"],
    kpis: ["Jobs per hour", "Line stop minutes", "First-time quality", "Andon response time"],
    agents: ["line-throughput", "material-handling", "maintenance-planner"],
    modules: ["engineer-app", "governance", "maintenance-management"],
  },
]);

export const industries: Industry[] = [
  {
    slug: "cement",
    name: "Cement",
    short: "Cement",
    icon: "kiln",
    photo: "industry-cement",
    photoSecondary: "industry-cement-2",
    tagline: "Every asset from quarry to dispatch, watched.",
    summary:
      "Predictive reliability, energy and process optimization for integrated cement plants: crushers and conveyors, raw and cement mills, preheater, kiln and cooler, coal mill, packers, fans and utilities.",
    intro:
      "Cement plants run some of the most demanding equipment in heavy industry around the clock. Vigil covers the whole process chain with one data foundation and models built for kilns, mills and the rotating equipment around them.",
    challenges: [
      {
        title: "Unplanned kiln and mill stops",
        body: "A single stop on the pyro line or a mill vibration trip costs hours of clinker or cement production.",
      },
      {
        title: "Rising fuel and power cost",
        body: "Thermal and electrical energy are the largest controllable costs, with losses hidden in false air, unstable kilns and grinding.",
      },
      {
        title: "Repeat failures across hundreds of assets",
        body: "Crushers, conveyors, fans and gearboxes fail again and again without disciplined root cause analysis.",
      },
    ],
    areasHeading: "Twelve process areas, quarry to dispatch",
    areas: plantAreas,
    useCases: [
      {
        title: "Kiln and preheater early warning",
        body: "Hot spots, coating loss and cyclone blockages flagged before they force a stop.",
        agent: "kiln-health",
      },
      {
        title: "Mill stability and kWh/t",
        body: "Vibration-trip warnings and best-run operating windows for raw, coal and cement mills.",
        agent: "mill-performance",
      },
      {
        title: "Energy loss programs",
        body: "False air, grinding and utility losses found and tracked against target.",
        agent: "energy-optimization",
      },
      {
        title: "Material flow and dispatch uptime",
        body: "Crushers, conveyors, elevators and packers kept running.",
        agent: "material-handling",
      },
    ],
    kpis: ["Kiln run factor", "kcal/kg clinker", "kWh/t cement", "MTBF on critical assets", "Unplanned stops", "Dispatch rate"],
    considerations: [
      { title: "Works with your DCS", body: "Read-only connection to PLC, DCS and SCADA systems." },
      { title: "Targets validated per plant", body: "Energy target ranges are confirmed against each plant's measured baseline." },
    ],
    agents: [
      "kiln-health",
      "mill-performance",
      "material-handling",
      "energy-optimization",
      "rotating-equipment",
      "root-cause",
      "maintenance-planner",
    ],
    modules: [
      "historian",
      "predictive-failure-ai",
      "energy-optimization",
      "reliability-excellence",
      "maintenance-management",
      "governance",
      "engineer-app",
    ],
    extra: { label: "Cement savings estimate", href: "/roi", body: "Estimate fuel and power savings across our cement target ranges." },
    seo: {
      title: "AI for Cement Plants",
      description:
        "Predictive reliability, energy and process optimization for cement plants: kilns, mills, coolers, crushers, packers, fans and utilities.",
    },
  },
  {
    slug: "pharma",
    name: "Pharmaceuticals",
    short: "Pharma",
    icon: "pill",
    photo: "industry-pharma",
    photoSecondary: "industry-pharma-2",
    tagline: "Protect every batch with predictive reliability.",
    summary:
      "Early warnings and process insight for API synthesis, oral solid dosage, sterile fill-finish, packaging and clean utilities, without touching validated control systems.",
    intro:
      "In pharmaceutical manufacturing an equipment problem is rarely just downtime: it can mean a lost batch, a deviation and an investigation. Vigil watches equipment health and process consistency across the facility so teams act before quality is at risk.",
    challenges: [
      {
        title: "Batch losses and deviations",
        body: "Equipment drift during a critical phase can put a whole batch and its investigation workload at stake.",
      },
      { title: "High-value, high-mix lines", body: "Frequent changeovers and many products make normal behaviour hard to define by hand." },
      { title: "Utilities that touch every product", body: "HVAC, water and steam excursions affect everything made in the facility." },
    ],
    areasHeading: "Five process areas across the facility",
    areas: pharmaAreas,
    useCases: [
      {
        title: "Golden-batch comparison",
        body: "Each batch compared with your best runs, phase by phase, so drift stands out early.",
        agent: "batch-quality",
      },
      {
        title: "Critical equipment health",
        body: "Agitators, compressors, vacuum pumps and AHU fans monitored against their own baselines.",
        agent: "rotating-equipment",
      },
      { title: "Faster investigations", body: "Deviations linked to the equipment and utility signals around them.", agent: "root-cause" },
      { title: "Packaging line efficiency", body: "Micro-stops and false rejects tracked and prioritized.", agent: "line-throughput" },
    ],
    kpis: ["Batches right first time", "OEE by line", "Deviation count", "Unplanned downtime", "Utility excursions", "Energy per batch"],
    considerations: [
      {
        title: "Validated systems stay untouched",
        body: "Vigil reads data from control and historian systems; it does not change validated equipment or recipes.",
      },
      {
        title: "Your quality system stays in charge",
        body: "Insights support your existing deviation and change-control processes rather than replacing them.",
      },
    ],
    agents: ["batch-quality", "rotating-equipment", "root-cause", "line-throughput", "energy-optimization", "maintenance-planner"],
    modules: ["historian", "predictive-failure-ai", "reliability-excellence", "governance", "engineer-app", "energy-optimization"],
    seo: {
      title: "AI for Pharmaceutical Manufacturing",
      description:
        "Predictive reliability and batch consistency for pharmaceutical plants: API, oral solid dosage, fill-finish, packaging and clean utilities.",
    },
  },
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    short: "Oil & Gas",
    icon: "fuel",
    photo: "industry-oil-gas",
    photoSecondary: "industry-oil-gas-2",
    tagline: "Fewer trips, longer run lengths, lower energy intensity.",
    summary:
      "Predictive maintenance and energy optimization for upstream production, pipelines and compression, refining units, critical rotating equipment and terminals.",
    intro:
      "Oil and gas operations depend on a relatively small number of critical machines and units running for years between turnarounds. Vigil gives reliability and process teams early warning on those assets and visibility of the energy they use.",
    challenges: [
      { title: "Costly unplanned trips", body: "A compressor or pump trip can shut in production or slow a whole unit." },
      {
        title: "Fouling and energy intensity",
        body: "Exchanger fouling and heater inefficiency raise energy use and shorten run lengths.",
      },
      { title: "Integrity across ageing assets", body: "Many assets are operating well beyond their original design life." },
    ],
    areasHeading: "Five operating areas, wellhead to terminal",
    areas: oilGasAreas,
    useCases: [
      {
        title: "Compressor and pump early warning",
        body: "Machine-specific baselines catch bearing, seal and valve problems early.",
        agent: "asset-integrity",
      },
      {
        title: "Fouling and heater efficiency",
        body: "Exchanger fouling and heater performance tracked to plan cleaning and save energy.",
        agent: "energy-optimization",
      },
      {
        title: "Fleet-wide rotating equipment health",
        body: "Hundreds of pumps and fans ranked by health and criticality.",
        agent: "rotating-equipment",
      },
      { title: "Trip investigations", body: "Each trip linked to the signals and events that preceded it.", agent: "root-cause" },
    ],
    kpis: ["Unplanned trips", "Critical equipment MTBF", "Energy intensity", "Unit run length", "Deferred production", "Maintenance cost"],
    considerations: [
      {
        title: "Read-only by design",
        body: "Vigil reads from historians and control systems; safety and control functions stay where they are.",
      },
      { title: "Fits your integrity programs", body: "Insights feed existing reliability, inspection and maintenance processes." },
    ],
    agents: ["asset-integrity", "rotating-equipment", "energy-optimization", "root-cause", "maintenance-planner"],
    modules: [
      "historian",
      "predictive-failure-ai",
      "energy-optimization",
      "reliability-excellence",
      "maintenance-management",
      "governance",
    ],
    seo: {
      title: "AI for Oil & Gas Operations",
      description:
        "Predictive maintenance and energy optimization for oil and gas: production, pipelines and compression, refining units, rotating equipment and terminals.",
    },
  },
  {
    slug: "steel",
    name: "Steel",
    short: "Steel",
    icon: "anvil",
    photo: "industry-steel",
    photoSecondary: "industry-steel-2",
    tagline: "From furnace to coil, without the surprises.",
    summary:
      "Predictive reliability and energy optimization for ironmaking, steelmaking, continuous casting, rolling mills and the cranes and utilities that connect them.",
    intro:
      "Steel plants combine extreme heat, very large machines and tightly coupled shops. A delay at the caster or a mill gearbox failure ripples through the whole route. Vigil watches furnaces, casters, mills and the equipment between them.",
    challenges: [
      {
        title: "Tightly coupled shops",
        body: "A delay in one shop quickly stops the next: furnace, caster and mill all depend on each other.",
      },
      { title: "Energy-intensive processes", body: "Furnace, reheat and electric arc operations dominate energy cost per tonne." },
      { title: "Heavy, critical machinery", body: "Mill drives, cranes and casters are expensive to repair and slow to replace." },
    ],
    areasHeading: "Five shops along the steel route",
    areas: steelAreas,
    useCases: [
      {
        title: "Furnace and caster early warning",
        body: "Thermal patterns in furnaces and molds flagged before they become failures.",
        agent: "furnace-health",
      },
      {
        title: "Mill drive and gearbox health",
        body: "Stand drives, gearboxes and roll bearings monitored against their own baselines.",
        agent: "rotating-equipment",
      },
      {
        title: "Energy per tonne",
        body: "Reheat furnace, EAF and utility energy tracked against best runs.",
        agent: "energy-optimization",
      },
      { title: "Crane and conveyor uptime", body: "Material handling assets watched so shops stay supplied.", agent: "material-handling" },
    ],
    kpis: ["Mill and caster availability", "Energy per tonne", "Process delays", "Breakouts", "Yield", "Crane availability"],
    considerations: [
      {
        title: "Built for harsh environments",
        body: "Uses the signals you already collect, with an instrument audit before any model is trusted.",
      },
      { title: "Works across the route", body: "One data foundation links upstream causes to downstream delays." },
    ],
    agents: ["furnace-health", "rotating-equipment", "energy-optimization", "material-handling", "root-cause", "maintenance-planner"],
    modules: [
      "historian",
      "predictive-failure-ai",
      "energy-optimization",
      "reliability-excellence",
      "maintenance-management",
      "engineer-app",
    ],
    seo: {
      title: "AI for Steel Plants",
      description:
        "Predictive reliability and energy optimization for steel plants: blast furnace, EAF and BOF, continuous casting, rolling mills, cranes and utilities.",
    },
  },
  {
    slug: "automotive",
    name: "Automotive",
    short: "Automotive",
    icon: "car",
    photo: "industry-automotive",
    photoSecondary: "industry-automotive-2",
    tagline: "More jobs per hour, fewer line stops.",
    summary:
      "Predictive maintenance and throughput analytics for press, body, paint, powertrain and EV battery, and general assembly, built around line OEE.",
    intro:
      "Vehicle plants run at takt time, so a single robot, press or conveyor fault can stop hundreds of people. Vigil watches the equipment behind each station and turns stop data into clear priorities for maintenance and engineering.",
    challenges: [
      { title: "Line stops at takt time", body: "Minutes of downtime on one station mean lost vehicles across the line." },
      { title: "Thousands of assets", body: "Robots, tools, conveyors and machines generate more data than teams can review." },
      { title: "Energy-hungry paint shops", body: "Paint and curing are the largest energy users in a vehicle plant." },
    ],
    areasHeading: "Five shops from coil to finished vehicle",
    areas: automotiveAreas,
    useCases: [
      {
        title: "Line throughput and OEE",
        body: "Stop reasons, micro-stops and cycle-time drift ranked by their effect on output.",
        agent: "line-throughput",
      },
      {
        title: "Robot and spindle health",
        body: "Robot reducers, spindles and drives monitored before they fail.",
        agent: "rotating-equipment",
      },
      { title: "Paint shop energy", body: "Booth air, oven and utility energy tracked per vehicle.", agent: "energy-optimization" },
      { title: "Root cause on repeat stops", body: "Recurring faults linked to the conditions that cause them.", agent: "root-cause" },
    ],
    kpis: ["Line OEE", "Jobs per hour", "Line stop minutes", "First-time quality", "Energy per vehicle", "Equipment MTBF"],
    considerations: [
      { title: "Connects to plant floor data", body: "Reads from PLCs, robot controllers and MES without changing line programs." },
      { title: "Fits your production system", body: "Insights feed existing andon, TPM and continuous-improvement routines." },
    ],
    agents: ["line-throughput", "rotating-equipment", "energy-optimization", "root-cause", "material-handling", "maintenance-planner"],
    modules: ["historian", "predictive-failure-ai", "maintenance-management", "governance", "engineer-app", "energy-optimization"],
    seo: {
      title: "AI for Automotive Manufacturing",
      description:
        "Predictive maintenance and OEE analytics for automotive plants: press, body, paint, powertrain and EV battery, and general assembly.",
    },
  },
];

export const industriesPage = {
  eyebrow: "Industries",
  heading: "One platform, built for the plants that make the world run.",
  body: "Vigil brings predictive reliability, energy optimization and operating discipline to cement, pharmaceutical, oil and gas, steel and automotive plants, with models and process knowledge for each.",
  crossHeading: "Shared across every industry",
  crossBody:
    "Motors, gearboxes, pumps, compressors and fans appear in every plant. The same rotating-equipment models, data foundation and governance work across all of them.",
  seo: {
    title: "Industries",
    description:
      "Vigil.AI serves cement, pharmaceutical, oil and gas, steel and automotive manufacturing with predictive reliability and energy optimization.",
  },
};

export const industryPageLabels = {
  breadcrumb: "Industries",
  challengesEyebrow: "The challenge",
  challengesHeading: "What gets in the way",
  areasEyebrow: "Coverage",
  useCasesEyebrow: "Use cases",
  useCasesHeading: "Where Vigil makes a difference",
  kpisHeading: "KPIs we help move",
  considerationsHeading: "How it fits",
  agentsHeading: "Agents for this industry",
  modulesHeading: "Modules that apply",
  otherIndustries: "Other industries",
  exploreArea: "Explore",
  photoCredit: "Photo",
  areaBreadcrumb: (industry: string) => industry,
};

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

export function getIndustryArea(industrySlug: string, areaSlug: string) {
  const ind = getIndustry(industrySlug);
  const area = ind?.areas.find((a) => a.slug === areaSlug);
  return ind && area ? { industry: ind, area } : undefined;
}
