import { useEffect, useRef, useState } from 'react';

export function useResponsiveBreakpoints(breakpoints) {
  const firstQuery = Object.keys(breakpoints)[0];
  const [breakSize, setBreakSize] = useState(firstQuery);
  const breakpointsValues = useRef(Object.values(breakpoints).sort((a, b) => b - a));

  const findBreakPoint = (width) => {
    let breakValue = 0;
    breakpointsValues.current.some((item) => {
      if (width < item) {
        breakValue = item;
        return false;
      }
      return true;
    });

    return Object.entries(breakpoints).find(([_, value]) => value === breakValue)[0];
  };

  const observer = useRef(
    new ResizeObserver(() => {
      setBreakSize(findBreakPoint(window.innerWidth));
    }),
  );

  useEffect(() => {
    observer.current.observe(window.document.body);

    return () => {
      observer.current.unobserve(window.document.body);
    };
  }, [observer.current]);

  return breakSize;
}
