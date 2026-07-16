"use client";
import { useState } from "react";
import SecondaryNav from "../components/SecondaryNav";
import Image from "next/image";
import { GrNext, GrPrevious, GrClose } from "react-icons/gr";
import { eventProdImgs, slides, brandManageImgs, philanthropyImgs } from "@/app/data/off-court-media";

export default function OffTheCourt() {
  const [slideNum, setSlideNum] = useState(0);

  const mapEventProdImages = eventProdImgs.map((image: any) => {
    return(
      <Image
        key={image.id}
        src={image.src} 
        alt={image.alt}
        className="event-prod-images off-the-court-images"
        id={`event-prod-images-${image.id}`}
        placeholder="blur"
        onClick={enlargeImage}
        role="button"
        tabIndex={0}
        aria-label="View image larger"
      />
    )
  });

  const mapBrandManageImgs = brandManageImgs.map((image: any) => {
    return(
      <Image
        key={image.id}
        src={image.src} 
        alt={image.alt}
        id={`brand-manage-image-${image.id}`}
        className="brand-manage-images off-the-court-images"
        placeholder="blur"
        onClick={enlargeImage}
        role="button"
        tabIndex={0}
        aria-label="View image larger"
      />
    )
  });

  const mapPhilanthropyImgs = philanthropyImgs.map((image: any) => {
    return(
      <Image
        key={image.id}
        src={image.src} 
        alt={image.alt}
        id={`philanthropy-img-${image.id}`}
        className="philanthropy-images off-the-court-images"
        placeholder="blur"
        onClick={enlargeImage}
        role="button"
        tabIndex={0}
        aria-label="View image larger"
      />
    )
  });

  const carouselCount = slides.length > 0 && slides.map((slide: any, index: number) => {
    return(
      <div 
        className={`carousel-elipses ${slideNum === index ? "fill-elipse" : ""}`} 
        key={index}
      >
      </div>
    )
  });

  function prevSlide() {
    setSlideNum((prev) => {
      if(prev === 0) {
        return slides.length - 1;
      }
      return prev - 1;
    })
  };

  function nextSlide() {
    setSlideNum((prev) => {
      if(prev === slides.length - 1) {
        return 0;
      }
      return prev + 1;
    })
  };

  function enlargeImage(event: React.MouseEvent<HTMLImageElement>) {
    const currentImage = document.querySelector(`#${event.currentTarget.id}`);
    const closeBtn = currentImage?.parentElement?.querySelector(".close-enlarge-image");
    
    if(event.currentTarget.id) {
      currentImage?.classList.add("image-modal");
      closeBtn?.classList.add("active");
    }
  }

  function shrinkImage(event: React.MouseEvent<HTMLButtonElement>) {
    const closeBtnParent = event.currentTarget.parentElement
    const closeBtn = closeBtnParent?.querySelector(".close-enlarge-image");

    const imageClass = closeBtnParent?.querySelectorAll(`:scope > .off-the-court-images`);
    imageClass?.forEach((child) => {
      if(child.classList.contains("image-modal")) {
        child.classList.remove("image-modal");
        closeBtn?.classList.remove("active")
      }
    })
  }

  return(
    <main>
      <section id="off-the-court" aria-labelledby="off-the-court-title">

        <div id="off-the-court-wrapper" className="wrapper">
          
          <SecondaryNav />

          <div id="brand-management">
            <h2 id="brand-management-title">
              <span className="outline-text">
              BRAND
              </span> MANAGEMENT
            </h2>
            <p className="paragraphs">
              Strategic brand relationships designed 
              to elevate influence, expand reach, 
              and create long-term value. 
            </p>

            <div id="brand-management-img-container">
              {mapBrandManageImgs}

              <button 
                id="close-brand-manage-image"
                className="close-enlarge-image"
                onClick={shrinkImage}
              >
                <GrClose />
              </button>
            </div>

            <div id="brand-partnerships">
              <div className="partnerships-carousel">
                <div className="brand-ad-container">
                  <span 
                    id={`brand-ad-description-${slides[slideNum].id}`} 
                    className="brand-ad-description"
                  >
                    {slides[slideNum].description}
                  </span>
                  {slides[slideNum].type === "image" ? 
                    <div className="ad-img-container">
                      <Image 
                        key={`image-${slideNum}`}
                        src={slides[slideNum].media}
                        alt={`${slides[slideNum].alt}`}
                        id="brand-partnerships-img-1" 
                        className="brand-partnerships-images"
                        placeholder="blur"
                      /> 
                    </div> :
                    <div className="ad-vid-container">
                      <video 
                        key={`video-${slideNum}`}
                        width={600} 
                        height={400} 
                        id={`brand-partnerships-vid-${slides[slideNum].id}`}
                        className="brand-partnerships-vids"
                        preload="metadata"
                        controls
                        playsInline
                        poster={slides[slideNum].poster}
                        aria-label={`${slides[slideNum].alt}`}
                      >
                        <source src={`${slides[slideNum].media}`} type={slides[slideNum].format}/>
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  }

                  <button 
                    className="prev-slide"
                    onClick={() => prevSlide()}
                  >
                    <GrPrevious />
                  </button>
                  <button 
                    className="next-slide"
                    onClick={() => nextSlide()}
                  >
                    <GrNext />
                  </button>

                </div>
              </div>

              <div className="carousel-counter">
                {carouselCount}
              </div>
            </div>
          </div>

          <div id="philanthropy">
            <h2 id="philanthropy-title">
              PHILANTHROPY
            </h2>
            <p className="paragraphs">
              Purpose-driven initiatives that 
              create meaningful impact while 
              building an enduring legacy. 
            </p>
            <div id="philanthropy-img-container">
              {mapPhilanthropyImgs}

              <button 
                id="close-philanthropy-image"
                className="close-enlarge-image"
                onClick={shrinkImage}
              >
                <GrClose />
              </button>
            </div>
          </div>
          

          <div id="global-partnerships">
            <h2 id="global-partnerships-title">
              <span className="outline-text">
                GLOBAL
              </span> PARTNERSHIPS
            </h2>
            <p className="paragraphs">
              Global relationships that unlock 
              strategic opportunities across sports, 
              business, and culture. 
            </p>
            <div className="global-partnerships-vid-container">
              <video 
                width={600} 
                height={400} 
                id={`global-partnerships-vid-1}`}
                className="global-partnerships-vids"
                preload="metadata"
                loop
                controls
                poster="/images/kawhi-global-poster.png"
                playsInline
                aria-label="Video of Kawhi at event in Asia"
              >
                <source src="/videos/kawhi-global.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          <div id="event-production">
            <h2 id="event-production-title">
              <span className="outline-text">
                EVENT
              </span> PRODUCTION
            </h2>
            <p className="paragraphs">
              We conceptualize and produce 
              premium experiences at the 
              intersection of sports, 
              entertainment, and culture, 
              delivering seamless execution for 
              clients and brands from concept to 
              completion. 
            </p>
            <div id="event-prod-img-container">
              {mapEventProdImages}

              <button 
                id="close-event-prod-image"
                className="close-enlarge-image"
                onClick={shrinkImage}
              >
                <GrClose />
              </button>

            </div>
          </div>
        </div>

      </section>
    </main>
  )
}