import type { JSX } from "react";
import Image from "next/image";
import dennis from "@/public/images/dennis.webp"

export default function CompOverview(): JSX.Element {
  return(
    <section id="overview">
      <div id="overview-wrapper" className="wrapper">
        <h1>
          <span className="outline-text">
            WHO
          </span> WE ARE
        </h1>
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
        <div id="overview-img-container">
          <Image 
            src={dennis}
            alt=""
            id="overview-img"
            fill
          />
        </div>
      </div>
    </section>
  )
}