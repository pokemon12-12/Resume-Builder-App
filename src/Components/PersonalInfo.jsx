import { useMemo, useState } from "react";
import { useResumeData } from "../store/Resume-Data-store";

const PersonalInfo = () => {
  const { resumeData, updatePersonalInfo } = useResumeData();
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const info = resumeData.personalInfo;

    return {
      fullName: !info.fullName.trim() ? "Full name is required." : "",
      email: !info.email.trim()
        ? "Email is required."
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)
          ? ""
          : "Enter a valid email address.",
      phone: !info.phone.trim()
        ? "Phone number is required."
        : info.phone.replace(/\D/g, "").length < 7
          ? "Enter a valid phone number."
          : "",
      location: !info.location.trim() ? "Location is required." : "",
      linkedin: !info.linkedin.trim() ? "LinkedIn profile is required." : "",
      github: !info.github.trim() ? "GitHub profile is required." : "",
      summary:
        info.summary.trim().length < 30
          ? "Add a summary with at least 30 characters."
          : "",
    };
  }, [resumeData.personalInfo]);

  const handleBlur = (field) => {
    setTouched((current) => ({
      ...current,
      [field]: true,
    }));
  };

  const showError = (field) => touched[field] && errors[field];

  return (
    <section className="builder-card card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="eyebrow mb-1">Section 01</p>
            <h3 className="h5 fw-bold text-dark mb-0">Personal Information</h3>
          </div>
          <span className="badge rounded-pill text-bg-primary-subtle text-primary">
            Required
          </span>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className={`form-control form-control-lg ${showError("fullName") ? "is-invalid" : ""}`}
              value={resumeData.personalInfo.fullName}
              onChange={(event) =>
                updatePersonalInfo("fullName", event.target.value)
              }
              onBlur={() => handleBlur("fullName")}
              placeholder="Enter you Full name"
            />
            <div className="invalid-feedback">{errors.fullName}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className={`form-control form-control-lg ${showError("email") ? "is-invalid" : ""}`}
              value={resumeData.personalInfo.email}
              onChange={(event) =>
                updatePersonalInfo("email", event.target.value)
              }
              onBlur={() => handleBlur("email")}
              placeholder="you@example.com"
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Phone Number</label>
            <input
              type="text"
              className={`form-control form-control-lg ${showError("phone") ? "is-invalid" : ""}`}
              value={resumeData.personalInfo.phone}
              onChange={(event) =>
                updatePersonalInfo("phone", event.target.value)
              }
              onBlur={() => handleBlur("phone")}
              placeholder="+91 98765 43..."
            />
            <div className="invalid-feedback">{errors.phone}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Location</label>
            <input
              type="text"
              className={`form-control form-control-lg ${showError("location") ? "is-invalid" : ""}`}
              value={resumeData.personalInfo.location}
              onChange={(event) =>
                updatePersonalInfo("location", event.target.value)
              }
              onBlur={() => handleBlur("location")}
              placeholder="Ahmedabad, India"
            />
            <div className="invalid-feedback">{errors.location}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">LinkedIn</label>
            <input
              type="text"
              className={`form-control form-control-lg ${showError("linkedin") ? "is-invalid" : ""}`}
              value={resumeData.personalInfo.linkedin}
              onChange={(event) =>
                updatePersonalInfo("linkedin", event.target.value)
              }
              onBlur={() => handleBlur("linkedin")}
              placeholder="linkedin.com/in/your-name"
            />
            <div className="invalid-feedback">{errors.linkedin}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">GitHub</label>
            <input
              type="text"
              className={`form-control form-control-lg ${showError("github") ? "is-invalid" : ""}`}
              value={resumeData.personalInfo.github}
              onChange={(event) =>
                updatePersonalInfo("github", event.target.value)
              }
              onBlur={() => handleBlur("github")}
              placeholder="github.com/your-name"
            />
            <div className="invalid-feedback">{errors.github}</div>
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">
              Professional Summary
            </label>
            <textarea
              rows="4"
              className={`form-control ${showError("summary") ? "is-invalid" : ""}`}
              value={resumeData.personalInfo.summary}
              onChange={(event) =>
                updatePersonalInfo("summary", event.target.value)
              }
              onBlur={() => handleBlur("summary")}
              placeholder="Write a concise summary about your strengths, experience, and goals."
            />
            <div className="invalid-feedback">{errors.summary}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfo;
