import Hero from "@/components/home/Hero";
import Section2 from "@/components/home/Section2";
import Section3 from "@/components/home/Section3";
import "../../../public/css/home.css";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <Section2 />
        <Section3 />
        <Testimonials />
        <Section3 />
      </main>
    </div>
  );
}
