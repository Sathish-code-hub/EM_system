import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const mainContentArea = document.querySelector("main");
    if (mainContentArea) {
      mainContentArea.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
