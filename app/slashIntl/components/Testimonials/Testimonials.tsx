import TestimonialsCards from "@/app/slashIntl/components/Testimonials/TestimonialsCards";
import TestimonialGrid from "@/app/slashIntl/components/Testimonials/TestimonialsGrid";

export default function Testimonials() {
  return(
    <section id="testimonials">
      <div id="testimonials-wrapper" className="wrapper">
        <h1>
          TESTIMONIALS
        </h1>
        <div className="testimonials-container">
          <TestimonialsCards />
          <TestimonialGrid />
        </div>
      </div>
    </section>
  )
}