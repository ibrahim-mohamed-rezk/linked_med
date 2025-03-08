import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import "../../../public/css/home.css";
import Testimonials from "@/components/home/Testimonials";
// import Map from "@/components/home/Map";
import MapImage from "@/components/home/MapImage";

export default function Home() {
  return (
    <div>
      <main className="w-full">
        <Hero />
        <About />
        <Services />
        <MapImage />
        {/* <Map /> */}
        <Testimonials />
      </main>
    </div>
  );
}
