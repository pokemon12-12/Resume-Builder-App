import { useState } from "react";
import { useResumeData } from "../store/Resume-Data-store";

const emptyProject = {
  projectName: "",
  description: "",
  technologies: "",
  githubLink: "",
  liveDemoLink: "",
};

const Projects = () => {
  const { resumeData, addProject, removeProject } = useResumeData();
  const [project, setProject] = useState(emptyProject);
  const [errors, setErrors] = useState({});

  const validateProject = () => {
    const nextErrors = {};

    if (!project.projectName.trim()) {
      nextErrors.projectName = "Project name is required.";
    }

    if (!project.description.trim()) {
      nextErrors.description = "Project description is required.";
    }

    if (!project.technologies.trim()) {
      nextErrors.technologies = "Technologies used are required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateProject()) {
      return;
    }

    addProject(project);
    setProject(emptyProject);
    setErrors({});
  };

  return (
    <section className="builder-card card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="eyebrow mb-1">Section 04</p>
            <h3 className="h5 fw-bold text-dark mb-0">Projects</h3>
          </div>
          <span className="badge rounded-pill text-bg-info-subtle text-info-emphasis">
            Multiple entries
          </span>
        </div>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label fw-semibold">Project Name</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.projectName ? "is-invalid" : ""}`}
              value={project.projectName}
              onChange={(event) =>
                setProject({ ...project, projectName: event.target.value })
              }
              placeholder="ResumeForge"
            />
            <div className="invalid-feedback">{errors.projectName}</div>
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              rows="3"
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              value={project.description}
              onChange={(event) =>
                setProject({ ...project, description: event.target.value })
              }
              placeholder="Describe the project's problem, approach, and impact."
            />
            <div className="invalid-feedback">{errors.description}</div>
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Technologies Used</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.technologies ? "is-invalid" : ""}`}
              value={project.technologies}
              onChange={(event) =>
                setProject({ ...project, technologies: event.target.value })
              }
              placeholder="React, Bootstrap, HTML, CSS"
            />
            <div className="invalid-feedback">{errors.technologies}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">GitHub Link</label>
            <input
              type="url"
              className="form-control form-control-lg"
              value={project.githubLink}
              onChange={(event) =>
                setProject({ ...project, githubLink: event.target.value })
              }
              placeholder="https://github.com/your-repo"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Live Demo Link</label>
            <input
              type="url"
              className="form-control form-control-lg"
              value={project.liveDemoLink}
              onChange={(event) =>
                setProject({ ...project, liveDemoLink: event.target.value })
              }
              placeholder="https://your-project.live"
            />
          </div>

          <div className="col-12 d-grid d-md-flex justify-content-md-end">
            <button className="btn btn-dark btn-lg px-4" type="submit">
              Add Project
            </button>
          </div>
        </form>

        <div className="mt-4 d-grid gap-3">
          {resumeData.projects.length > 0 ? (
            resumeData.projects.map((entry) => (
              <article key={entry.id} className="entry-card">
                <div className="d-flex justify-content-between gap-3">
                  <div>
                    <h4 className="h6 fw-bold mb-1">{entry.projectName}</h4>
                    <p className="text-secondary small mb-2">{entry.technologies}</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeProject(entry.id)}
                  >
                    Delete
                  </button>
                </div>
                <p className="mb-3 text-dark">{entry.description}</p>
                <div className="d-flex flex-wrap gap-2">
                  {entry.githubLink ? (
                    <a
                      href={entry.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-dark"
                    >
                      GitHub
                    </a>
                  ) : null}
                  {entry.liveDemoLink ? (
                    <a
                      href={entry.liveDemoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </article>
            ))
          ) : (
            <p className="text-secondary mb-0">Add at least one project to showcase your work.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
