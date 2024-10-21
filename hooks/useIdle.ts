import { throttle } from "@/utils/throttle";
import { useEffect, useState } from "react";

export function useIdle(ms = 1000 * 60) {
  const [idle, setIdle] = useState(false);
  let timeout: number | undefined = undefined;

  const handleTimeout = () => {
    setIdle(true);
  };

  const handleEvent = throttle(() => {
    setIdle(false);

    window.clearTimeout(timeout);
    timeout = window.setTimeout(handleTimeout, ms);
  }, 500);

  const handleVisibilityChange = () => {
    if (!document.hidden) {
      handleEvent();
    }
  };

  useEffect(() => {
    timeout = window.setTimeout(handleTimeout, ms);

    window.addEventListener("mousemove", handleEvent);
    window.addEventListener("mousedown", handleEvent);
    window.addEventListener("resize", handleEvent);
    window.addEventListener("keydown", handleEvent);
    window.addEventListener("touchstart", handleEvent);
    window.addEventListener("wheel", handleEvent);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("mousemove", handleEvent);
      window.removeEventListener("mousedown", handleEvent);
      window.removeEventListener("resize", handleEvent);
      window.removeEventListener("keydown", handleEvent);
      window.removeEventListener("touchstart", handleEvent);
      window.removeEventListener("wheel", handleEvent);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearTimeout(timeout);
    };
  }, [ms]);

  return idle;
}
