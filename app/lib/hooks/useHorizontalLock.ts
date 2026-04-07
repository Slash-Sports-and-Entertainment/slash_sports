"use client";
import { useEffect, useRef, useState, RefObject } from "react";
import { HorizontalScrollReturn } from "@/app/types";

export function useHorizontalLock(): HorizontalScrollReturn {
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const scrollPosition = useRef(0);
  const lastScrollTime = useRef(0);
  const touchpadAccumulator = useRef(0);
  const canScroll = useRef(true); 
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0); 
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const trigger = triggerRef.current;
    const slider = slideContainerRef.current;
    if (!trigger || !slider) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          slider.scrollLeft = 0;
          scrollPosition.current = 0;
          progressRef.current = 0;
          setProgress(0);
          slider.classList.add("is-released");
        } else if(scrollPosition.current === 0) {
            progressRef.current = 0.1;
            setProgress(0.1);
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  // Scrolling logic
  useEffect(() => {
    const slider = slideContainerRef.current;
    const trigger = triggerRef.current;
    if (!slider || !trigger) return;

    let touchStartY = 0;

    const handleGesture = (deltaY: number, event: WheelEvent | TouchEvent) => {
      const now = Date.now();
      const rect = trigger.getBoundingClientRect();
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      const isCurrentlyScrollingUp = deltaY < 0;
      const isTouch = event.type.includes('touch');
      const isScrollingUp = deltaY < 0;
      const isScrollingDown = deltaY > 0;
   
      const isAtStart = scrollPosition.current <= 5;
      const isAtEnd = scrollPosition.current >= (maxScroll - 45); // 45px buffer for easier exit

      // --- INERTIA KILL: Prevents "Hard Swipes" from carrying over ---
      if (isAnimating.current) {
        touchpadAccumulator.current = 0; // Reset pressure so it doesn't "burst" after animation
        if (event.cancelable) event.preventDefault();
        return true;
      }

      // --- SPLIT EXIT LOGIC (UPWARD & DOWNWARD) ---

      // TOUCHSCREEN (Forgiving buffers for "Flicking" out)
      if (isTouch) {
        // Upward Exit
        if (isScrollingUp && (progressRef.current < 35 || isAtStart)) {
          slider.classList.add("is-released");
            progressRef.current = 0; 
            setProgress(0); 
          window.dispatchEvent(new CustomEvent("jump-section", { detail: { direction: -1 } }));
          return false;
        }
        // Downward Exit (The Fix for "Too many scrolls")
        if (isScrollingDown && isAtEnd) {
          slider.classList.add("is-released");
          progressRef.current = 100;
          setProgress(100);
          // Tell the vertical hook to jump to the next section
          window.dispatchEvent(new CustomEvent("jump-section", { detail: { direction: 1 } }));
          return false; // Hand control to native vertical scroll immediately
        }
      }

      // TRACKPAD/WHEEL (Strict 5px checks + Momentum protection)
      if (!isTouch) {
        // Upward Exit
        if (isScrollingUp && isAtStart) {
          if (isAnimating.current || (now - lastScrollTime.current < 500)) return true;
          slider.classList.add("is-released");
          progressRef.current = 0; 
          setProgress(0);
          window.dispatchEvent(new CustomEvent("jump-section", { detail: { direction: -1 } }));
          return false;
        }
      }

      const isPinned = isTouch 
      ? (rect.top < 100 && rect.bottom > 100) // Much wider window for mobile
      : (rect.top <= 20 && rect.bottom > window.innerHeight);

      if (isPinned) {
        const gap = isTouch ? 0 : 10;
        const slideWidth = slider.clientWidth + gap;
        
        // Match the end check to the limit logic below
        const isAtEnd = isTouch 
          ? scrollPosition.current >= (maxScroll - 5)
          : scrollPosition.current >= (maxScroll - 45); 

        // DIRECTIONAL RESET (Fixes Trackpad Delay)
        const wasAccumulatingDown = touchpadAccumulator.current > 0;
        const wasAccumulatingUp = touchpadAccumulator.current < 0;
        if ((isCurrentlyScrollingUp && wasAccumulatingDown) || (!isCurrentlyScrollingUp && wasAccumulatingUp)) {
          touchpadAccumulator.current = 0;
        }

        // PRESSURE CLEAR: If at the wall, don't let pressure build
        if (isAtEnd && isScrollingDown) {
          touchpadAccumulator.current = 0;
        }

        touchpadAccumulator.current += deltaY;
      
        // RELEASE CHECK (END OF SECTION): Instant snap kills momentum
        if (isScrollingDown && isAtEnd) {
          // If we are at slide 3 but the bar isn't full, charge the last 10%
          if (progressRef.current < 100) {
            // Use a multiplier (e.g., 0.1) to make the bar fill based on scroll distance
            const nextProgress = Math.min(100, progressRef.current + (Math.abs(deltaY) * 0.12));
            
            progressRef.current = nextProgress;
            setProgress(nextProgress);
            
            // Stop here to let the user see the bar hit 100%
            touchpadAccumulator.current = 0; // Reset so the first flick doesn't exit
            if (event.cancelable) event.preventDefault();
            return true; 
          }

          // FINAL JUMP: Only exit if bar is 100% AND a new deliberate flick happens
          if (Math.abs(touchpadAccumulator.current) >= 20) {
            slider.classList.add("is-released");
            window.dispatchEvent(new CustomEvent("jump-section", { detail: { direction: 1 } }));
            return false; 
          }
          
          if (event.cancelable) event.preventDefault();
          return true;
        }

        slider.classList.remove("is-released");
        if (event.cancelable) event.preventDefault();

        // MOMENTUM & SENSITIVITY GUARDS
        const sensitivity = isTouch ? 40 : 100; // Higher threshold for wheel/trackpad
        const cooldown = isTouch ? 400 : 600;   // Longer cooldown to swallow trackpad inertia

        // Bypass guards when already at the end and trying to scroll down to exit.
        // This makes the transition into the next section feel "normal" and instant.
        const isExiting = isScrollingDown && isAtEnd;

        if (!isExiting) {
          if (isAnimating.current || (now - lastScrollTime.current < cooldown)) return true; 
          if (Math.abs(touchpadAccumulator.current) < sensitivity && Math.abs(deltaY) < sensitivity) return true; 
        }

        touchpadAccumulator.current = 0;

        const canGoNext = isScrollingDown && !isAtEnd;
        const canGoBack = !isScrollingDown && scrollPosition.current > 10;

        if (canGoNext || canGoBack) {
          if (!canScroll.current) return true;
          canScroll.current = false; 

          isAnimating.current = true;
          lastScrollTime.current = now;

          const direction = isScrollingDown ? 1 : -1;
          
          // LIMIT: Prevents wheel from snapping to 100% and skipping the 85% progress visual
          const limit = isTouch ? maxScroll : maxScroll - 45;
          const nextPosition = Math.max(0, Math.min(scrollPosition.current + (direction * slideWidth), limit));
          
          const scrollPercentage = (nextPosition / maxScroll);
          let nextProgress = 5 + (scrollPercentage * 85);

          // SYNC REF AND STATE
          progressRef.current = nextProgress;
          setProgress(nextProgress);

          slider.scrollTo({ left: nextPosition, behavior: "smooth" });
          scrollPosition.current = nextPosition;
          
          setTimeout(() => {
            isAnimating.current = false;
            lastScrollTime.current = Date.now();
            canScroll.current = true;
          }, cooldown); 
          
          return true; 
        }
      }
      return false; 
    };

    const onWheel = (e: WheelEvent) => handleGesture(e.deltaY, e);

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      if (!isAnimating.current) {
        const currentPos = slider.scrollLeft;
        scrollPosition.current = currentPos;
        
        const max = slider.scrollWidth - slider.clientWidth;
        const currentProgress = max > 0 ? (currentPos / max) * 100 : 0;
        
        const initialVal = currentPos <= 5 ? 30 : currentProgress;
        progressRef.current = (currentPos <= 5) ? 0 : initialVal;
        setProgress(initialVal);
        
        if (currentPos <= 5) {
          slider.classList.add("is-released");
        } else {
          slider.classList.remove("is-released");
        }
      }
      touchpadAccumulator.current = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isAnimating.current) {
        if (e.cancelable) e.preventDefault();
        return;
      }
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY; 

      // SENSITIVITY
      if (Math.abs(deltaY) > 2) { 
        const isHorizontal = handleGesture(deltaY, e);
        
        // If handleGesture returns false (Exit triggered), 
        // we don't preventDefault, allowing the page to move.
        if (isHorizontal && e.cancelable) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return { slideContainerRef, triggerRef, progress, isSectionVisible}
}