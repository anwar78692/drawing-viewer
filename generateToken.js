const axios = require('axios');
const base64 = require('base-64');

const CLIENT_ID = 'Ax7KRVQAoLTCaffbesZDYnoFqRRzUNYmvhrIMLLG2lTUY770'; // Replace with your Client ID
const CLIENT_SECRET = 'JmAMrvI3QcFKRaCrogvVoKuSi9DoqRXsmG1Enl3rBg1BcZKiImGzmYDy2uCbBdoG'; // Replace with your Client Secret

async function getAccessToken() {
  try {
    const response = await axios.post(
      'https://developer.api.autodesk.com/authentication/v2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'data:read data:write data:create bucket:create bucket:read',
      }),
      {
        headers: {
          Authorization: `Basic ${base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('Access Token:', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Error generating access token:', error.response.data);
  }
}

getAccessToken();
