import Image from "next/image"
import Link from "next/link";
import slashLogo from "@/public/images/slash-logo-orange.svg";
import { FaInstagram } from "react-icons/fa";
import { PiArrowUpLight } from "react-icons/pi";

export default function Footer() {
  return(
    <footer>
      <div className="footer-wrapper">
        <Link 
          href="/" 
          aria-label="Go to home page"
          className="logo-container footer-logo-container"
        >
          <Image
            src={slashLogo}
            alt="SLASH company logo"
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
            >
            <FaInstagram className="insta-icon"/>
          </Link>
          <Link 
            href="#" 
            className="jump-top-arrow-container"
            >
            <PiArrowUpLight className="footer-jump-top-arrow"/>
          </Link>
        </div>
      </div>
    </footer>
  )
}