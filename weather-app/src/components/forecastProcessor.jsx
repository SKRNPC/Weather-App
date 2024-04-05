function forecastProcessor(forecastData) {
  const daySummaries = {};
  function getDayName(date) {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNames[date.getDay()];
  }

  // İşlenmiş verilerin toplam gün sayısını belirle
  const daysLimit = 6; // Toplam 6 gün
  let processedDays = 0;

  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayName = getDayName(date);
    const tempMin = item.main.temp_min;
    const tempMax = item.main.temp_max;
    const weatherMain = item.weather[0].main;
    const iconCode = item.weather[0].icon; // API'den gelen ikon kodu

    // İşlenen gün sayısı 5'e ulaştığında, günlerin tüm verilerini işle
    if (processedDays === 5) {
      if (!daySummaries[dayName]) {
        daySummaries[dayName] = {
          tempMin,
          tempMax,
          weather: [{ main: weatherMain, count: 1 }],
          iconCode: iconCode, // Her gün için ikon kodunu sakla
        };
      } else {
        daySummaries[dayName].tempMin = Math.min(
          daySummaries[dayName].tempMin,
          tempMin
        );
        daySummaries[dayName].tempMax = Math.max(
          daySummaries[dayName].tempMax,
          tempMax
        );

        const weatherIndex = daySummaries[dayName].weather.findIndex(
          (weather) => weather.main === weatherMain
        );
        if (weatherIndex !== -1) {
          daySummaries[dayName].weather[weatherIndex].count += 1;
        } else {
          daySummaries[dayName].weather.push({ main: weatherMain, count: 1 });
        }
      }
    }

    // İşlenen gün sayısını artır
    if (processedDays < daysLimit - 1) {
      processedDays++;
    }
  });

  // En sık görülen hava durumu ikonunu bulma işlemi burada yapılabilir

  Object.keys(daySummaries).forEach((dayName) => {
    const mostFrequentWeather = daySummaries[dayName].weather.reduce((a, b) =>
      a.count > b.count ? a : b
    );
    daySummaries[dayName].weatherMain = mostFrequentWeather.main;
    delete daySummaries[dayName].weather;
  });

  return daySummaries;
}

export default forecastProcessor;
