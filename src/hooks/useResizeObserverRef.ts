import { useCallback, useEffect, useState } from "react";
import type { CallbackRef, HTMLElementOrNull } from "../utils/utils";
import { useFreshTick } from "./useFreshTick";

const config: ResizeObserverOptions = {
  box: "content-box",
};

/**
 *
 * useResizeObserverRef hook
 *
 * Returns a resize observer for a React Ref and fires a callback
 * https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
 *
 * @param {ResizeObserverCallback} callback Function that needs to be fired on resize
 * @param {ResizeObserverOptions} options An options object allowing you to set options for the observation
 */
function useResizeObserverRef(
  callback: ResizeObserverCallback,
  options: ResizeObserverOptions = config
): [CallbackRef] {
  const [node, setNode] = useState<HTMLElementOrNull>(null);
  const freshCallback = useFreshTick(callback);

  useEffect(() => {
    if (node) {
      // Create an observer instance linked to the callback function
      const observer = new ResizeObserver(callback);

      // Start observing the target node for resizes
      observer.observe(node, options);

      return () => {
        observer.disconnect();
      };
    }
  }, [node, freshCallback, options]);

  const ref: CallbackRef = useCallback((node: HTMLElementOrNull) => {
    setNode(node);
  }, []);

  return [ref];
}

export { useResizeObserverRef };
