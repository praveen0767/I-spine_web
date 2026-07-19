import { cache } from "react";
import { promises as fs } from "fs";
import path from "path";
import {
  BoothRecord,
  SummaryData,
  FreshnessData,
  QualityData,
  LocalityRecord,
  ActionsData
} from "./types";

const DATA_DIR = path.join(process.cwd(), "public", "data");

export const getSummaryData = cache(async (): Promise<SummaryData | null> => {
  try {
    const file = await fs.readFile(path.join(DATA_DIR, "summary.json"), "utf8");
    return JSON.parse(file);
  } catch (e) {
    return null;
  }
});

export const getFreshnessData = cache(async (): Promise<FreshnessData | null> => {
  try {
    const file = await fs.readFile(path.join(DATA_DIR, "freshness.json"), "utf8");
    return JSON.parse(file);
  } catch (e) {
    return null;
  }
});

export const getQualityData = cache(async (): Promise<QualityData | null> => {
  try {
    const file = await fs.readFile(path.join(DATA_DIR, "quality.json"), "utf8");
    return JSON.parse(file);
  } catch (e) {
    return null;
  }
});

export const getBoothsData = cache(async (): Promise<BoothRecord[]> => {
  try {
    const file = await fs.readFile(path.join(DATA_DIR, "final_dataset.json"), "utf8");
    return JSON.parse(file);
  } catch (e) {
    return [];
  }
});

export const getLocalitiesData = cache(async (): Promise<LocalityRecord[]> => {
  try {
    const file = await fs.readFile(path.join(DATA_DIR, "localities.json"), "utf8");
    return JSON.parse(file);
  } catch (e) {
    return [];
  }
});

export const getActionsData = cache(async (): Promise<ActionsData | null> => {
  try {
    const file = await fs.readFile(path.join(DATA_DIR, "actions.json"), "utf8");
    return JSON.parse(file);
  } catch (e) {
    return null;
  }
});

export const getComparisonData = cache(async (): Promise<any[]> => {
  try {
    const file = await fs.readFile(path.join(DATA_DIR, "comparisons.json"), "utf8");
    return JSON.parse(file);
  } catch (e) {
    return [];
  }
});

export const getSwingZonesData = cache(async (): Promise<BoothRecord[]> => {
  try {
    const file = await fs.readFile(path.join(DATA_DIR, "swing_zones.json"), "utf8");
    return JSON.parse(file);
  } catch (e) {
    return [];
  }
});
