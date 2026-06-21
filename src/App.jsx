import { useRef } from "react";
import "./App.css";
import ResumeData from "./store/Resume-Data-store";
import Navbar from "./Components/Navbar";
import HeroSectionContent from "./Components/HeroSectionContent";
import PersonalInfo from "./Components/PersonalInfo";
import Education from "./Components/Education";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";
import Experience from "./Components/Experience";
import ResumePreview from "./Components/ResumePreview";
import DownloadButton from "./Components/DownloadButton";
import Footer from "./Components/Footer";

function App() {
  const previewRef = useRef(null);

  return (
    <ResumeData>
      <div className="app-shell">
        <Navbar />

        <main className="container-xl py-4 py-lg-5">
          <section className="row align-items-end g-4 mb-4 mb-lg-5">
            <div className="col-lg-8">
              <HeroSectionContent />
            </div>
            <div className="col-lg-4">
              <div className="glass-card p-4 h-100">
                <p className="eyebrow mb-2">Product highlights</p>
                <h2 className="h5 fw-semibold text-dark mb-3">
                  Everything stays local while you build.
                </h2>
                <p className="text-secondary mb-0">
                  Your resume data auto-saves in the browser, so you can refresh,
                  revisit, and keep editing without losing progress.
                </p>
              </div>
            </div>
          </section>

          <section className="row g-4 align-items-start">
            <div className="col-12 col-lg-7">
              <div className="stack-gap">
                <PersonalInfo />
                <Education />
                <Skills />
                <Projects />
                <Experience />
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="position-sticky preview-sticky">
                <div className="d-flex justify-content-lg-end mb-3">
                  <DownloadButton previewRef={previewRef} />
                </div>
                <ResumePreview ref={previewRef} />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ResumeData>
  );
}

export default App;
