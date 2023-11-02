import fetch from 'node-fetch';
import queryString from 'query-string';

export async function getWeatherData(locationCoord) {
  const getTimelineURL = 'https://api.tomorrow.io/v4/timelines';
  const apikey = process.env.APIKEY;

  let location = locationCoord;

  const fields = [
    'temperature',
    'temperatureApparent',
    'dewPoint',
    'humidity',
    'windSpeed',
    'windDirection',
    'windGust',
    'pressureSurfaceLevel',
    'precipitationIntensity',
    'precipitationProbability',
    'precipitationType',
    'sunriseTime',
    'sunsetTime',
    'visibility',
    'cloudCover',
    'moonPhase',
    'uvIndex',
    'uvHealthConcern',
    'weatherCodeDay',
    'weatherCodeNight',
  ];

  const units = 'metric';

  const timesteps = ['current', '1h', '1d'];

  const now = new Date();
  const tomorrow = new Date();
  const startTime = now.toISOString();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const endTime = tomorrow.toISOString();

  const timezone = 'Europe/Madrid';

  const getTimelineParameters = queryString.stringify(
    {
      apikey,
      location,
      fields,
      units,
      timesteps,
      startTime,
      endTime,
      timezone,
    },
    { arrayFormat: 'comma' },
  );

  try {
    const response = await fetch(getTimelineURL + '?' + getTimelineParameters, {
      method: 'GET',
      compress: true,
    });

    if (!response.ok) {
      throw new Error('Error obtaining data from API');
    }

    const json = await response.json();
    return json;
  } catch (error) {
    return 'error: ' + error;
  }
}
