import woods from "./woods.json";

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

// woods.json is an array of objects, so we cast it
export const WOODS = woods as Wood[];

// simple lookup helper
export function getWoodById(id: string): Wood | undefined {
  return WOODS.find((w) => w.id === id);
}
