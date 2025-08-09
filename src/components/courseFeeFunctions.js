"use client";
import NewSeason from "../utilities/getDate";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const SessionStart = () => {
  const t = useTranslations("CourseFees");
  const space = " ";
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
