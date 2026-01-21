import woodsMO from "./woods_mo.json";
import woodsNA from "./woods_na.json";

export type Wood = {
  id: string;
  common_name: string;
  scientific_name: string;
  hardness_level: string;
  strength_level: string;
  stability: string;
  rot_resistance: string;
  indoor_outdoor: string;
  workability: string;
  recommended_uses: string;
  avoid_uses: string;
  safety_notes: string;
  beginner_summary: string;
  confidence_notes: string;
};

export const DATASET_MODE: "NA" | "MO" = "MO"; // <-- flip this if needed

const active = DATASET_MODE === "MO" ? woodsMO : woodsNA;

// Cast JSON array to Wood[]
export const WOODS = active as Wood[];

export function getWoodById(id: string): Wood | undefined {
  return WOODS.find((w) => w.id === id);
}
