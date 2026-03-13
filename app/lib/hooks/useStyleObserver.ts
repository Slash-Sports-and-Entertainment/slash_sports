import { useEffect } from "react";

export function useStyleObserver() {
  
  useEffect(() => {
    const paragraphs = document.querySelectorAll("p");

    const elementStyleIntersecting = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if(entry.isIntersecting && entry.target.classList.contains("style-paragraphs")) {
          entry.target.classList.add("paragraphs-fade");
        }
      });
    };

    const options = {
      root: null,
      rootMargin: "0px",
      scrollMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(elementStyleIntersecting, options);

    paragraphs.forEach((paragraph) => {
      observer.observe(paragraph)
    });

    return () => {
      observer.disconnect()
    };

  }, []);
}