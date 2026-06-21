import { useContext, useState, createContext } from "react";

export const ResumeDataContext = createContext({
  //this is the consumer of the data
});
const ResumeData = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
    },

    education: {
      college: "",
      degree: "",
      cgpa: "",
      year: "",
    },

    skills: [],

    projects: [],

    experience: [],
  });
  return (
    <ResumeDataContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeDataContext.Provider>
  );
};

export default ResumeData;
