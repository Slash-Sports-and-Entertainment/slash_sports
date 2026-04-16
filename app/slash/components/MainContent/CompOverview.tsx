import { useRef, useState } from "react";
import type { JSX } from "react";
import Image from "next/image";
import dennis from "@/public/images/dennis.webp"

export default function CompOverview(): JSX.Element {
  const cardFlipRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(cardFlipRef.current) {
      const flip = cardFlipRef.current.classList.toggle("flip");
      setIsFlipped(flip);
    }
  }

  return(
    <section id="who-we-are" aria-labelledby="overview-title">
      <div id="overview-wrapper" className="wrapper">
        <h2 id="overview-title">
          <span className="outline-text">
            WHO
          </span> WE ARE
        </h2>
        <div id="overview-card-container" className="card-container">
          <div 
            id="overview-card" 
            className="card" 
            ref={cardFlipRef}
            aria-live="polite"
          >

            <div 
              id="overview-img-container" 
              className="front"
              aria-hidden={isFlipped}
            >
              <Image 
                src={dennis}
                alt="SLASH client Dennis Evans"
                id="overview-img"
                fill
              />
            </div> 

            <div 
              className="paragraph-container back"
              aria-hidden={!isFlipped}
              role="region"
              aria-label="About SLASH Sports and Entertainment"
            >
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
          aria-controls="overview-card"
          aria-expanded={isFlipped}
          aria-label="Flip card to read more about us"
        >
            {isFlipped ? "Show Photo" : "More about us"}
        </button>
      </div>
    </section>
  )
}