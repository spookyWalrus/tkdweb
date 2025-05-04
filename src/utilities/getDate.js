function NewSeason() {
  let now = new Date();
  let season = now.getMonth();

  if (season >= 5 && season <= 9) {
    // June - October
    season = "Fall";
  } else if (season >= 10 && season <= 1) {
    // November - February
    season = "Winter";
  } else {
    season = "Spring";
  }

  return season;
}

export default NewSeason;
