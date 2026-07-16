"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiArrowLongLeft } from "react-icons/hi2";

export default function SecondaryNav() {
  const pathName = usePathname();

  return(
    <div id="secondary-nav">
      <Link id="return-link" href="/slash#our-work"> <HiArrowLongLeft className="return-arrow"/> Back to Our Work</Link>
      <div id="secondary-nav-btn-container">
        <Link 
          href={"/slash/on-the-court"}
          id="on-the-court-btn" 
          className={pathName === "/slash/on-the-court" ? "highlight" : "plain"}
          role="button"
          tabIndex={0}
          aria-label="link to on the court page"
        > 
          On The Court
        </Link>
        <Link 
          href={"/slash/off-the-court"}
          id="off-the-court-btn" 
          className={pathName === "/slash/off-the-court" ? "highlight" : "plain"}role="button"
          tabIndex={0}
          aria-label="link to off the court page"
        > 
          Off The Court
        </Link>
      </div>
    </div>
  )
}