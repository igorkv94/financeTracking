import { useEffect, useState } from 'react';

import { debounce } from 'UTILS/debounce';

export function useLoadMore({ hasMore }) {
  const [needToFetch, setNeedToFetch] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const fullHeight = document.body.scrollHeight;
    const pageHeight = window.innerHeight;

    if (scrollTop > fullHeight - pageHeight * 1.5) {
      setNeedToFetch(true);
    }
  };

  const onScroll = debounce(handleScroll, 300);

  useEffect(() => {
    if (hasMore) {
      window.addEventListener('scroll', onScroll);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMore]);

  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { needToFetch, setNeedToFetch };
}
