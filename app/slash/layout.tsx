import { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./Footer";

export default function SlashLayout({ children }: {children: ReactNode}) {
  return(
    <main id="slash-container">
      <Header />
      {children}
      <Footer />
    </main>
  )
}