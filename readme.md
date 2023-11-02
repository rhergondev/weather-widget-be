# Weather Widget Backend

This application is designed as a learning project, it receives weather data from the [tomorrow.io](https://www.tomorrow.io/) API and serves it as a JSON to a front end client.

## Installation

The application is setup to install all dependencies using node npm, just run:

```bash
 npm install
```

to install all dependencies.

The application uses the following environment variables:

```bash
 APIKEY // you can request a key from the tomorrow.io website
```

```bash
 PORT // Port in which to serve the application
```

```bash
 FORCEDUPDATETIMER // Time in ms that the forced update is disable after use
```

```bash
 CRONTIMER // Cron npm string that sets up the interval in which the data is automatically retrieved
```

Visit [Cron npm documentation](https://www.npmjs.com/package/cron) to see the way to manage the intervals

## Development tools used

The application is built on [node.js](https://nodejs.org/) and [express](http://expressjs.com/) it also uses the following npm packages:

- [node-fetch](https://www.npmjs.com/package/node-fetch) Used in the retrieval of the data from the API, see API recipes for mor info.

- [query-string](https://www.npmjs.com/package/query-string) Used in the retrieval of the data from the API, see API recipes for mor info.

- [cron](https://www.npmjs.com/package/cron) Used to limit requests to the API, it is used in a way so that the application automatically refreshes the data at schedule times. These can be modified using the **CRONTIME** environment variable.

- [cors](https://www.npmjs.com/package/cors) Enabling cors to allow for frontend usage of the data;

## Development Notes

If we focus on the index.js file the following tools are put in placed to control the use of requests to the API:

- **serverFirstCall** - Does a first request on server startup.

- **cron.schedule** - Does a request on scheduled times.

- **forcedUpdate** - Forces an API request, keep in mind that there is a system in place via the _forcedLimitedTimer_ variable to avoid constant forced requests, the timer can me modified using the **FORCEDUPDATETIMER** enviroment variable, the time is passed in ms.

The App is set up this way in order to conform to a low limit of 500 API requests a month set up by the free tier at tomorrow.io. It also adds an extra challenge, keeping in mind that after all this is a learning experience.

## Reuse and redistribution

This rather simple software is setup in a way that there is no private data in the code, so feel free to fork if needed even though it is a rather straight forward App.
