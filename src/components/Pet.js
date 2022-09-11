import React from "react";

const Pet = ({ name, animal, breed }) => {
  return (
    <div>
      <h1>
        <span style={{ fontSize: 20, color: "green" }}> pet name - </span>
        {name}
      </h1>
      <h2>
        <span style={{ fontSize: 20, color: "green" }}> animal - </span>
        {animal}
      </h2>
      <h2>
        <span style={{ fontSize: 20, color: "green" }}> breed - </span>
        {breed}
      </h2>
    </div>
  );
};

export default React.memo(Pet);
