import { useEffect, useRef } from "react";
import type { JSX } from "react";
import Image from "next/image";
import dennis from "@/public/images/dennis.webp"

export default function CompOverview(): JSX.Element {
  const cardFlipRef = useRef<HTMLDivElement>(null);

  const handleCardFlip = () => {
    if(cardFlipRef.current) {
      cardFlipRef.current.classList.toggle("flip");
    }
  }

  return(
    <section id="who-we-are">
      <div id="overview-wrapper" className="wrapper">
        <h1>
          <span className="outline-text">
            WHO
          </span> WE ARE
        </h1>
        <div className="overview-card-container">
          <div id="overview-card" ref={cardFlipRef}>

            <div id="overview-img-container" className="front">
              <Image 
                src={dennis}
                alt="image of slash client Dennis Evans"
                id="overview-img"
                fill
                />
            </div>

            <div className="paragraph-container back">
              <p className="style-paragraphs">
                We believe development is the highest 
                form of representation.
              </p>
              
              <p className="style-paragraphs">
                We believe talent deserves more than 
                management — it deserves a system.
              </p>

              <p className="style-paragraphs">
                We don’t wait for talent to arrive. 
                We develop it. We shape it. We elevate 
                it. We tell its story with intention.
              </p>

              <p className="style-paragraphs">
                We do not cut corners. We cut excuses. We 
                SLASH everything that slows greatness.
              </p>
            </div>

          </div>
        </div>
        <button 
          id="card-flip-btn" 
          className="button"
          onClick={handleCardFlip}
        >
          More about us
        </button>
      </div>
    </section>
  )
}