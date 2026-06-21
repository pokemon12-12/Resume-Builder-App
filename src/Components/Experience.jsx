import { useState } from "react";
import { useResumeData } from "../store/Resume-Data-store";

const emptyExperience = {
  companyName: "",
  role: "",
  duration: "",
  description: "",
};

const Experience = () => {
  const { resumeData, addExperience, removeExperience } = useResumeData();
  const [experience, setExperience] = useState(emptyExperience);
  const [errors, setErrors] = useState({});

  const validateExperience = () => {
    const nextErrors = {};

    if (!experience.companyName.trim()) {
      nextErrors.companyName = "Company name is required.";
    }

    if (!experience.role.trim()) {
      nextErrors.role = "Role is required.";
    }

    if (!experience.duration.trim()) {
      nextErrors.duration = "Duration is required.";
    }

    if (!experience.description.trim()) {
      nextErrors.description = "Description is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateExperience()) {
      return;
    }

    addExperience(experience);
    setExperience(emptyExperience);
    setErrors({});
  };

  return (
    <section className="builder-card card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="eyebrow mb-1">Section 05</p>
            <h3 className="h5 fw-bold text-dark mb-0">Experience</h3>
          </div>
          <span className="badge rounded-pill text-bg-secondary-subtle text-secondary-emphasis">
            Multiple entries
          </span>
        </div>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label fw-semibold">Company Name</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.companyName ? "is-invalid" : ""}`}
              value={experience.companyName}
              onChange={(event) =>
                setExperience({ ...experience, companyName: event.target.value })
              }
              placeholder="Digital Labs"
            />
            <div className="invalid-feedback">{errors.companyName}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Role</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.role ? "is-invalid" : ""}`}
              value={experience.role}
              onChange={(event) => setExperience({ ...experience, role: event.target.value })}
              placeholder="Frontend Intern"
            />
            <div className="invalid-feedback">{errors.role}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Duration</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.duration ? "is-invalid" : ""}`}
              value={experience.duration}
              onChange={(event) =>
                setExperience({ ...experience, duration: event.target.value })
              }
              placeholder="Jan 2025 - Present"
            />
            <div className="invalid-feedback">{errors.duration}</div>
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              rows="3"
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              value={experience.description}
              onChange={(event) =>
                setExperience({ ...experience, description: event.target.value })
              }
              placeholder="Summarize your achievements and responsibilities."
            />
            <div className="invalid-feedback">{errors.description}</div>
          </div>

          <div className="col-12 d-grid d-md-flex justify-content-md-end">
            <button className="btn btn-dark btn-lg px-4" type="submit">
              Add Experience
            </button>
          </div>
        </form>

        <div className="mt-4 d-grid gap-3">
          {resumeData.experience.length > 0 ? (
            resumeData.experience.map((entry) => (
              <article key={entry.id} className="entry-card">
                <div className="d-flex justify-content-between gap-3">
                  <div>
                    <h4 className="h6 fw-bold mb-1">
                      {entry.role} - {entry.companyName}
                    </h4>
                    <p className="text-secondary small mb-2">{entry.duration}</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeExperience(entry.id)}
                  >
                    Delete
                  </button>
                </div>
                <p className="mb-0 text-dark">{entry.description}</p>
              </article>
            ))
          ) : (
            <p className="text-secondary mb-0">
              Add at least one experience entry to strengthen the resume.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
