import TestimonialsCards from "@/app/slashIntl/components/Testimonials/TestimonialsCards";
import TestimonialGrid from "@/app/slashIntl/components/Testimonials/TestimonialsGrid";

export default function Testimonials() {
  return(
    <section id="testimonials" aria-labelledby="testimonials-title">
      <div id="testimonials-wrapper" className="wrapper">
        <h2 id="testimonials-title">
          TESTIMONIALS
        </h2>
        <div className="testimonials-container">
          <TestimonialsCards />
          <TestimonialGrid />
        </div>
      </div>
    </section>
  )
}