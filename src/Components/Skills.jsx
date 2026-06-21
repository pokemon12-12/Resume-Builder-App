import { useState } from "react";
import { useResumeData } from "../store/Resume-Data-store";

const Skills = () => {
  const { resumeData, addSkill, removeSkill } = useResumeData();
  const [skill, setSkill] = useState("");
  const [message, setMessage] = useState("");

  const handleAddSkill = (event) => {
    event.preventDefault();

    const trimmedSkill = skill.trim();

    if (!trimmedSkill) {
      setMessage("Please enter a skill before adding it.");
      return;
    }

    const added = addSkill(trimmedSkill);

    if (!added) {
      setMessage("That skill already exists.");
      return;
    }

    setSkill("");
    setMessage("");
  };

  return (
    <section className="builder-card card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="eyebrow mb-1">Section 03</p>
            <h3 className="h5 fw-bold text-dark mb-0">Skills</h3>
          </div>
          <span className="badge rounded-pill text-bg-warning-subtle text-warning-emphasis">
            Tags
          </span>
        </div>

        <form className="row g-2 align-items-start" onSubmit={handleAddSkill}>
          <div className="col-md-8">
            <label className="form-label fw-semibold">Add Skill</label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={skill}
              onChange={(event) => {
                setSkill(event.target.value);
                setMessage("");
              }}
              placeholder="Type a skill and press Add"
            />
          </div>
          <div className="col-md-4 d-grid">
            <label className="form-label opacity-0">Add</label>
            <button className="btn btn-dark btn-lg" type="submit">
              Add Skill
            </button>
          </div>
        </form>

        {message ? <p className="text-danger small mt-2 mb-0">{message}</p> : null}

        <div className="skill-badges mt-4">
          {resumeData.skills.length > 0 ? (
            resumeData.skills.map((item) => (
              <span key={item} className="skill-pill badge rounded-pill text-bg-dark">
                {item}
                <button
                  type="button"
                  className="btn-close btn-close-white ms-2 shadow-none"
                  aria-label={`Remove ${item}`}
                  onClick={() => removeSkill(item)}
                />
              </span>
            ))
          ) : (
            <p className="text-secondary mb-0">Add skills to display them as tags.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
