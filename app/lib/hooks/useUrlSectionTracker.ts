import { useEffect } from "react";

export function useUrlSectionTracker() {
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    
    // Change urls based on section ids
    const sectionIntersecting = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          const id = entry.target.id;
          if(entry.isIntersecting) {
            const newUrl = id.startsWith("hero") ? "#" : `#${id}`;
            window.history.replaceState(null, "", newUrl)
          }
        })
      };

    const options = {
      root: null,
      rootMargin: "0px",
      scrollMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(sectionIntersecting, options);

    sections.forEach((sections: any) => {
      observer.observe(sections);
    });

    return () => {
      observer.disconnect();
    }
  }, []);
};