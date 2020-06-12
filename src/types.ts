import { Moment } from "moment";

export interface APIIncidentProps {
  city: string;
  date: string;
  date_text: string;
  id: string;
  links: string[];
  name: string;
  state: string;
  categories: Categories[];
}

export interface DerivedIncidentProps {
  categories: Categories[];
  moment_date: Moment;
  cityState: string;
}

export interface Incident extends APIIncidentProps, DerivedIncidentProps {}

export interface APIResponse {
  data: Incident[];
  updated_at: string;
}

export enum Categories {
  gas = "Chemical attacks",
  shooting_rubber = "Shooting (non-firearm)",
  shooting_gun = "Shooting (firearm)",
  assault = "Assaults",
  other = "Other B.S.",
  arrest = "Arrests",
}
