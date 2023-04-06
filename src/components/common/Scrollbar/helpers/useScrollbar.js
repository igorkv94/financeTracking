import { useCallback, useEffect, useRef, useState } from 'react';

export function useScrollbar({ updatedLength }) {
  const contentRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const scrollThumbRef = useRef(null);
  const observer = useRef(null);
  const [thumbHeight, setThumbHeight] = useState(20);

  function handleResize(ref, trackSize) {
    const { clientHeight, scrollHeight } = ref;
    setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
  }

  useEffect(() => {
    const { clientHeight: trackSize } = scrollTrackRef.current;
    handleResize(contentRef.current, trackSize);
  }, [updatedLength]);

  const handleTrackClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } = contentRef;
      if (trackCurrent && contentCurrent) {
        const { clientY } = e;
        const target = e.target;
        const rect = target.getBoundingClientRect();
        const trackTop = rect.top;
        const thumbOffset = -(thumbHeight / 2);
        const clickRatio = (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
        const scrollAmount = Math.floor(clickRatio * contentCurrent.scrollHeight);
        contentCurrent.scrollTo({
          top: scrollAmount,
          behavior: 'smooth',
        });
      }
    },
    [thumbHeight],
  );

  const handleThumbPosition = useCallback(() => {
    if (!contentRef.current || !scrollTrackRef.current || !scrollThumbRef.current) {
      return;
    }
    const { scrollTop: contentTop, scrollHeight: contentHeight } = contentRef.current;
    const { clientHeight: trackHeight } = scrollTrackRef.current;
    let newTop = (+contentTop / +contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbHeight);
    const thumb = scrollThumbRef.current;
    thumb.style.top = `${newTop}px`;
  }, []);

  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      const { clientHeight: trackSize } = scrollTrackRef.current;
      observer.current = new ResizeObserver(() => {
        handleResize(ref, trackSize);
      });
      observer.current.observe(ref);
      ref.addEventListener('scroll', handleThumbPosition);
      return () => {
        observer.current?.unobserve(ref);
        ref.removeEventListener('scroll', handleThumbPosition);
      };
    }
    return null;
  }, []);

  return { contentRef, scrollTrackRef, handleTrackClick, scrollThumbRef, thumbHeight };
}
