"use client";
import type { JSX } from "react";
import Image from "next/image";
import oddessey from "@/public/images/sims.svg";
import { useStyleObserver } from "@/app/lib/hooks/useStyleObserver";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OurWork(): JSX.Element {
  useStyleObserver();
  const router = useRouter();

  return(
    <section id="our-work" aria-labelledby="our-work-title">
      <div 
        id="our-work-wrapper" 
        className="wrapper"
      >
        <h2 id="our-work-title">
          <span className="outline-text">
            OUR
          </span> WORK
        </h2> 

        <p className="style-paragraphs">
          SLASH provides full-service representation 
          to NBA and WNBA players, NIL representation 
          to college and high school athletes, and 
          professional representation to collegiate 
          coaches.
        </p>
        <div className="our-work-img-container">
          <Image 
            src={oddessey}
            alt="SLASH client Tehina Pao-pao"
            id="our-work-img"
            fill
          />
        </div>
        <a 
          href={"/slash/on-the-court"}
          className="our-work-link button"
          role="button"
          aria-label="links to on the court page"
          tabIndex={0}    
        >
          See Our Work
        </a>
      </div>
    </section>
  )
}