/** @type {import('next').NextConfig} */
// require "npm i intercept-stdout"
const intercept = require("intercept-stdout");
// safely ignore recoil stdout warning messages
const interceptStdout = (text) => {
  if (text.includes("Duplicate atom key")) {
    return "";
  }
  return text;
};
// Intercept in dev and prod
intercept(interceptStdout);

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
