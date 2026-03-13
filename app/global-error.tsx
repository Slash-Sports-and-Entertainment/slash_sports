"use client";
import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {

  useEffect(() => {
    console.error(error);
  }, [error]);

  return(
    <html>
      <body>
        <section id="global-error-page">
          <div 
            id="global-error-wrapper" 
            className="wrapper"
          >
            <h1>Sorry, something went wrong...</h1>
            <p>
              An unexpected error has occured in the site
            </p>
            <button 
              className="gloabl-error-btn"
              onClick={() => reset()}
            >
              Reset
            </button>
          </div>
        </section>
      </body>
    </html>
  )
}