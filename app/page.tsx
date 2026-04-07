import Image from "next/image";
import Link from "next/link";
import slashUsLogo from "@/public/images/slash-us.png";
import slashIntlLogo from "@/public/images/slash-int.png";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";

export default function Home() {
  return (
    <main id="home-container">
      <Link id="slash-site-link" href={"/slash"}>
        <div className="slash-link-logo-wrapper">
          <div className="site-link-logo-container">
            <Image 
              src={slashUsLogo}
              alt="slash sports and entertainment logo"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading={"eager"}
              className={"slash-logo"}
            />
          </div>
        </div>
      </Link>

      <div className="free-space">
        <PiArrowLeft className="free-space-indicator-icons"/>
        <PiArrowRight className="free-space-indicator-icons"/>
      </div>

      <Link id="slashIntl-site-link" href={"/slashIntl"}>
        <div className="slashIntl-link-logo-wrapper">
          <div className="site-link-logo-container">
            <Image 
              src={slashIntlLogo}
              alt="slash sports and entertainment logo"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading={"eager"}
              className={"slashIntl-logo"}
            />
          </div>
        </div>
      </Link>
    </main>
  );
}