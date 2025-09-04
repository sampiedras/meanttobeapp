import { ETypePublication } from "@/publications/enum/enumTypePublication";

export type FilterType = {
  type: ETypePublication;
  latitude?: string | number;
  longitude?: string | number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  zoom?: number;
};
