import React from "react";
import "./InputsType.css";

const inputsList = [
  {
    id: "restaurant",
    value: "Restaurant",
  },
  {
    id: "bar",
    value: "Bar",
  },
  {
    id: "concert-coffee",
    value: "Café concert",
  },
];

function InputsType() {
  return (
    <>
      <p>Type d'établissement</p>
      <div className="custom-radio-holder">
        {inputsList.map((input) => (
          <React.Fragment key={input.id}>
            <input
              className="custom-radio-input"
              id={input.id}
              type="radio"
              name="type"
              value={input.value}
            />
            <label className="custom-radio-wrapper" htmlFor={input.id}>
              <div className="custom-radio">
                <div className="inner">{input.value}</div>
              </div>
            </label>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default InputsType;
