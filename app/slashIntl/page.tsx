"use client";
import { useEffect } from "react";
import Image from "next/image";
import { PiArrowDownLight } from "react-icons/pi";
import AboutUs from "./components/AboutUs";
import MeetIntlTeam from "./components/MeetIntlTeam";
import Testimonials from "./components/Testimonials/Testimonials";
import sLogoWhite from "@/public/images/s-logo-white.png"
import { useUrlSectionTracker } from "../lib/hooks/useUrlSectionTracker";
import { useStyleObserver } from "../lib/hooks/useStyleObserver";
import { useSectionLock } from "../lib/hooks/useSectionLock";

export default function SlashIntlHome() {
  useUrlSectionTracker();
  useStyleObserver();
  useSectionLock();
  
  return(
    <main id="slashIntl-container">
      <section id="hero-slashIntl">
        <div id="slashIntl-wrapper" className="wrapper">
          <p className="headline">
            WHERE ELITE TALENT<br/>
            MEETS THE GLOBAL GAME.
          </p>
          <div className="headline-image-container">
            <Image 
              src={sLogoWhite}
              alt="SLASH S logo"
              className="headline-image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="scroll-icon-container">
            <PiArrowDownLight className="scroll-down-icon"/>
          </div>
        </div>
      </section>
      <AboutUs />
      <Testimonials />
      <MeetIntlTeam />
    </main>
  )
}