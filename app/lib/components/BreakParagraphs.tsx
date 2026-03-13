import type { JSX } from "react";

type BreakParagraphsProps = {
  children: string;
}

export default function BreakParagraphs({ children }: BreakParagraphsProps): JSX.Element {

  if(!children || typeof children !== "string") {
    return(
      <></>
    );
  };
  
  const childrenSplit = children.split("//n//n");

  const breakUp = childrenSplit.map((paragraph: string, index: number) => {
    return(
      <p 
        className="break-paragraphs" 
        key={index}
      >
        {paragraph}
      </p>
    )
  });

  return(
    <>
      {breakUp}
    </>
  )
}