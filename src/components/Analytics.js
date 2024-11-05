"use client";
// components/Analytics.js

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const Analytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();

    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
};

export default Analytics;