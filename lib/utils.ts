import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Location } from "@/types/location";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function apiUrl(path: string) {
  return `${process.env.BASE_URI}${path}`
}

export function getLocation(id: string, locations: Location[]): Location {
  return locations.find(l => l._id === id)!
}

