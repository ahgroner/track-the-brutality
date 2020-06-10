import { Moment } from 'moment';
 
export interface CleanIncidentProps {
    categories: Categories[];
    moment_date: Moment;
}

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

export interface Incident extends APIIncidentProps, CleanIncidentProps{ }

export interface APIResponse {
    data: Incident[];
    updated_at: string;
}

export enum Categories {
    gas = 'Chemical attacks',
    shooting_rubber = 'Shooting (non-firearm)',
    shooting_gun = 'Shooting (firearm)',
    assault = 'Assaults',
    other = 'Other B.S.',
    arrest = 'Arrests'

}