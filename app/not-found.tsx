import Link from "next/link";

export default function NotFound() {
  return(
    <section id="not-found">
      <div id="not-found-wrapper" className="wrapper">
        <h1>404 <br />Not Found</h1>
        <p>
          Sorry, the page you&apos;re looking for does not 
          exist or may have been moved.
        </p>
        <Link href="/">
          <button className="return-to-site-btn">
            Return to home
          </button>
        </Link>
      </div>
    </section>
  )
}