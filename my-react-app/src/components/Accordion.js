import { useState } from "react";

export const Accordion = ({ children, data }) => {
  const { title } = data;
  const [showAccordionData, toggleAccordion] = useState(false);

  const handleAccordClick = () => {
    toggleAccordion((prev) => !prev);
  };
  return (
    <>
      <div onClick={handleAccordClick} className="flex accordion">
        <p className="accordion-title">{title}</p>
        <img
          style={{
            width: 20,
            height: 20,
            transform: showAccordionData ? "rotate(90deg)" : "rotate(0deg)",
            transformOrigin: "center",
            transition: "transform 200ms ease",
          }}
          src="/right-arrow.svg"
        />
      </div>
      <div className={showAccordionData ? "accord-child-show": "accord-child-hid"}>
      {showAccordionData && children}
      </div>
    </>
  );
};
