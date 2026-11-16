"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function getSnapshot() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") ??
          canvas.getContext("webgl") ??
          canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

const getServerSnapshot = () => true;

/** True when the browser can create a WebGL context. SSR-safe. */
export function useWebGLSupported(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
