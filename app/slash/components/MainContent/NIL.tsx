"use client";
import { useEffect, useRef } from "react";
import type { JSX } from "react";

export default function NIL(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly set these to handle browser-specific quirks
    video.muted = true;
    video.playsInline = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use .catch() to prevent "Uncaught (in promise)" errors if 
            // the user scrolls past the video extremely fast.
            video.play().catch(err => console.log("Video play interrupted:", err));
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(video);

    return () => {
      if (video) observer.unobserve(video);
    };
  }, []);

  return(
    <section id="nil">
      <video 
        width={600} 
        height={400} 
        id="nil-vid"
        muted 
        loop 
        preload="auto"
        playsInline
        ref={videoRef}
      >
        <source src="/videos/nil-video.mp4" type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      <div id="nil-wrapper" className="wrapper">
        <h1>
          NIL
        </h1>
        <p className="style-paragraphs">
          SLASH represents a select group of elite 
          high school and college basketball players. 
          We have negotiated millions of dollars in 
          NIL agreements with schools in all of the 
          major conferences. Our efforts extend beyond 
          deal making, ensuring our clients are in the 
          best situations for long term success, on 
          and off the court.
        </p>
      </div>
    </section>
  )
}