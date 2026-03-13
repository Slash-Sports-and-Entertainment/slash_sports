"use client"
import { useEffect, useState } from "react";
import { testimonials } from "@/app/data/testimonials";
import Image from "next/image";
import cancel from "../../../../public/images/cancel.svg";
import BreakParagraphs from "@/app/lib/components/BreakParagraphs";
import { PiArrowDownLight } from "react-icons/pi";

export default function TestimonialGrid() {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null)

  // Listen for grid container image click
  useEffect(() => {
    document.addEventListener("click", (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const targetParentContainerId = target?.parentElement?.id;
      const testimonialsContainer = document.getElementById("testimonials-cards-container");
      const selectedGridImage = document.getElementById(`${targetParentContainerId}`);
      const selectedGridClass = document.querySelectorAll(".testimonial-grid-image-container");

      if(target.classList.contains("testimonial-grid-image")) {
        const targetIdNum = Number(target.dataset.gridImageId);
        setSelectedCardIndex(targetIdNum);

        if(testimonialsContainer) {
          testimonialsContainer.style.display = "none";
        }

        if(selectedGridImage) {
          // Remove border and opacity from other grid images
          selectedGridClass.forEach((image) => {
            const imageContainer = document.getElementById(`${image.id}`);
            if(imageContainer) {
              imageContainer.style.border = "none";
              imageContainer.style.opacity = ".75";
            }
          })

          // Add border and opacity to selected image
          selectedGridImage.style.border = "4px solid #f88303";
          selectedGridImage.style.opacity = "1";
        }
      }

      // Cancel pop-up testimonial
      if(target.classList.contains("cancel-select-image")) {
        setSelectedCardIndex(null);
        // Display testimonial cards
        if(testimonialsContainer) {
          testimonialsContainer.style.display = "flex";
        }

        // Remove border and opacity from other grid images
        if(selectedGridClass) {
          selectedGridClass.forEach((image) => {
            const imageContainer = document.getElementById(`${image.id}`);
            if(imageContainer) {
              imageContainer.style.border = "none";
              imageContainer.style.opacity = ".75";
            }
          })
        }
      }
    })
  }, []);

  // Map testimonials to make grid of images
  const testGrid = testimonials.map((testimonial) => {
    return(
      <div 
        id={`testimonial-grid-${testimonial.id}`} 
        className={`testimonial-grid-container ${selectedCardIndex ? "selected" : ""}`} 
        key={testimonial.id}
      >
        <div
          id={`test-grid-image-${testimonial.id}`} 
          className={`testimonial-grid-image-container ${selectedCardIndex ? "selected" : ""}`}
        >
          <Image 
            src={testimonial.image}
            alt={testimonial.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="testimonial-grid-image"
            data-grid-image-id={testimonial.id}
          />
        </div>
        <div className="testimonial-grid-name">
          {testimonial.firstName} {testimonial.lastName}
        </div>
      </div>
    )
  });

  // Map testimonials to create a quote for a selected image
  const selectedTestimonials = testimonials.map((testimonial) => {
    return(
      <div 
        id="selected-testimonials-container" 
        className={selectedCardIndex !== null ? "selected" : ""}
        key={testimonial.id}
      >
        <button className="cancel-select-testimonial">
          <Image 
            src={cancel}
            alt="photo to cancel selected testimonial"
            fill
            className="cancel-select-image"
          />
        </button>
        <div className="selected-card">
          <div className="selected-test-quote">
            <BreakParagraphs>
              {testimonial.quote}
            </BreakParagraphs>
          </div>
          <span className="selected-test-cite">
            &mdash; {testimonial.firstName} {testimonial.lastName}
          </span>
        </div>
      </div>
    )
  })

  useEffect(() => {
    
  }, []);

  return(
    <>
      {selectedCardIndex !== null && selectedTestimonials[selectedCardIndex]}
      <div className="testimonials-grid-container">
        <div className="testimonials-grid-header">
          <span>All Testimonials</span>
        </div>
        <div className="testimonial-grid">
          {testGrid}
        </div>
      </div>
    </>
  )
}