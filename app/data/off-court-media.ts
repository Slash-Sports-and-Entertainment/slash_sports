import baduClose from "@/public/images/kawhi-event-badu-close.png";
import baduCrowd from "@/public/images/kawhi-event-badu-crowd.png";
import hoopPoetry from "@/public/images/kawhi-event-hp.png";
import wale from "@/public/images/kawhi-event-wale.png";
import tehinaTMOB from "@/public/images/tehina-tmobile.jpg";
import kawhiFashion from "@/public/images/kawhi-fashion.png";
import kawhiFashion2 from "@/public/images/kawhi-fashion-2.png";
import kawhiGOAKids from "@/public/images/kawhi-goa-kids.png";
import kawhiGOASelf from "@/public/images/kawhi-goa-self.png";
import kawhiGOABall from "@/public/images/kawhi-goa-ball.png";
import { VideoSlide, ImageSlide } from "../types";

type SlideItem = ImageSlide | VideoSlide;

export const slides: SlideItem[] = [
    {
      id: "aflac",
      description: "Te-Hina Paopao x AFLAC",
      media: "/videos/tehina-aflac.mp4",
      type: "video",
      poster: "/images/tehina-aflac-poster.png",
      alt: "Ad with Te-Hina Paopao and AFLAC",
      format: "video/mp4"
    },
    {
      id: "tmobile",
      description: "Te-Hina Paopao x T-Mobile",
      media: tehinaTMOB,
      type: "image",
      alt: "Te-Hina Paopao at T-Mobile event"
    },
    {
      id: "cottonon",
      description: "Trey Kell x Cotton On",
      media: "/videos/trey-kell-ad.mp4",
      type: "video",
      poster: "/images/trey-kell-cottonon-poster.png",
      alt: "Cotton On video ad with SLASH athlete Trey Kell",
      format: "video/mp4"
    },
    {
      id: "psd",
      description: "Dylan McGhee, Devin Mitchell, Kevin Keshishyan x PSD/7-Eleven",
      media: "/videos/psd-seven-eleven.mp4",
      type: "video",
      poster: "/images/psd-poster.png",
      alt: "A PSD underwear advertisement with SLASH athletes Dylan McGhee, Devin Mitchell, Kevin Keshishyan",
      format: "video/mp4"
    }
  ]

  
  export const eventProdImgs = [
    {
      id: 1,
      src: wale,
      alt: "Rapper Wale performing in front of crowd",
    },
    {
      id: 2,
      src: baduCrowd,
      alt: "Singer Eryka Badu performing in front of crowd",
    },
    {
      id: 3,
      src: baduClose,
      alt: "Singer Eryka Badu close up shot",
    },
    {
      id: 4,
      src: hoopPoetry,
      alt: "Image of ipad reading hoop poetry",
    },
  ]

  export const brandManageImgs = [
    {
      id: 1,
      src: kawhiFashion,
      alt: "Kawhi Leonard at event",
    },
    {
      id: 2,
      src: kawhiFashion2,
      alt: "Kawhi Leonard at event",
    },
  ]

  export const philanthropyImgs = [
    {
      id: 1,
      src: kawhiGOAKids,
      alt: "Kawhi at Giants of Africa event",
    },
    {
      id: 2,
      src: kawhiGOABall,
      alt: "Kawhi at Giants of Africa event",
    },
    {
      id: 3,
      src: kawhiGOASelf,
      alt: "Kawhi at Giants of Africa event",
    },
  ]