/**
 * Some code provided by StackOverflow
 * https://stackoverflow.com/a/36862446/3878338
 */

import { createContext, useEffect, useState } from "react";
import { defaultBreakpoints } from "~/app.config";
import { $uiBreakpoints } from "~/store";
import type { UiBreakpoints, ViewportState } from "~/types";

export const ViewportContext = createContext<UiBreakpoints | null>(null);

function getViewportState(definedBreakpoints: UiBreakpoints): ViewportState {
  const { innerWidth: width } = window;

  // Using default breakpoints ensures breakpoints are defined for every viewport size
  const breakpoints = Object.assign({}, defaultBreakpoints, definedBreakpoints);

  return {
    isXSmall: width < breakpoints.sm,
    isSmall: width >= breakpoints.sm && width < breakpoints.md,
    isMedium: width >= breakpoints.md && width < breakpoints.lg,
    isLarge: width >= breakpoints.lg && width < breakpoints.xl,
    isXLarge: width >= breakpoints.xl && width < breakpoints["2xl"],
    is2XLarge: width >= breakpoints["2xl"],
  };
}

export function useViewport() {
  const [breakpoints, setBreakpoints] = useState<UiBreakpoints>(
    $uiBreakpoints.get(),
  );

  $uiBreakpoints.listen((nextBreakpoints: UiBreakpoints) =>
    setBreakpoints(nextBreakpoints),
  );

  const [viewportState, setViewportState] = useState<ViewportState>(
    getViewportState(breakpoints),
  );

  useEffect(() => {
    function handleResize() {
      breakpoints && setViewportState(getViewportState(breakpoints));
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewportState;
}
