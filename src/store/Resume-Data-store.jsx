/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "resumeforge.resume-data.v2";

const createSampleResumeData = () => ({
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    summary: "",
  },
  education: {
    college: "",
    degree: "",
    branch: "",
    cgpa: "",
    year: "",
  },
  skills: [],
  projects: [],
  experience: [],
});

const normalizeProject = (project, index) => ({
  id: project?.id ?? Date.now() + index,
  projectName: project?.projectName ?? "",
  description: project?.description ?? "",
  technologies: project?.technologies ?? "",
  githubLink: project?.githubLink ?? "",
  liveDemoLink: project?.liveDemoLink ?? "",
});

const normalizeExperience = (experience, index) => ({
  id: experience?.id ?? Date.now() + index,
  companyName: experience?.companyName ?? "",
  role: experience?.role ?? "",
  duration: experience?.duration ?? "",
  description: experience?.description ?? "",
});

const mergeResumeData = (storedData) => {
  const sampleData = createSampleResumeData();

  if (!storedData || typeof storedData !== "object") {
    return sampleData;
  }

  return {
    personalInfo: {
      ...sampleData.personalInfo,
      ...(storedData.personalInfo ?? {}),
    },
    education: {
      ...sampleData.education,
      ...(storedData.education ?? {}),
    },
    skills: Array.isArray(storedData.skills)
      ? storedData.skills
      : sampleData.skills,
    projects: Array.isArray(storedData.projects)
      ? storedData.projects.map(normalizeProject)
      : sampleData.projects,
    experience: Array.isArray(storedData.experience)
      ? storedData.experience.map(normalizeExperience)
      : sampleData.experience,
  };
};

const loadResumeData = () => {
  if (typeof window === "undefined") {
    return createSampleResumeData();
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return createSampleResumeData();
    }

    return mergeResumeData(JSON.parse(storedValue));
  } catch {
    return createSampleResumeData();
  }
};

export const ResumeDataContext = createContext(null);

const ResumeData = ({ children }) => {
  const [resumeData, setResumeData] = useState(loadResumeData);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch {
      // Local storage can fail in private mode or restricted browsers.
    }
  }, [resumeData]);

  const updatePersonalInfo = (field, value) => {
    setResumeData((currentData) => ({
      ...currentData,
      personalInfo: {
        ...currentData.personalInfo,
        [field]: value,
      },
    }));
  };

  const updateEducation = (field, value) => {
    setResumeData((currentData) => ({
      ...currentData,
      education: {
        ...currentData.education,
        [field]: value,
      },
    }));
  };

  const addSkill = (skill) => {
    const trimmedSkill = skill.trim();

    if (!trimmedSkill) {
      return false;
    }

    if (
      resumeData.skills.some(
        (item) => item.toLowerCase() === trimmedSkill.toLowerCase(),
      )
    ) {
      return false;
    }

    setResumeData((currentData) => {
      return {
        ...currentData,
        skills: [...currentData.skills, trimmedSkill],
      };
    });

    return true;
  };

  const removeSkill = (skillToRemove) => {
    setResumeData((currentData) => ({
      ...currentData,
      skills: currentData.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const addProject = (project) => {
    setResumeData((currentData) => ({
      ...currentData,
      projects: [
        ...currentData.projects,
        {
          id: Date.now(),
          projectName: project.projectName.trim(),
          description: project.description.trim(),
          technologies: project.technologies.trim(),
          githubLink: project.githubLink.trim(),
          liveDemoLink: project.liveDemoLink.trim(),
        },
      ],
    }));
  };

  const removeProject = (projectId) => {
    setResumeData((currentData) => ({
      ...currentData,
      projects: currentData.projects.filter(
        (project) => project.id !== projectId,
      ),
    }));
  };

  const addExperience = (experience) => {
    setResumeData((currentData) => ({
      ...currentData,
      experience: [
        ...currentData.experience,
        {
          id: Date.now(),
          companyName: experience.companyName.trim(),
          role: experience.role.trim(),
          duration: experience.duration.trim(),
          description: experience.description.trim(),
        },
      ],
    }));
  };

  const removeExperience = (experienceId) => {
    setResumeData((currentData) => ({
      ...currentData,
      experience: currentData.experience.filter(
        (entry) => entry.id !== experienceId,
      ),
    }));
  };

  const value = {
    resumeData,
    setResumeData,
    updatePersonalInfo,
    updateEducation,
    addSkill,
    removeSkill,
    addProject,
    removeProject,
    addExperience,
    removeExperience,
  };

  return (
    <ResumeDataContext.Provider value={value}>
      {children}
    </ResumeDataContext.Provider>
  );
};

export const useResumeData = () => {
  const context = useContext(ResumeDataContext);

  if (!context) {
    throw new Error("useResumeData must be used inside ResumeData provider.");
  }

  return context;
};

export default ResumeData;
