import { useMemo, useState } from "react";
import { useResumeData } from "../store/Resume-Data-store";

const Education = () => {
  const { resumeData, updateEducation } = useResumeData();
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const education = resumeData.education;

    return {
      college: !education.college.trim() ? "College name is required." : "",
      degree: !education.degree.trim() ? "Degree is required." : "",
      branch: !education.branch.trim() ? "Branch is required." : "",
      cgpa: !education.cgpa.trim() ? "CGPA is required." : "",
      year: !education.year.trim() ? "Graduation year is required." : "",
    };
  }, [resumeData.education]);

  const showError = (field) => touched[field] && errors[field];

  const handleBlur = (field) => {
    setTouched((current) => ({
      ...current,
      [field]: true,
    }));
  };

  return (
    <section className="builder-card card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="eyebrow mb-1">Section 02</p>
            <h3 className="h5 fw-bold text-dark mb-0">Education</h3>
          </div>
          <span className="badge rounded-pill text-bg-success-subtle text-success">
            Academic details
          </span>
        </div>

        <div className="row g-3">
          <div className="col-12">
            <label className="form-label fw-semibold">College Name</label>
            <input
              type="text"
              className={`form-control form-control-lg ${showError("college") ? "is-invalid" : ""}`}
              value={resumeData.education.college}
              onChange={(event) => updateEducation("college", event.target.value)}
              onBlur={() => handleBlur("college")}
              placeholder="Gujarat Technological University"
            />
            <div className="invalid-feedback">{errors.college}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Degree</label>
            <input
              type="text"
              className={`form-control form-control-lg ${showError("degree") ? "is-invalid" : ""}`}
              value={resumeData.education.degree}
              onChange={(event) => updateEducation("degree", event.target.value)}
              onBlur={() => handleBlur("degree")}
              placeholder="Bachelor of Engineering"
            />
            <div className="invalid-feedback">{errors.degree}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Branch</label>
            <input
              type="text"
              className={`form-control form-control-lg ${showError("branch") ? "is-invalid" : ""}`}
              value={resumeData.education.branch}
              onChange={(event) => updateEducation("branch", event.target.value)}
              onBlur={() => handleBlur("branch")}
              placeholder="Computer Engineering"
            />
            <div className="invalid-feedback">{errors.branch}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">CGPA</label>
            <input
              type="text"
              className={`form-control form-control-lg ${showError("cgpa") ? "is-invalid" : ""}`}
              value={resumeData.education.cgpa}
              onChange={(event) => updateEducation("cgpa", event.target.value)}
              onBlur={() => handleBlur("cgpa")}
              placeholder="8.72"
            />
            <div className="invalid-feedback">{errors.cgpa}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Graduation Year</label>
            <input
              type="text"
              className={`form-control form-control-lg ${showError("year") ? "is-invalid" : ""}`}
              value={resumeData.education.year}
              onChange={(event) => updateEducation("year", event.target.value)}
              onBlur={() => handleBlur("year")}
              placeholder="2026"
            />
            <div className="invalid-feedback">{errors.year}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
