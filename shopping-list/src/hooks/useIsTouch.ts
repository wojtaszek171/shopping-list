import { useState, useEffect } from "react";

const useIsTouch = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const handleTouchStart = () => setIsTouchDevice(true);
    window.addEventListener("touchstart", handleTouchStart);
    return () => window.removeEventListener("touchstart", handleTouchStart);
  }, []);

  return isTouchDevice;
};

export default useIsTouch;
