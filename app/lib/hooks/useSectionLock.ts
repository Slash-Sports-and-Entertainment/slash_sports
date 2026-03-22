"use client";
import { useEffect, useRef, useState } from "react";

export function useSectionLock() {
  const isLocked = useRef(false);
  const isPageLoading = useRef(true);
  const currentIndex = useRef(0);
  const [activeId, setActiveId] = useState("");
  const touchpadAccumulator = useRef(0);

  useEffect(() => {
    const sections = document.querySelectorAll("section, footer");
    if (!sections.length) return;

    // 1. TRACK LOADING STATE: Set a duration that matches your Hero animation
    const loadTimeout = setTimeout(() => {
      isPageLoading.current = false;
    }, 1000);

    // 1. Track Active Section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setActiveId(e.target.id);
          // Only sync index if we aren't currently mid-animation
          if (!isLocked.current) {
            const index = Array.from(sections).indexOf(e.target as HTMLElement);
            if (index !== -1) currentIndex.current = index;
          }
        }
      });
    }, { threshold: 0.2 }); // Lower threshold for faster detection

    sections.forEach((section) => observer.observe(section));

    // 2. Navigation Logic
    const navigate = (direction: number) => {
      if (isLocked.current || isPageLoading.current) return;

      const nextIndex = currentIndex.current + direction;

      if (nextIndex >= 0 && nextIndex < sections.length) {
        isLocked.current = true;
        currentIndex.current = nextIndex;
        
        // Kill all built-up pressure before the move
        touchpadAccumulator.current = 0;

        sections[nextIndex].scrollIntoView({ behavior: "smooth" });

        // 1000ms cooldown is critical for trackpad inertia
        setTimeout(() => {
          isLocked.current = false;
          touchpadAccumulator.current = 0; 
        }, 1000);
      }
    };

    // 3. Wheel Handler with Trackpad Logic
    const handleWheel = (e: WheelEvent) => {
      if (activeId === "our-work") return;
      
      e.preventDefault();

      // If locked, keep the bucket empty and ignore input
      if (isLocked.current || isPageLoading.current) {
        touchpadAccumulator.current = 0;
        return;
      }

      // DIRECTIONAL RESET: If user switches scroll direction, clear the bucket
      const isScrollingUp = e.deltaY < 0;
      const isScrollingDown = e.deltaY > 0;
      if ((isScrollingUp && touchpadAccumulator.current > 0) || 
          (isScrollingDown && touchpadAccumulator.current < 0)) {
        touchpadAccumulator.current = 0;
      }

      // Build up pressure
      touchpadAccumulator.current += e.deltaY;

      // THRESHOLD: Require 100px of "flick" to trigger a jump
      if (Math.abs(touchpadAccumulator.current) >= 100) {
        const direction = touchpadAccumulator.current > 0 ? 1 : -1;
        navigate(direction);
        touchpadAccumulator.current = 0;
      }
    };

    // 4. Keyboard Navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeId === "our-work" || isLocked.current || isPageLoading) return;
      if (["ArrowDown", "ArrowUp", " "].includes(e.key)) {
        e.preventDefault();
        navigate(e.key === "ArrowUp" ? -1 : 1);
      }
    };

    // 5. Horizontal Exit Hand-off
    const handleJump = (e: any) => navigate(e.detail.direction);

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("jump-section", handleJump);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("jump-section", handleJump);
    };
  }, [activeId]);
}
