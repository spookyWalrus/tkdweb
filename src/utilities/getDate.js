import { useTranslations } from "next-intl";

function NewSeason() {
  const t = useTranslations("CourseFees");
  let now = new Date();
  let season = now.getMonth();

  if (season >= 5 && season <= 9) {
    // June - October
    season = t("Schedule.Fall");
  } else if (season >= 10 && season <= 1) {
    // November - February
    season = t("Schedule.Winter");
  } else {
    season = t("Schedule.Spring");
  }

  return season;
}

export default NewSeason;
