"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const SessionStart = () => {
  const t = useTranslations("CourseFees");
  const locale = useLocale();
  const [date, setDate] = useState(null);
  const [err, setError] = useState(null);
  const [season, setSeason] = useState(null);
  const [firstClassSentence, setFirstClassSentence] = useState(null);

  useEffect(() => {
    const fetchStartDate = async () => {
      try {
        const response = await fetch("/api/startDate");
        if (!response.ok) {
          throw new Error("Failed to fetch start date");
        }
        const result = await response.json();
        if (result.status === "success") {
          setDate(result.date);
          setSeason(result.theseason);
        } else {
          throw new Error(result.message || "API returned error status");
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStartDate();
  }, []);

  useEffect(() => {
    let seasonFRA;
    if (season === "Spring") {
      seasonFRA = t("Spring");
    } else if (season === "Fall") {
      seasonFRA = t("Fall");
    } else {
      seasonFRA = t("Winter");
    }

    if (locale === "en") {
      setFirstClassSentence(`The first class of ${season} session starts on: `);
    } else {
      setFirstClassSentence(
        `Le premier cours de la session ${seasonFRA} commence le: `
      );
    }
  }, [season]);

  return (
    <div>
      <h6>
        {firstClassSentence}
        <span className="blinkyText">{date || "Loading"}</span>
      </h6>
    </div>
  );
};

export default SessionStart;
