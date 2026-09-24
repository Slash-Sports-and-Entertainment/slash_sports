import { useState, useRef, JSX } from "react";
import Image from "next/image";
import treyKell from "@/public/images/trey-kell.webp"


export default function AboutUs(): JSX.Element {
  const cardFlipRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(cardFlipRef.current) {
      const flip = cardFlipRef.current.classList.toggle("flip");
      setIsFlipped(flip);
    }
  }

  return(
    <section 
      id="about-us" 
      aria-labelledby="about-us-title" 
      tabIndex={0}
    >
      <div id="about-us-wrapper" className="wrapper">
        <h2 id="about-us-title">
          <span className="outline-text">
            ABOUT
          </span> US
        </h2>

        <div id="about-us-card-container" className="card-container">
          <div 
            id="about-us-card" 
            className="card" 
            ref={cardFlipRef}
            aria-live="polite"
          >
            <div 
              id="about-us-front-container"
              aria-hidden={isFlipped}
              className="front"
            >
              <p className="style-paragraphs">
                SLASH International is a global basketball agency 
                built to represent elite talent across borders.
              </p>

              <div 
                id="about-us-img-container" 
              >
                <Image 
                  src={treyKell}
                  alt="SLASH athlete Trey Kell"
                  id="about-us-img"
                  fill
                  />
              </div>
            </div>

            <div 
              className="paragraph-container back"
              aria-hidden={!isFlipped}
              role="region"
              aria-label="About SLASH Sports and Entertainment"
            >
              <p>
                The firm is led by NBPA and FIBA certified 
                representation, backed by legal and business expertise 
                and a deep understanding of both the NBA and 
                international basketball markets.
              </p>

              <p>
                With relationships spanning the NBA, NCAA, Europe, 
                Asia and Australia, SLASH creates pathways for 
                international prospects into the U.S. while representing 
                established professionals in their pursuit of the 
                highest levels of the game.
              </p>

              <p>
                Our global network also makes SLASH a valuable resource 
                for NBA front offices — connecting teams to talent, 
                information and relationships across the international 
                market.
              </p>

              <p>
                From emerging prospects to established professionals, 
                our approach combines high-level representation, 
                global reach and individualized career strategy.
              </p>

              <p>
                <b>NBA Representation. Global Pathways.</b>
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
          aria-label={isFlipped ? "Show client image" : "Read more about SLASH"}
        >
          {isFlipped ? "Show Photo" : "More about us"}
        </button>
      </div>
    </section>
  )
}