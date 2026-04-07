"use client";
import type { JSX } from "react";
import Image from "next/image";
import josh from "@/public/images/josh-irving.png";
import jamaal from "@/public/images/jamaal-franklin.jpeg";
import tehina from "@/public/images/tehina-paopao.webp";
import { PiArrowDownLight } from "react-icons/pi";
import { useHorizontalLock } from "@/app/lib/hooks/useHorizontalLock";

export default function OurWork(): JSX.Element {
  const { 
    slideContainerRef, 
    triggerRef, 
    progress, 
    isSectionVisible 
  } = useHorizontalLock();

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
                placeholder="blur"
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
                placeholder="blur"
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
                placeholder="blur"
              />
            </div>
          </div>
        </div>

        <div 
          className="progress-container"
          style={{ 
            opacity: isSectionVisible && progress >= 5 && progress < 99 ? 1 : 0, 
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
        </div>
      </div>
    </section>
  )
}