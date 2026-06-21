import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ResumeData from "./store/Resume-Data-store";
import Navbar from "./Components/Navbar";
import HeroSectionContent from "./Components/HeroSectionContent";
import SampleImg from "./Components/SampleImg";
import Footer from "./Footer";

function App() {
  
  return (
    <>
      <ResumeData>
        <section className="AppWraper">
          <Navbar />
         <HeroSectionContent/>
         <Footer/>
        </section>
      </ResumeData>
    </>
  );
}

export default App;
