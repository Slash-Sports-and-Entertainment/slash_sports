"use client";
import SecondaryNav from "../components/SecondaryNav";
import type { JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import josh from "@/public/images/josh-irving.png";
import jamaal from "@/public/images/jamaal-franklin.jpeg";
import tehina from "@/public/images/tehina-paopao.webp";
import { useStyleObserver } from "../../lib/hooks/useStyleObserver";

export default function ourWorkPage(): JSX.Element {
  useStyleObserver();

  return(
    <main>

    <section id="on-the-court" aria-labelledby="on-the-court-title">

      <div id="on-the-court-wrapper" className="wrapper">
        
        <SecondaryNav />
        <article 
            id="on-the-court-paragraphs-1" 
            className="on-the-court-paragraphs"
        >
          <p className="style-paragraphs">
            We have represented multiple NBA and WNBA draft 
            picks who have grown to build successful 
            professional careers.
          </p>
          <div className="onTheCourt-img-container">
            <Image 
              src={tehina}
              alt="Te-Hina Paopao celebrating on court" 
              className="onTheCourt-img"
              id="onTheCourt-img-1"
              fill
              placeholder="blur"
            />
          </div>
          {/* <div className="scroll-indicator" aria-hidden="true">
            <PiArrowDownLight className="scroll-indicator-icon"/>
          </div> */}
        </article>

        <article 
            id="on-the-court-paragraphs-2" 
            className="on-the-court-paragraphs"
        >
          <p className="style-paragraphs">
            At the negotiation table, SLASH continually 
            delivers results. SLASH&apos;s team has been a 
            part of securing over $200M in NBA contracts 
            in addition to securing multi-million dollar 
            deals in every year of business.
          </p>
          <div className="onTheCourt-img-container">
            <Image 
              src={jamaal}
              alt="Jamaal Franklin shooting a jumpshot" 
              className="onTheCourt-img"
              id="onTheCourt-img-2"
              fill
              placeholder="blur"
            />
          </div>
        </article>

        <article 
          id="on-the-court-paragraphs-3" 
          className="on-the-court-paragraphs"
        >
          <p className="style-paragraphs">
            At large, we teach, mentor, protect, and 
            support players so they possess the 
            ability to succeed on and off the court, 
            create generational wealth for their 
            families, and use the game of basketball 
            to build something bigger than themselves.
          </p>
          <div className="onTheCourt-img-container">
            <Image 
              src={josh}
              alt="Josh Irving in Texas A&M uniform on media day" 
              className="onTheCourt-img"
              id="onTheCourt-img-3"
              fill
              placeholder="blur"
            />
          </div>
        </article>
      </div>

    </section>

    </main>
  )
}