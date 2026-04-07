"use client";
import { useEffect, useRef, useState } from "react";

export function useSectionLock() {
  const isLocked = useRef(false);
  const isNavigating = useRef(false);
  const currentIndex = useRef(0);
  const [activeId, setActiveId] = useState("");
  const touchpadAccumulator = useRef(0);

  useEffect(() => {
    const sections = document.querySelectorAll("section, footer");
    if (!sections.length) return;

    // Track Active Section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const newIndex = Array.from(sections).indexOf(e.target as HTMLElement);
          
          setActiveId(e.target.id);
          // Only sync index if we aren't currently mid-animation
          
          // --- THE CONDITIONAL SYNC ---
          if (isLocked.current || isNavigating.current) {
            if (newIndex !== -1) { 
              currentIndex.current = newIndex;
              setActiveId(e.target.id);
            }
          }


          // If a user swiped into a NEW section and we aren't already locked:
          if (newIndex !== currentIndex.current && !isLocked.current && activeId === "our-work" && !isNavigating.current) {
            
            // 1. ENGAGE THE HARD LOCK
            isLocked.current = true;
            currentIndex.current = newIndex;
            document.body.classList.add("is-locked");

            // 2. FORCE THE CENTER (In case they swiped fast)
            e.target.scrollIntoView({ behavior: "smooth" });

            // RELEASE AFTER COOLDOWN
            setTimeout(() => {
                isLocked.current = false;
                document.body.classList.remove("is-locked");
                touchpadAccumulator.current = 0;
            }, 1000); 
          }
        }
      });
    }, { threshold: 0.5 }); // Lower threshold for faster detection

    sections.forEach((section) => observer.observe(section));

    // Navigation link handler
    const handleNavJump = () => {
      isNavigating.current = true;
      setTimeout(() => {
        isNavigating.current = false;
      }, 1200);
    }

    // Navigation Logic
    const navigate = (direction: number) => {
      if (isLocked.current) return;

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

    // Wheel Handler with Trackpad Logic
    const handleWheel = (e: WheelEvent) => {
      // Check if the scroll target is a scrollable element
      const target = e.target as HTMLElement;

      const isInternalScroll = (el: HTMLElement | null): boolean => {
        if (!el || el === document.body) return false;
        const style = window.getComputedStyle(el);
        const overflowY = style.getPropertyValue("overflow-y");
        // Check if element is meant to scroll and actually has content to scroll
        if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
          const isAtTop = el.scrollTop === 0 && e.deltaY < 0;
          const isAtBottom = Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 1 && e.deltaY > 0;
          
          return !isAtTop && !isAtBottom;
        }
        return isInternalScroll(el.parentElement);
      };

      if (isInternalScroll(target)) return; // Allow internal scrolling
      
      // If our-work section let our-work section handle scrolling
      if (activeId === "our-work") return;
      
      e.preventDefault();

      // If locked, keep the bucket empty and ignore input
      if (isLocked.current) {
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


    // Keyboard Navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeId === "our-work" || isLocked.current) return;
      if (["ArrowDown", "ArrowUp", " "].includes(e.key)) {
        e.preventDefault();
        navigate(e.key === "ArrowUp" ? -1 : 1);
      }
    };

    // Horizontal Exit Hand-off
    const handleJump = (e: any) => navigate(e.detail.direction);

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("jump-section", handleJump);
    window.addEventListener("nav-link-clicked", handleNavJump);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("jump-section", handleJump);
      window.removeEventListener("nav-link-clicked", handleNavJump);
    };
    
  }, [activeId]);
}
