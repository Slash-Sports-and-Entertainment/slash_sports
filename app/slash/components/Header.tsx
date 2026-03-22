"use client";
import {useState, useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import wordLogo from "@/public/images/slash-logo-orange.svg";
import cancelIcon from "@/public/images/cancel.svg";
import { FaInstagram } from "react-icons/fa";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  
  function dropDown(e: MouseEvent) {
    e.preventDefault();
    
    if(e.currentTarget.id === "hamburger-icon") {
      setIsNavOpen(true);
    } else if(e.currentTarget.id === "slash-navDrop-cancel") {
      setIsNavOpen(false);
    }
  }
  
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

  return(
    <header id="slash-header">
      <Link 
        href="/" 
        className="logo-container"
        aria-label="Go to home page"
      >
        <Image
          src={wordLogo}
          alt="SLASH company logo"
          className="logo-img"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="eager"
        />
      </Link>
      <nav>
        <Link 
          className="nav-socials" 
          href="https://www.instagram.com/slashsportsent/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaInstagram className="insta-icon"/>
        </Link>
        <ul id="hamburger-icon" onClick={dropDown}>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <div 
          ref={dropDownRef}
          className={`nav-dropdown ${isNavOpen ? "isActive" : "isHidden"}`}
        >
          <div className="dropdown-btn-container">
            <button 
              id="slash-navDrop-cancel" 
              onClick={dropDown}
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
            <Link href="/">
              <li className="header-links">Home</li>
            </Link>
            <Link href="#who-we-are">
              <li className="header-links">Who We Are</li>
            </Link>
            <Link href="#our-work">
              <li className="header-links">Our Work</li>
            </Link>
            <Link href="#worked-with">
              <li className="header-links">Worked With</li>
            </Link>
            <Link href="#nil">
              <li className="header-links">NIL</li>
            </Link>
            <Link href="#meet-team">
              <li className="header-links">Team</li>
            </Link>
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