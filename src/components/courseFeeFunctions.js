"use client";
import NewSeason from "../utilities/getDate";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

// Add a function that takes in the start dates of the year Session Fall, Winter, Spring.
// Date automatically switches if date is past a certain point of the school year.
// Start dates can be set in the admin page of site

const SessionStart = () => {
  const t = useTranslations("CourseFees");
  const space = " ";
  const newSeason = NewSeason();
  let sessionStart;
  const [date, setDate] = useState(null);
  const [err, setError] = useState(null);
  const [fallStart, setFallStart] = useState(null);
  const [winterStart, setWinterStart] = useState(null);
  const [springStart, setSpringStart] = useState(null);

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
      <h6>
        <span>{t("Schedule.FirstClass")} </span> {space}
        {newSeason} {space}
        <span>{t("Schedule.FirstClass2")} </span>
        <span className="blinkyText">{date || "Loading"}</span>
      </h6>
    </div>
  );
};

export default SessionStart;
