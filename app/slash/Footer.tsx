"use client";
import Image from "next/image"
import Link from "next/link";
import slashLogo from "@/public/images/slash-logo-orange.svg";
import { FaInstagram } from "react-icons/fa";
import { PiArrowUpLight } from "react-icons/pi";
import { handleNavLinks } from "../lib/utils/handleNavLinks";

export default function Footer() {
  // Allow nav links to ignore page lock caused by useSectionLock hook
  const handleLinkClick = () => {
    handleNavLinks();
  };

  return(
    <footer role="contentinfo" aria-label="Page Footer">
      <h2 className="sr-only">Footer</h2>
      <div className="footer-wrapper">
        <Link 
          href="/" 
          aria-label="Go to home page"
          className="logo-container footer-logo-container"
        >
          <Image
            src={slashLogo}
            alt=""
            className="logo-img"
            fill
            loading="eager"
          />
        </Link>
        <div className="footer-icons">
          <Link 
            className="foot-socials" 
            href="https://www.instagram.com/slashsportsent/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Follow SLASH on Instagram" 
          >
            <FaInstagram className="insta-icon" aria-hidden="true"/>
          </Link>
          <Link 
            href="#" 
            className="jump-top-arrow-container"
            onClick={handleLinkClick}
            aria-label="Jump to top of page" 
          >
            <PiArrowUpLight className="footer-jump-top-arrow" aria-hidden="true"/>
          </Link>
        </div>
      </div>
    </footer>
  )
}