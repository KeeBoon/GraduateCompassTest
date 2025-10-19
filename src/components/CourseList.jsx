import React from "react";

const CourseList = ({ courses }) => {
  return (
    <div>
      <h3>Eligible</h3>
      <ul>{courses.eligible.map(c => <li key={c}>{c}</li>)}</ul>

      <h3>Maybe Eligible</h3>
      <ul>{courses.maybe.map(c => <li key={c}>{c}</li>)}</ul>

      <h3>Not Eligible</h3>
      <ul>{courses.notEligible.map(c => <li key={c}>{c}</li>)}</ul>
    </div>
  );
};

export default CourseList;
