import { PROCESS_STEPS } from "@/content/process";
import { SERVICES } from "@/content/services";
import type { ProcessStep, Service } from "@/content/types";

/**
 * The only way a page gets content.
 *
 * Nothing outside this file imports `services.ts` or `process.ts` directly.
 * They are typed arrays today and they will be a CMS query one day, and the
 * point of going through here is that the day it changes, this file changes and
 * nothing else does.
 *
 * The functions are synchronous now and will return promises later. Callers are
 * server components, so awaiting a value that is not yet a promise costs
 * nothing and saves rewriting every caller when it becomes one.
 */

export function getServices(): readonly Service[] {
  return SERVICES;
}

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getProcessSteps(): readonly ProcessStep[] {
  return PROCESS_STEPS;
}
