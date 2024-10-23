// components/Analytics.js
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const Analytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();

    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
};

export default Analytics;