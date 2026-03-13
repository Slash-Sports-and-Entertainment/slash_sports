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
    const bioId = target.parentElement?.nextElementSibling;
    if(bioId && !bioId.classList.contains("active")) {
      bioId.classList.add("active");
      target.setAttribute("aria-expanded", "true");
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
  }

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
        <div className="person-name">
          <span className="person-first-name">{person.firstName}</span>
          <span className="person-last-name">{person.lastName}</span>
        </div>
      </div>
      <div className="person-details">
        <span className="person-title">{person.title}</span>
        <span className="person-email">{person.email}</span>
        {<button 
          className={person.bio ? `bio-button` : "bio-button disabled"} 
          onClick={handleBioClick} 
          aria-controls={person.id} 
          aria-expanded="false"
        >
          {person.bio ? "VIEW BIO" : "SLASH"}
        </button>
        }
      </div>
      { person.bio &&
        <div className="person-bio-container" id={person.id}>
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
            <span className="bio-full-name">
              {person.firstName} {person.lastName}
            </span>
            <span className="bio-title">
              {person.title}
            </span>
          </div>
        </div>
        <article className="person-bio">
          <button className="cancel" onClick={handleBioClose} aria-label="Close bio section">
            <Image 
              src={cancel}
              alt="Cancel button to close bio section"
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

// export function TeamCards({children}: TeamCardsProps): JSX.Element {
//   if(!Array.isArray(children)) {
//     return(
//       <></>
//     )
//   }
//   const teamCards = children.map((person: Person, index: number) => {

//     // Handle opening personal bios
//     function handleBioClick(e: React.MouseEvent) {
//       const target = e.currentTarget;
//       const bioId = target.parentElement?.nextElementSibling;
//       if(bioId && !bioId.classList.contains("active")) {
//         bioId.classList.add("active");
//         target.setAttribute("aria-expanded", "true");
//       }
//     }

//     // Handle closing personal bios
//     function handleBioClose(e: React.MouseEvent) {
//       const target = e.currentTarget;
//       const closeBioBtn = target.parentElement?.parentElement;
//       const openBioBtn = closeBioBtn?.previousElementSibling?.lastChild as HTMLButtonElement;
      
//       if(closeBioBtn && closeBioBtn.classList.contains("active")) {
//         closeBioBtn.classList.remove("active");
//         openBioBtn?.setAttribute("aria-expanded", "false");
//       }
//     }

//     return(
//       <> 
//         <div className="person-profile">
//           <div className="person-image-container">
//             <Image 
//               src={person.image}
//               alt={person.alt}
//               fill
//               className="person-image"
//             />
//           </div>
//           <div className="person-name">
//             <span className="person-first-name">{person.firstName}</span>
//             <span className="person-last-name">{person.lastName}</span>
//           </div>
//         </div>
//         <div className="person-details">
//           <span className="person-title">{person.title}</span>
//           <span className="person-email">{person.email}</span>
//           {<button 
//             className={person.bio ? `bio-button` : "bio-button disabled"} 
//             onClick={handleBioClick} 
//             aria-controls={person.id} 
//             aria-expanded="false"
//           >
//             {person.bio ? "VIEW BIO" : "SLASH"}
//           </button>
//           }
//         </div>
//         { person.bio &&
//           <div className="person-bio-container" id={person.id}>
//           <div className="person-bio-info">
//             <div className="bio-image-container">
//               <Image 
//                 src={person.image}
//                 alt={person.alt}
//                 fill
//                 className="person-bio-image"
//               />
//             </div>
//             <div className="person-bio-details">
//               <span className="bio-full-name">
//                 {person.firstName} {person.lastName}
//               </span>
//               <span className="bio-title">
//                 {person.title}
//               </span>
//             </div>
//           </div>
//           <article className="person-bio">
//             <button className="cancel" onClick={handleBioClose} aria-label="Close bio section">
//               <Image 
//                 src={cancel}
//                 alt="Cancel button to close bio section"
//                 height={30}
//                 width={30}
//                 className="cancel-bio"
//               />
//             </button>
//             <BreakParagraphs>
//               {person.bio}
//             </BreakParagraphs>
//           </article>
//         </div>
//         }
//       </>
//     )
//   });
// }