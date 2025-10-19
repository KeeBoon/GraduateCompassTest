import React, { useState } from "react";
import CourseList from "../components/CourseList";
import { Link } from "react-router-dom";

const coursesData = {
  NTU: { eligible: ["Course A", "Course B"], maybe: ["Course C"], notEligible: ["Course D"] },
  NUS: { eligible: ["Course E"], maybe: ["Course F"], notEligible: ["Course G"] },
  SMU: { eligible: ["Course H"], maybe: ["Course I"], notEligible: ["Course J"] },
};

const Prediction = () => {
  const [step, setStep] = useState(1);
  const [studentType, setStudentType] = useState("");
  const [score, setScore] = useState("");
  const [university, setUniversity] = useState("");
  const [courses, setCourses] = useState(null);

  const handleNext = () => {
    if (step === 3) setCourses(coursesData[university]);
    setStep(step + 1);
  };
  const handlePrev = () => setStep(step - 1);

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Step 1: Are you a JC or Poly student?</h2>
          <button onClick={() => { setStudentType("JC"); handleNext(); }}>JC</button>
          <button onClick={() => { setStudentType("Poly"); handleNext(); }}>Poly</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Enter your {studentType === "JC" ? "A-Level RP" : "Poly GPA"}:</h2>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder={studentType === "JC" ? "Enter RP" : "Enter GPA"}
          />
          <div style={{ marginTop: "10px" }}>
            <button onClick={handlePrev}>Back</button>{" "}
            <button onClick={handleNext} disabled={!score}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Step 3: Select a university</h2>
          {["NTU", "NUS", "SMU"].map((uni) => (
            <button
              key={uni}
              onClick={() => { setUniversity(uni); handleNext(); }}
              style={{ marginRight: "10px" }}
            >
              {uni}
            </button>
          ))}
          <div style={{ marginTop: "10px" }}>
            <button onClick={handlePrev}>Back</button>
          </div>
        </div>
      )}

      {step === 4 && courses && (
        <div>
          <h2>Step 4: Courses for {university}</h2>
          <CourseList courses={courses} />
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => setStep(1)}>Start Over</button>{" "}
            <Link to="/"><button>Back to Home</button></Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prediction;
