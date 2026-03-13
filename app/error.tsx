"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  useEffect(() => {
    console.error(error);
  }, [error]);

  return(
    <section id="error-page">
      <div id="error-page-wrapper" className="wrapper">
        <h1>Sorry, something <br/> went wrong...</h1>
        <button 
          className="error-page-btn"
          onClick={() => reset()}
          >
          Reset
        </button>
      </div>
    </section>
  )
}