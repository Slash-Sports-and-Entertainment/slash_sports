"use client";
import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import Image from "next/image";
import josh from "@/public/images/josh-irving.png";
import jamaal from "@/public/images/jamaal-franklin.jpeg";
import tehina from "@/public/images/tehina-paopao.webp";
import { PiArrowDownLight } from "react-icons/pi";

export default function OurWork(): JSX.Element {
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const scrollPosition = useRef(0);
  const lastScrollTime = useRef(0);
  const touchpadAccumulator = useRef(0);
  const canScroll = useRef(true); 

  const [progress, setProgress] = useState(0);
  // NEW: Ref to track progress for logic (prevents the jumping)
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
        } else {
          if (scrollPosition.current === 0) {
            progressRef.current = 0.1;
            setProgress(0.1);
          }
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
      const isTrackpad = !isTouch && Math.abs(deltaY) < 20;

      const isAtStart = scrollPosition.current <= 5;
      const isNearEnd = scrollPosition.current >= (maxScroll - 45); // 45px buffer for easier exit

      // --- INERTIA KILL: Prevents "Hard Swipes" from carrying over ---
      if (isAnimating.current) {
        touchpadAccumulator.current = 0; // Reset pressure so it doesn't "burst" after animation
        if (event.cancelable) event.preventDefault();
        return true;
      }

      // --- SPLIT EXIT LOGIC (UPWARD & DOWNWARD) ---

      // CASE A: TOUCHSCREEN (Forgiving buffers for "Flicking" out)
      if (isTouch) {
        // Upward Exit
        if (isScrollingUp && (progressRef.current < 35 || isAtStart)) {
          slider.classList.add("is-released");
          if (isAtStart) { progressRef.current = 0; setProgress(0); }
          return false;
        }
        // Downward Exit (The Fix for "Too many scrolls")
        if (isScrollingDown && isNearEnd) {
          slider.classList.add("is-released");
          progressRef.current = 100;
          setProgress(100);
          return false; // Hand control to native vertical scroll immediately
        }
      }

      // CASE B: TRACKPAD/WHEEL (Strict 5px checks + Momentum protection)
      if (!isTouch) {
        // Upward Exit
        if (isScrollingUp && isAtStart) {
          if (isAnimating.current || (now - lastScrollTime.current < 500)) return true;
          slider.classList.add("is-released");
          progressRef.current = 0; setProgress(0);
          return false;
        }
      }

      const isPinned = rect.top <= 20 && rect.bottom > window.innerHeight;

      if (isPinned) {
        const gap = isTouch ? 0 : 10;
        const slideWidth = slider.clientWidth + gap;
        
        // Match the end check to the limit logic below
        const isAtEnd = isTouch 
          ? scrollPosition.current >= (maxScroll - 5)
          : scrollPosition.current >= (maxScroll - 45); 

        // 2. DIRECTIONAL RESET (Fixes Trackpad Delay)
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

        // 3. RELEASE CHECK (END OF SECTION): Instant snap kills momentum
        if (isScrollingDown && isAtEnd) {
          slider.classList.add("is-released");
          if (progressRef.current < 100) {
            progressRef.current = 100;
            setProgress(100);
          }
          // IMPORTANT: Return false here WITHOUT preventDefault.
          // This lets the browser move the main scrollbar instantly.
          return false; 
        }

        slider.classList.remove("is-released");
        if (event.cancelable) event.preventDefault();

        // 4. MOMENTUM & SENSITIVITY GUARDS
        const sensitivity = isTouch ? 40 : 100; // Higher threshold for wheel/trackpad
        const cooldown = isTouch ? 400 : 800;   // Longer cooldown to swallow trackpad inertia

        // NEW: Bypass guards when already at the end and trying to scroll down to exit.
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
          const nextProgress = 5 + (scrollPercentage * 85);
          
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

      // SENSITIVITY FIX: Lowered to 2px for instant breakout
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

  return(
    <section id="our-work">
      <div 
        id="our-work-wrapper" 
        className="wrapper"
        ref={triggerRef}
      >

        <div 
          className="our-work-scroll-container" 
          ref={slideContainerRef}
        >
  
          <h1>
            <span className="outline-text">
              OUR
            </span> WORK
          </h1>
          
          <div id="our-work-paragraphs-1" className="our-work-paragraphs">
            <p className="style-paragraphs">
              SLASH provides full-service representation to 
              NBA & WNBA players, NIL representation to 
              college and high school athletes, and 
              professional representation to collegiate 
              coaches.
            </p>
            <p className="style-paragraphs">
              We have represented multiple NBA draft 
              picks who have grown to build successful 
              professional careers.
            </p>
            <div className="ourWork-img-container">
              <Image 
                src={tehina}
                alt="photo of something related to our work" 
                className="ourWork-img"
                id="ourWork-img-1"
                fill
              />
            </div>
          </div>

          <div id="our-work-paragraphs-2" className="our-work-paragraphs">
            <p className="style-paragraphs">
              At the negotiation table, SLASH continually 
              delivers results. SLASH&apos;s team has been a 
              part of securing over $100M in NBA contracts 
              in addition to securing multi-million dollar 
              deals in every year of business.
            </p>
            <div className="ourWork-img-container">
              <Image 
                src={jamaal}
                alt="photo of something related to our work" 
                className="ourWork-img"
                id="ourWork-img-2"
                fill
              />
            </div>
          </div>

          <div id="our-work-paragraphs-3" className="our-work-paragraphs">
            <p className="style-paragraphs">
              At large, we teach, mentor, protect, and 
              support players so they possess the 
              ability to succeed on and off the court, 
              create generational wealth for their 
              families, and use the game of basketball 
              to build something bigger than themselves.
            </p>
            <div className="ourWork-img-container">
              <Image 
                src={josh}
                alt="photo of something related to our work" 
                className="ourWork-img"
                id="ourWork-img-3"
                fill
              />
            </div>
          </div>
        </div>

        <div 
          className="progress-container"
          style={{ 
            opacity: isSectionVisible && progress < 99 ? 1 : 0, 
            pointerEvents: 'none',
            transition: isSectionVisible ? 'opacity 0.3s ease' : 'none'
          }}
        >

          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progress}%` }} 
              />
          </div>
        </div>

        <div className="scroll-indicator">
          <PiArrowDownLight className="scroll-indicator-icon"/>
          {/* <span>Scroll to continue </span> */}
        </div>
      </div>
    </section>
  )
}