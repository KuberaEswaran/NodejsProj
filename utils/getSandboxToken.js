const axios = require("axios");

const getSandboxToken = async () => {
  try {
    const response = await axios.post(
      "https://api.sandbox.co.in/authenticate",
      {},
      {
        headers: {
          "x-api-key": process.env.x - api - key,
          "x-api-secret": process.env.x - api - secret,
          "x-api-version": process.env.x - api - version,

          Accept: "application/json",
        },
      }
    );

    const token =
      response.data?.data?.access_token || response.data?.access_token;

    return token;
  } catch (error) {
    console.error("Error fetching sandbox token:", error.message);
    return null;
  }
};

module.exports = getSandboxToken;
