/**
 * Adapted for React 19 from the Altcha example React app
 * https://github.com/altcha-org/altcha-starter-react-ts/blob/main/src/Altcha.tsx
 */

import { useEffect, useRef } from "react";
import "altcha/themes/business.css";

// Importing altcha package will introduce a new element <altcha-widget>
import "altcha";
import type {
  Configuration,
  CSSVariables,
  WidgetAttributes,
  WidgetMethods,
} from "altcha/types";
import type {} from "altcha/types/react";
import { useStore } from "@nanostores/react";
import { userTheme } from "~/store";

const altchaConfig = JSON.stringify({
  test: !!import.meta.env.ALTCHA_TEST,
} as Configuration);

const widgetDarkTheme = {
  "--altcha-border-radius": "6px",
  "--altcha-border-width": "0",
  "--altcha-checkbox-border-width": "1.5px",
  "--altcha-color-base": "var(--color-slate-700)",
  "--altcha-color-base-content": "var(--color-foreground)",
  "--altcha-spinner-color": "var(--color-foreground)",
} as Partial<CSSVariables>;

const widgetLightTheme = {
  "--altcha-border-radius": "6px",
  "--altcha-border-width": "0",
  "--altcha-checkbox-color": "var(--color-background)",
  "--altcha-checkbox-border-width": "1.5px",
  "--altcha-color-base": "var(--color-cyan-50)",
  "--altcha-color-base-content": "var(--color-foreground)",
  "--altcha-spinner-color": "var(--color-foreground)",
} as Partial<CSSVariables>;

function Altcha({
  onStateChange,
  setAltcha,
}: {
  onStateChange?: (ev: Event | CustomEvent) => void;
  setAltcha: (nextAltcha: string | null) => void;
}) {
  const widgetRef = useRef<WidgetAttributes & WidgetMethods & HTMLElement>(
    null,
  );
  const $userTheme = useStore(userTheme);

  useEffect(() => {
    const handleStateChange = (ev: Event | CustomEvent) => {
      if ("detail" in ev) {
        setAltcha(ev.detail.payload || null);
        onStateChange?.(ev);
      }
    };

    const { current } = widgetRef;

    if (current) {
      current.addEventListener("statechange", handleStateChange);
      return () =>
        current.removeEventListener("statechange", handleStateChange);
    }
  }, [onStateChange]);

  /* Configure your `challenge` and remove the `test` attribute, see docs: https://altcha.org/docs/v2/widget-integration/  */
  return (
    <altcha-widget
      ref={widgetRef}
      challenge="/api/challenge"
      configuration={altchaConfig}
      display="standard"
      type="native"
      style={$userTheme === "dark" ? widgetDarkTheme : widgetLightTheme}
    ></altcha-widget>
  );
}

export default Altcha;
