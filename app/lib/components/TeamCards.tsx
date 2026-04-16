"use client";
import { useEffect } from "react";
import Image from "next/image";
import cancel from "@/public/images/cancel.svg";
import type { JSX } from "react";
import { Person } from "@/app/types";
import BreakParagraphs from "./BreakParagraphs";

type TeamCardsProps = {
  person: Person;
}

export function TeamCards({person}: TeamCardsProps): JSX.Element {
  
  //Handle opening personal bios
  function handleBioClick(e: React.MouseEvent) {
    const target = e.currentTarget;
    const bioId = target.parentElement?.nextElementSibling as HTMLElement;
    if(bioId && !bioId.classList.contains("active")) {
      bioId.classList.add("active");
      target.setAttribute("aria-expanded", "true");

      bioId.setAttribute("tabindex", "-1");
      bioId.focus();
    }
  }

  // Handle closing personal bios
  function handleBioClose(e: React.MouseEvent) {
    const target = e.currentTarget;
    const closeBioBtn = target.parentElement?.parentElement;
    const openBioBtn = closeBioBtn?.previousElementSibling?.lastChild as HTMLButtonElement;
    
    if(closeBioBtn && closeBioBtn.classList.contains("active")) {
      closeBioBtn.classList.remove("active");
      openBioBtn?.setAttribute("aria-expanded", "false");
    }

    openBioBtn?.focus();
  }

  // Allow keyboard users to escape bio with esc button
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const activeBio = document.querySelector(".person-bio-container.active");
        const closeBtn = activeBio?.querySelector(".cancel") as HTMLButtonElement;
        closeBtn?.click(); // Triggers your handleBioClose logic
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return(
    <> 
      <div className="person-profile">
        <div className="person-image-container">
          <Image 
            src={person.image}
            alt={person.alt}
            fill
            className="person-image"
          />
        </div>
        <h3 className="person-name">
          <span className="person-first-name">{person.firstName}</span>
          <span className="person-last-name">{person.lastName}</span>
        </h3>
      </div>
      <div className="person-details">
        <span className="person-title">{person.title}</span>
        <span className="person-email">{person.email}</span>
        {<button 
          className={person.bio ? `bio-button` : "bio-button disabled"} 
          onClick={handleBioClick} 
          aria-controls={person.id} 
          aria-expanded="false"
          disabled={!person.bio}
        >
          {person.bio ? "VIEW BIO" : "SLASH"}
        </button>
        }
      </div>
      { person.bio &&
        <div 
          className="person-bio-container" 
          id={person.id}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`name-${person.id}`}
        >
        <div className="person-bio-info">
          <div className="bio-image-container">
            <Image 
              src={person.image}
              alt={person.alt}
              fill
              className="person-bio-image"
            />
          </div>
          <div className="person-bio-details">
            <span className="bio-full-name" id={`name-${person.id}`}>
              {person.firstName} {person.lastName}
            </span>
            <span className="bio-title">
              {person.title}
            </span>
          </div>
        </div>
        <article className="person-bio">
          <button 
            className="cancel" 
            onClick={handleBioClose} 
            aria-label="Close bio section"
          >
            <Image 
              src={cancel}
              alt=""
              height={30}
              width={30}
              className="cancel-bio"
            />
          </button>
          <BreakParagraphs>
            {person.bio}
          </BreakParagraphs>
        </article>
      </div>
      }
    </>
  )
}