import type { JSX } from "react";
import Image from "next/image";

import nikeIcon from "@/public/images/nike-logo.svg";
import appleIcon from "@/public/images/apple-logo.svg";
import adidasIcon from "@/public/images/adidas-logo.svg";
import audiIcon from "@/public/images/audi-logo.svg";
import spotifyIcon from "@/public/images/spotify-logo.svg";
import footlocker from "@/public/images/footlocker-logo.svg";
import columbiaPics from "@/public/images/columbia-pictures-logo.svg";
import schmidts from "@/public/images/schmidts-logo.svg";
import panini from "@/public/images/panini-logo.svg";
import pTribune from "@/public/images/players-tribune-logo.svg";
import bReport from "@/public/images/bleacher-report-logo.svg";
import jimmyJ from "@/public/images/jimmy-johns-logo.svg";
import kotex from "@/public/images/kotex-u-logo.svg";

import oxo from "@/public/images/oxo-logo.svg";
import puma from "@/public/images/puma-logo.svg";
import uber from "@/public/images/uber-logo.svg";
import mcdonalds from "@/public/images/mcdonalds-logo.svg";
import tmobile from "@/public/images/t-mobile-logo.svg";
import jordan from "@/public/images/jordan-logo.svg";
import newBalance from "@/public/images/new-balance-logo.svg";
import facebook from "@/public/images/facebook-3-2.svg";
import cottonOn from "@/public/images/cotton-on-logo.svg";
import hearst from "@/public/images/hearst-logo.svg";
import fanatics from "@/public/images/fanatics-logo.svg";
import uninterrupted from "@/public/images/uninterrupted-logo.svg";
import celsius from "@/public/images/celsius-logo.svg";


export default function WorkedWith(): JSX.Element {
  return(
    <section id="worked-with" aria-labelledby="worked-with-title">
      <div id="worked-with-wrapper" className="wrapper">
        <div className="worked-with-content-container">
          <h2 id="worked-with-title">
            <span className="outline-text">
              WHO 
            </span> WE&apos;VE WORKED WITH
          </h2>
          <p className="style-paragraphs">
            SLASH has secured brand partnerships with 
            companies across several industries and 
            categories. Our clients have partnered with 
            national food chains, global car brands, 
            telecommunications companies, leading sportswear 
            brands, national retail brands, and the foremost 
            tech companies.
          </p>
        </div>
        <div 
          id="logo-slider-container"
          role="region"
          aria-label="carousel of brands SLASH has worked with"
          tabIndex={0}
        >
          <div className="brand-slideshow">
              <div className="logo-slider" role="list">
                <Image role="listitem" src={nikeIcon} alt="Nike" className="brand-icons" height={50} width={120}/>
                <Image role="listitem" src={footlocker} alt="Foot Locker" className="brand-icons" height={50} width={120}/>
                <Image role="listitem" src={columbiaPics} alt="Columbia Pictures" className="brand-icons" height={50} width={120}/>
                <Image role="listitem" src={appleIcon} alt="Apple" className="brand-icons" height={50} width={120}/>
                <Image role="listitem" src={spotifyIcon} alt="Spotify" className="brand-icons" height={50} width={120}/>
                <Image role="listitem" src={adidasIcon} alt="Adidas" className="brand-icons" height={50} width={120}/>
                <Image role="listitem" src={audiIcon} alt="Audi" className="brand-icons" height={50} width={120}/>
                <Image role="listitem" src={kotex} alt="U by Kotex" className="brand-icons" height={50} width={120}/>
                <Image role="listitem" src={bReport} alt="Bleacher Report" className="brand-icons" height={50} width={120}/>
                <Image role="listitem" src={jimmyJ} alt="Jimmy Johns" className="brand-icons" height={50} width={120}/>
                <Image role="listitem" src={pTribune} alt="Players Tribune" className="brand-icons" height={50} width={120}/>
                <Image role="listitem" src={celsius} alt="Celsius" className="brand-icons" height={50} width={120} />
                <Image role="listitem" src={schmidts} alt="Schmidts" className="brand-icons" height={50} width={120}/>
              </div>
              <div className="logo-slider" aria-hidden="true">
                <Image src={nikeIcon} alt="Nike" className="brand-icons" height={50} width={120}/>
                <Image src={footlocker} alt="Foot Locker" className="brand-icons" height={50} width={120}/>
                <Image src={columbiaPics} alt="Columbia Pictures" className="brand-icons" height={50} width={120}/>
                <Image src={appleIcon} alt="Apple" className="brand-icons" height={50} width={120}/>
                <Image src={spotifyIcon} alt="Spotify" className="brand-icons" height={50} width={120}/>
                <Image src={adidasIcon} alt="Adidas" className="brand-icons" height={50} width={120}/>
                <Image src={audiIcon} alt="Audi" className="brand-icons" height={50} width={120}/>
                <Image src={kotex} alt="U by Kotex" className="brand-icons" height={50} width={120}/>
                <Image src={bReport} alt="Bleacher Report" className="brand-icons" height={50} width={120}/>
                <Image src={jimmyJ} alt="Jimmy Johns" className="brand-icons" height={50} width={120}/>
                <Image src={pTribune} alt="Players Tribune" className="brand-icons" height={50} width={120}/>
                <Image src={celsius} alt="Celsius" className="brand-icons" height={50} width={120} />
                <Image src={schmidts} alt="Schmidts" className="brand-icons" height={50} width={120}/>
              </div>
          </div>
          <div className="brand-slideshow">
            <div className="logo-slider-two" role="list">
              <Image role="listitem" src={tmobile} alt="T-Mobile" className="brand-icons" height={50} width={120}/>
              <Image role="listitem" src={mcdonalds} alt="McDonalds" className="brand-icons" height={50} width={120}/>
              <Image role="listitem" src={fanatics} alt="Fanatics" className="brand-icons" height={50} width={120} />
              <Image role="listitem" src={puma} alt="Puma" className="brand-icons" height={50} width={120}/>
              <Image role="listitem" src={hearst} alt="Hearst Magazine" className="brand-icons" height={50} width={120} />
              <Image role="listitem" src={oxo} alt="OXO" className="brand-icons" height={50} width={120}/>
              <Image role="listitem" src={jordan} alt="Jordan" className="brand-icons" height={50} width={120}/>
              <Image role="listitem" src={panini} alt="Panini" className="brand-icons" height={50} width={120}/>
              <Image role="listitem" src={uninterrupted} alt="Uninterrupted" className="brand-icons" height={50} width={120} />
              <Image role="listitem" src={uber} alt="Uber" className="brand-icons" height={50} width={120}/>
              <Image role="listitem" src={facebook} alt="Facebook" className="brand-icons" height={50} width={120}/>
              <Image role="listitem" src={cottonOn} alt="Cotton On" className="brand-icons" height={50} width={120} />
              <Image role="listitem" src={newBalance} alt="New Balance" className="brand-icons" height={50} width={120}/>
            </div>
            <div className="logo-slider-two" aria-hidden="true">
              <Image src={tmobile} alt="T-Mobile" className="brand-icons" height={50} width={120}/>
              <Image src={mcdonalds} alt="McDonalds" className="brand-icons" height={50} width={120}/>
              <Image src={fanatics} alt="Fanatics" className="brand-icons" height={50} width={120}/>
              <Image src={puma} alt="Puma" className="brand-icons" height={50} width={120}/>
              <Image src={hearst} alt="Hearst Magazine" className="brand-icons" height={50} width={120}/>
              <Image src={oxo} alt="OXO" className="brand-icons" height={50} width={120}/>
              <Image src={jordan} alt="Jordan" className="brand-icons" height={50} width={120}/>
              <Image src={panini} alt="Panini" className="brand-icons" height={50} width={120}/>
              <Image src={uninterrupted} alt="Uninterrupted" className="brand-icons" height={50} width={120}/>
              <Image src={uber} alt="Uber" className="brand-icons" height={50} width={120}/>
              <Image src={facebook} alt="Facebook" className="brand-icons" height={50} width={120}/>
              <Image src={cottonOn} alt="Cotton On" className="brand-icons" height={50} width={120}/>
              <Image src={newBalance} alt="New Balance" className="brand-icons" height={50} width={120}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}