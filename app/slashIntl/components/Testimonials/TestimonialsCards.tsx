"use client";
import { useState, useEffect, useRef } from "react";
import type { JSX } from "react";
import { testimonials } from "@/app/data/testimonials";
import Image from "next/image";
import BreakParagraphs from "../../../lib/components/BreakParagraphs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";

export default function TestimonialsCards(): JSX.Element {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const testCards = testimonials.map((testimonial, index) => {
    return(
      <article 
        id={`testimonial-card-${testimonial.id}`} 
        className="testimonial-card" 
        key={index}
      >
        <div className="quote-container">
          <BreakParagraphs>
            {testimonial.quote}
          </BreakParagraphs>
        </div>
        <div className="cite-tags">
          <div className="cite-image-container">
            <Image 
              src={testimonial.image}
              alt={testimonial.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="cite-image"
            />
          </div>
          <div className="in-text-citation">
            {testimonial.firstName} {testimonial.lastName}
          </div>
        </div>
      </article>
    )
  })


  // Timer for auto switching
  useEffect(() => {
    // Auto switch cards
    const autoSwitchCard = () => {
      return setCurrentCardIndex((prev) => {
        if(prev === testimonials.length - 1) {
          return 0;
        } else {
          return prev + 1 % testimonials.length;
        }
      })
    }

    if(!isPaused) {
      intervalRef.current = setInterval(autoSwitchCard, 13000);
    }

    return(() => {
      if(intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    })
  }, [isPaused])

  // Manually go to previous or next cards or control auto switch
  function handleCardBtns(e: React.MouseEvent) {
    e.preventDefault();
    const targetId = e.currentTarget.id;

    if(targetId === "control-timer") {
      if(isPaused) {
        setIsPaused(false);
      } else {
        setIsPaused(true);
      }
    }

    if(targetId === "previous-card") {
      setIsPaused(true);
      setCurrentCardIndex((prev) => {
        if(prev === 0) {
          return testCards.length - 1;
        }
        return prev - 1 % testCards.length
      })
    }

    if(targetId === "next-card") {
      setIsPaused(true);
      setCurrentCardIndex((prev) => {
        if(prev === testCards.length - 1) {
          return 0;
        }
        return prev + 1 % testCards.length
      })
    }
  }

  return(
    <div id="testimonials-cards-container">
      {testCards[currentCardIndex]}
      <div id="card-btn-container">
        <button 
          id="previous-card" 
          className="card-btn"
          onClick={handleCardBtns}
        >
          Prev
        </button>
        <button 
          id="control-timer"
          onClick={handleCardBtns}
        >
          {isPaused ? 
            <FaPlay /> : 
            <FaPause />
          }
        </button>
        <button 
          id="next-card" 
          className="card-btn"
          onClick={handleCardBtns}
        >
          Next
        </button>
      </div>
    </div>
  )
}