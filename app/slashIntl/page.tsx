"use client";
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
      <section id="hero-slashIntl" aria-label="Introduction">
        <div id="slashIntl-wrapper" className="wrapper">
          <h1 className="headline">
            WHERE ELITE TALENT<br/>
            MEETS THE GLOBAL GAME.
          </h1>
          <div className="headline-image-container">
            <Image 
              src={sLogoWhite}
              alt=""
              className="headline-image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <div className="scroll-icon-container">
            <PiArrowDownLight className="scroll-down-icon" aria-hidden="true"/>
          </div>
        </div>
      </section>
      <AboutUs />
      <Testimonials />
      <MeetIntlTeam />
    </main>
  )
}