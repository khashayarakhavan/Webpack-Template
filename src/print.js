export default function printMe() {
  // console.log("I get called from print.js!");
  // print: "./src/print.js",
  // how fast
  // console.log(NODE_ENV);
  console.log("Updating HOTTTTTTT MODULE print.js...");

  if (process.env.NODE_ENV === "production") {
    console.log("Looks like we are in production mode!");
  }
  
  if (process.env.NODE_ENV === "development") {
    console.log("Looks like we are in development mode!");
  }
  
  if (PRODUCTION) {
    console.log(PRODUCTION);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log("Hello from DEV :D ");
  }

  if (process.env.NODE_ENV === "production") {
    console.log("Hello from PROD :D ");
  }

  if (PRODUCTION) {
    console.log("Production log");
  }

  console.log("Running App version " + VERSION);
  // if (!BROWSER_SUPPORTS_HTML5) require("html5shiv");

  console.log(process.env.DB_HOST);
  // '127.0.0.1'
}
