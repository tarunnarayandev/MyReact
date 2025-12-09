import { useEffect, useState } from "react";

export const FlightBooking = () => {
  const [flightType, setFlightType] = useState("ONE_WAY");
  const d = new Date()
  const today = d.toISOString().split("T")[0]; // "yyyy-mm-dd"
  const [startDate, setStartDate] = useState(today)
  const [returnDate, setReturnDate] = useState(startDate)
  const [error, setError] = useState("")

  useEffect(() => {
    setError("")
  },[startDate,returnDate])
  
  const handleChange = (e) => {
    setFlightType(e.target.value);
  };

const onSubmit = () => {
  if (flightType === "ROUND_TRIP") {

    if (startDate < today) {
      setError("Start date cannot be before today");
      return;
    }

    if (returnDate < startDate) {
      setError("Return date must be after start date");
      return;
    }

    console.log(flightType, startDate, returnDate);
  }

  else if (flightType === "ONE_WAY") {

    if (startDate < today) {
      setError("Start date cannot be before today");
      return;
    }

    console.log(flightType, startDate);
  }
};


  const onDateChange = (val, type) => {
    type === "ONE_WAY" ?     setStartDate(val) : setReturnDate(val)
  }
  return (
    <div className="padding8">
    <div className="margin8">
      <label for="flight">Choose option</label>
      <select
      className="padding8"
        name="flight"
        id="flight"
        value={flightType}
        onChange={handleChange}
      >
        <option value="ONE_WAY">One way</option>
        <option value="ROUND_TRIP">Round Trip</option>
      </select>
      </div>
      <div className="marginLeft16">
      <input type="date" min={today}  onChange={(e) => onDateChange(e.target.value, "ONE_WAY")} value={startDate} name="startDate"/>
      {flightType === "ROUND_TRIP" && <input min={startDate}  className="marginLeft16" type="date" value={returnDate} onChange={(e) => onDateChange(e.target.value, "RETURN_TRIP")} name="returnDate" />}
      </div>
      {error && <div style={{color: "red"}}>{error}</div>}
      <button onClick={onSubmit} className="marginTop16">BOOK</button>
    </div>
  );
};
