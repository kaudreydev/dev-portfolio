import { persistentAtom } from "@nanostores/persistent";
import { map } from "nanostores";
import type { UiBreakpoints, ViewportState } from "~/types";

export const userTheme = persistentAtom("theme");

export const $uiBreakpoints = map<UiBreakpoints>();
export const $viewportState = map<ViewportState>();
