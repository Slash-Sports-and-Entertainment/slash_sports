import { RefObject } from "react";
import type { StaticImport, StaticImageData } from "next/dist/shared/lib/get-img-props";

export type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>

export type Person = {
  id: string
  firstName: string
  lastName: string
  title: string
  email: string | null
  image: string | StaticImport
  alt: string
  bio: string | null
};

export type Testimonial = {
  name: string
  title: string
  quote: string
  image: StaticImport
}

export type HorizontalScrollReturn = {
  slideContainerRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLDivElement | null>;
  progress: number;
  isSectionVisible: boolean;
}

export type ImageSlide = {
  id: string;
  description: string;
  media: StaticImageData;
  type: "image";
  alt: string;
}

export type VideoSlide = {
  id: string;
  description: string;
  media: string;
  type: "video";
  poster: string;
  alt: string;
  format: string;
}