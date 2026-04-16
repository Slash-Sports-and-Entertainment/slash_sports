import type { JSX } from "react";
import Image from "next/image";
import treyKell from "@/public/images/trey-kell.webp"


export default function AboutUs(): JSX.Element {
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
        <p className="style-paragraphs">
          SLASH International provides superior representation 
          to professional basketball players in top 
          international markets as well as international 
          players playing in the USA.
        </p>
        <div id="about-us-img-container">
          <Image 
            src={treyKell}
            alt="SLASH athlete Trey Kell"
            id="about-us-img"
            fill
          />
        </div>
      </div>
    </section>
  )
}