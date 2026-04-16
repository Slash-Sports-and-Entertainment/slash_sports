"use client"
import { useEffect, useState, useRef } from "react";
import { testimonials } from "@/app/data/testimonials";
import Image from "next/image";
import cancel from "../../../../public/images/cancel.svg";
import BreakParagraphs from "@/app/lib/components/BreakParagraphs";


export default function TestimonialGrid() {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);
  const gridRefs = useRef<(HTMLButtonElement | null)[]>([]);


  useEffect(() => {
    const testimonialsContainer = document.getElementById("testimonials-cards-container");
    if(testimonialsContainer) {
      testimonialsContainer.style.display = selectedCardIndex !== null ? "none" : "flex";
    }
  }, [selectedCardIndex]);

  useEffect(() => {
    if(selectedCardIndex !== null) {
      cancelBtnRef.current?.focus();
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [selectedCardIndex]);

  const handleSelect = (index: number) => {
    setSelectedCardIndex(index);
  };

  const handleClose = () => {
    const prevIndex = selectedCardIndex;
    setSelectedCardIndex(null);

    // Return focus to the image that triggered the pop-up
    if(prevIndex !== null) {
      gridRefs.current[prevIndex]?.focus();
    }
  };

  return(
    <>
      {/* Selected Testimonial */}
      {selectedCardIndex !== null && (
        <div 
          className="selected"
          id="selected-testimonials-container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="selected-athletes-name"
        >
          <button 
            ref={cancelBtnRef}
            className="cancel-select-testimonial"
            onClick={handleClose}
            aria-label="Close testimonial"
          >
            <Image
              src={cancel}
              alt=""
              fill
              className="cancel-select-image"
            />
          </button>
          <div className="selected-card">
            <blockquote className="selected-test-quote">
              <BreakParagraphs>
                {testimonials[selectedCardIndex].quote}
              </BreakParagraphs>
            </blockquote>
            <cite 
              className="selected-test-cite"
              id="selected-athletes-name"
            >
              &mdash; {testimonials[selectedCardIndex].firstName} {testimonials[selectedCardIndex].lastName}
            </cite>
          </div>
        </div>
      )}

      {/* Testimonials Grid Images */}
      <div className="testimonials-grid-container">
        <div className="testimonials-grid-header">
          <span>All Testimonials</span>
        </div>

        <div className="testimonial-grid" role="list">
          {testimonials.map((testimonial, index) => {
            const isActive = selectedCardIndex === index;
            return(
              <div 
                className="testimonial-grid-container"
                key={testimonial.id}
                role="listitem"
              >
                <button 
                  className={`testimonial-grid-image-container ${isActive ? "selected-image" : ""}`}
                  id={`test-grid-image-${testimonial.id}`}
                  onClick={() => handleSelect(index)}
                  aria-label={`View testimonial from ${testimonial.firstName} ${testimonial.lastName}`}
                  aria-expanded={isActive}
                >
                    <Image 
                      src={testimonial.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="testimonial-grid-image"
                    />
                </button>
                <div className="testimonial-grid-name" aria-hidden="true">
                  {testimonial.firstName} {testimonial.lastName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}