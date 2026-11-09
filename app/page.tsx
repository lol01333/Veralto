import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Method from "@/components/Method";
import Doctor from "@/components/Doctor";
import Booking from "@/components/Booking";
import Faq from "@/components/Faq";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main><Hero /><TrustBar /><Services /><Method /><Doctor /><Booking /><Faq /><Location /></main>
      <Footer />
      <MobileBar />
    </>
  );
}
