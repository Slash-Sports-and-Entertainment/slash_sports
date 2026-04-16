"use client";
import {useState, useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import wordLogo from "@/public/images/slash-logo-orange.svg";
import cancelIcon from "@/public/images/cancel.svg";
import { FaInstagram } from "react-icons/fa";
import { handleNavLinks } from "@/app/lib/utils/handleNavLinks";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Nav drop down/slideout
  function dropDown(e: MouseEvent) {
    e.preventDefault();
    
    if(e.currentTarget.id === "hamburger-icon") {
      setIsNavOpen(true);
    } else if(e.currentTarget.id === "slash-navDrop-cancel") {
      setIsNavOpen(false);
      hamburgerRef.current?.focus();
    }
  }
  

  // Escape click on open nav drop down closes drop down
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if(e.key === "Escape" && isNavOpen) {
        setIsNavOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    if(isNavOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    }
  }, [isNavOpen]);


  // Click outside of nav dropdown to close it
  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {    
      if(isNavOpen && dropDownRef.current && !dropDownRef.current.contains(e.target as HTMLElement)) {
        setIsNavOpen(false);
      }
  
      if((e.target as HTMLElement).classList.contains("header-links")) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return() => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [isNavOpen]);


  // Allow nav links to ignore page lock caused by useSectionLock hook
  const handleLinkClick = () => {
    handleNavLinks();
    setIsNavOpen(false);
  };

  return(
    <header id="slash-header">
      <Link 
        href="/" 
        className="logo-container"
        aria-label="Go to home page"
      >
        <Image
          src={wordLogo}
          alt=""
          className="logo-img"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="eager"
        />
      </Link>
      <nav aria-label="Main Navigation">
        <Link 
          className="nav-socials" 
          href="https://www.instagram.com/slashsportsent/" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Follow SLASH on Instagram" 
        >
          <FaInstagram className="insta-icon" aria-hidden="true"/>
        </Link>
        <button
          ref={hamburgerRef} 
          id="hamburger-icon" 
          onClick={dropDown}
          aria-expanded={isNavOpen}
          aria-controls="nav-dropdown-menu"
          aria-label="Open navigation menu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>

        <div 
          id="nav-dropdown-menu"
          ref={dropDownRef}
          className={`nav-dropdown ${isNavOpen ? "isActive" : "isHidden"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          <div className="dropdown-btn-container">
            <button 
              id="slash-navDrop-cancel" 
              onClick={dropDown}
              aria-label="Close navigation menu"
            >
              <Image 
                src={cancelIcon}
                alt="cancel dropdown menu"
                width={20}
                height={20}
                className="cancel-btn"
              />
            </button>
          </div>

          <ul className="header-nav">
            <li className="header-links">
              <Link href="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li className="header-links">
              <Link href="#who-we-are" onClick={handleLinkClick}>
                Who We Are
              </Link>
            </li>
            <li className="header-links">
              <Link href="#our-work" onClick={handleLinkClick}>
                Our Work
              </Link>
            </li>
            <li className="header-links">
              <Link href="#worked-with" onClick={handleLinkClick}>
                Worked With
              </Link>
            </li>
            <li className="header-links">
              <Link href="#nil" onClick={handleLinkClick}>
                NIL
              </Link>
            </li>
            <li className="header-links">
              <Link href="#meet-team" onClick={handleLinkClick}>
                Team
              </Link>
            </li>
          </ul>
          <Link 
            className="nav-socials" 
            href="https://www.instagram.com/slashsportsent/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaInstagram className="insta-icon"/>
          </Link>
        </div>
      </nav>
    </header>
  )
}