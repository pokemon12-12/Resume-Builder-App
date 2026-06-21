import { forwardRef } from "react";
import { useResumeData } from "../store/Resume-Data-store";

const normalizeLink = (value, type = "website") => {
  if (!value) {
    return "";
  }

  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("mailto:")) {
    return value;
  }

  if (type === "email") {
    return `mailto:${value}`;
  }

  return `https://${value}`;
};

const SectionTitle = ({ title }) => (
  <div className="resume-section-title">
    <h3 className="h6 text-uppercase fw-bold mb-0">{title}</h3>
  </div>
);

const ResumePreview = forwardRef(function ResumePreview(_, ref) {
  const { resumeData } = useResumeData();
  const { personalInfo, education, skills, projects, experience } = resumeData;

  return (
    <section className="preview-card card border-0 shadow-sm" ref={ref}>
      <div className="card-body p-4 p-lg-5 resume-page">
        <div className="preview-header mb-4">
          <p className="eyebrow mb-2">Live preview</p>
          <h2 className="display-6 fw-bold text-dark mb-2">
            {personalInfo.fullName || "Your Full Name"}
          </h2>
          <p className="text-secondary mb-3">
            {personalInfo.location || "Your location"} ·{" "}
            {personalInfo.phone || "Phone number"}
          </p>

          <div className="contact-line">
            {personalInfo.email ? (
              <a data-pdf-link href={normalizeLink(personalInfo.email, "email")}>
                {personalInfo.email}
              </a>
            ) : null}
            {personalInfo.linkedin ? (
              <a data-pdf-link href={normalizeLink(personalInfo.linkedin)}>
                LinkedIn
              </a>
            ) : null}
            {personalInfo.github ? (
              <a data-pdf-link href={normalizeLink(personalInfo.github)}>
                GitHub
              </a>
            ) : null}
          </div>
        </div>

        <section className="mb-4">
          <SectionTitle title="Professional Summary" />
          <p className="resume-body-text mb-0">
            {personalInfo.summary || "Write a short summary to introduce your profile."}
          </p>
        </section>

        <section className="mb-4">
          <SectionTitle title="Education" />
          <div className="resume-info-grid">
            <div>
              <p className="resume-label mb-1">College</p>
              <p className="mb-0 fw-semibold">{education.college || "College name"}</p>
            </div>
            <div>
              <p className="resume-label mb-1">Degree</p>
              <p className="mb-0 fw-semibold">{education.degree || "Degree"}</p>
            </div>
            <div>
              <p className="resume-label mb-1">Branch</p>
              <p className="mb-0 fw-semibold">{education.branch || "Branch"}</p>
            </div>
            <div>
              <p className="resume-label mb-1">CGPA</p>
              <p className="mb-0 fw-semibold">{education.cgpa || "0.00"}</p>
            </div>
            <div>
              <p className="resume-label mb-1">Graduation Year</p>
              <p className="mb-0 fw-semibold">{education.year || "Year"}</p>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <SectionTitle title="Skills" />
          <div className="d-flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <span key={skill} className="resume-skill-pill">
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-secondary mb-0">Add a few skills to fill this section.</p>
            )}
          </div>
        </section>

        <section className="mb-4">
          <SectionTitle title="Experience" />
          <div className="d-grid gap-3">
            {experience.length > 0 ? (
              experience.map((entry) => (
                <article key={entry.id} className="resume-entry">
                  <div className="d-flex justify-content-between gap-3 flex-wrap">
                    <div>
                      <h4 className="h6 fw-bold mb-1">{entry.role}</h4>
                      <p className="resume-label mb-0">{entry.companyName}</p>
                    </div>
                    <p className="resume-label mb-0">{entry.duration}</p>
                  </div>
                  <p className="mb-0 mt-2 resume-body-text">{entry.description}</p>
                </article>
              ))
            ) : (
              <p className="text-secondary mb-0">Add your experience to preview it here.</p>
            )}
          </div>
        </section>

        <section>
          <SectionTitle title="Projects" />
          <div className="d-grid gap-3">
            {projects.length > 0 ? (
              projects.map((project) => (
                <article key={project.id} className="resume-entry">
                  <div className="d-flex justify-content-between gap-3 flex-wrap">
                    <div>
                      <h4 className="h6 fw-bold mb-1">{project.projectName}</h4>
                      <p className="resume-label mb-0">{project.technologies}</p>
                    </div>
                  </div>
                  <p className="mb-2 mt-2 resume-body-text">{project.description}</p>
                  <div className="d-flex flex-wrap gap-2">
                    {project.githubLink ? (
                      <a
                        data-pdf-link
                        href={normalizeLink(project.githubLink)}
                        target="_blank"
                        rel="noreferrer"
                        className="resume-link-chip"
                      >
                        GitHub
                      </a>
                    ) : null}
                    {project.liveDemoLink ? (
                      <a
                        data-pdf-link
                        href={normalizeLink(project.liveDemoLink)}
                        target="_blank"
                        rel="noreferrer"
                        className="resume-link-chip"
                      >
                        Live Demo
                      </a>
                    ) : null}
                  </div>
                </article>
              ))
            ) : (
              <p className="text-secondary mb-0">Add projects to preview them here.</p>
            )}
          </div>
        </section>
      </div>
    </section>
  );
});

export default ResumePreview;
