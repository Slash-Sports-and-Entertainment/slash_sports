import { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function SlashIntlLayout({ children }: {children: ReactNode}) {
  return(
    <main id="slashIntl-container">
      <Header />
        {children}
      <Footer />
    </main>
  )
}