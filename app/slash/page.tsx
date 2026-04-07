"use client";
import CompOverview from "./components/MainContent/CompOverview"
import OurWork from "./components/MainContent/OurWork";
import WorkedWith from "./components/MainContent/WorkedWith";
import NIL from "./components/MainContent/NIL";
import MeetTeam from "./components/MainContent/MeetTeam";
import { PiArrowDownLight } from "react-icons/pi";
import Image from "next/image";
import sLogoWhite from "@/public/images/s-logo-white.png"
import { useUrlSectionTracker } from "../lib/hooks/useUrlSectionTracker";
import { useStyleObserver } from "../lib/hooks/useStyleObserver";
import { useSectionLock } from "../lib/hooks/useSectionLock";


export default function SlashHome() {
  useUrlSectionTracker();
  useStyleObserver();
  useSectionLock();
  
  return(
    <main id="slash-container">
      <section id="hero-slash">
        <div id="slash-wrapper" className="wrapper">
          <p className="headline">
            Where Athletes are<br/>
            Built, Polished, and Unleashed.
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
      <CompOverview />
      <OurWork />
      <WorkedWith />
      <NIL />
      <MeetTeam />
    </main>
  )
}