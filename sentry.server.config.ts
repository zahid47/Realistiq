// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  environment: process.env.NODE_ENV,

  dsn: "https://5fe0412a73fa4c6d83d4fd3cab0dbe5b@o4504277662826496.ingest.sentry.io/4505335172497408",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
