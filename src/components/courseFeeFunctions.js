"use client";
import NewSeason from "../utilities/getDate";
import { useEffect, useState } from "react";

const SessionStart = () => {
  const newSeason = NewSeason();
  const [date, setDate] = useState(null);
  const [err, setError] = useState(null);

  useEffect(() => {
    const fetchStartDate = async () => {
      try {
        const response = await fetch("/api/startDate");
        if (!response.ok) {
          throw new Error("Failed to fetch start date");
        }
        const data = await response.json();
        let dateOnly = data.data.date;
        let exactDate = dateOnly.split(" ");
        setDate(exactDate[0]);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStartDate();
  }, [date]);

  return (
    <div>
      <h4>
        The first class for the {newSeason} session starts on:
        <span className="blinkyText">{date || "Loading"}</span>
      </h4>
    </div>
  );
};

export default SessionStart;
