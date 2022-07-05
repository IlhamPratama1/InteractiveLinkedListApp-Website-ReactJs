import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const child = document.getElementById('dashboard-child');
    if (child) child.scrollTo(0, 0);
  }, [pathname]);

  return null;
}