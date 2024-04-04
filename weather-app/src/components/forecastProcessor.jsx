function forecastProcessor(forecastData) {
  const daySummaries = {};

  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    const tempMin = item.main.temp_min;
    const tempMax = item.main.temp_max;
    const weatherMain = item.weather[0].main;

    if (!daySummaries[date]) {
      daySummaries[date] = {
        tempMin,
        tempMax,
        weather: [{ main: weatherMain, count: 1 }],
      };
    } else {
      daySummaries[date].tempMin = Math.min(
        daySummaries[date].tempMin,
        tempMin
      );
      daySummaries[date].tempMax = Math.max(
        daySummaries[date].tempMax,
        tempMax
      );

      const weatherIndex = daySummaries[date].weather.findIndex(
        (weather) => weather.main === weatherMain
      );
      if (weatherIndex !== -1) {
        daySummaries[date].weather[weatherIndex].count += 1;
      } else {
        daySummaries[date].weather.push({ main: weatherMain, count: 1 });
      }
    }
  });

  Object.keys(daySummaries).forEach((date) => {
    const mostFrequentWeather = daySummaries[date].weather.reduce((a, b) =>
      a.count > b.count ? a : b
    );
    daySummaries[date].weatherMain = mostFrequentWeather.main;
    delete daySummaries[date].weather;
  });

  return daySummaries;
}

export default forecastProcessor;
