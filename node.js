document.addEventListener("DOMContentLoaded", function() {
  // Fetch function to interact with the Kodessphere API
  async function fetchData(endpoint, method = 'GET', data = null) {
    try {
      const response = await fetch(https://kodessphere-api.vercel.app/${endpoint}, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Fan control
  const fanRange = document.querySelector("input[type='range']");
  const fanSpeedLabel = document.querySelector(".Control:nth-child(1) footer");
  fanRange.addEventListener("input", async function() {
    fanSpeedLabel.textContent = "Speed: " + this.value;
    // Example: Update fan speed using Kodessphere API
    const data = { speed: parseInt(this.value) };
    const response = await fetchData('fan', 'PUT', data);
    console.log(response); // Log the response from the API
  });

  // Bulb control
  const bulbOnBtn = document.querySelector(".button-On");
  const bulbOffBtn = document.querySelector(".button-OFF");
  const bulbStateLabel = document.querySelector(".Control:nth-child(2) footer");
  bulbOnBtn.addEventListener("click", async function() {
    bulbStateLabel.textContent = "State: On";
    // Example: Turn on the bulb using Kodessphere API
    const response = await fetchData('bulb/on', 'POST');
    console.log(response); // Log the response from the API
  });
  bulbOffBtn.addEventListener("click", async function() {
    bulbStateLabel.textContent = "State: Off";
    // Example: Turn off the bulb using Kodessphere API
    const response = await fetchData('bulb/off', 'POST');
    console.log(response); // Log the response from the API
  });

  // LED control
  const ledColorInput = document.querySelector("input[type='color']");
  ledColorInput.addEventListener("input", function() {
    // Assuming LED color label is not available, you can add it similarly to other controls
    console.log("Selected LED color:", this.value);
    // Example: Update LED color using Kodessphere API
    // Note: You need to implement the API endpoint for updating LED color
  });

  // Air conditioner control
  // Similarly implement event listeners and API requests for AC control
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

let fanSpeed = 0;
let bulbState = false;
let ledColor = "#000000";
let acState = false;
let acTemperature = 16;

app.get('/api/smart-home/status', (req, res) => {
  res.json({ fanSpeed, bulbState, ledColor, acState, acTemperature });
});

app.post('/api/smart-home/fan/speed', (req, res) => {
  const { speed } = req.body;
  fanSpeed = speed;
  res.sendStatus(200);
});

app.post('/api/smart-home/bulb/toggle', (req, res) => {
  bulbState = !bulbState;
  res.sendStatus(200);
});


app.post('/api/smart-home/led/color', (req, res) => {
  const { color } = req.body;
  ledColor = color;
  res.sendStatus(200);
});


app.post('/api/smart-home/ac/toggle', (req, res) => {
  acState = !acState;
  res.sendStatus(200);
});

app.post('/api/smart-home/ac/temperature', (req, res) => {
  const { temperature } = req.body;
  acTemperature = temperature;
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(Server ,is,Finite, running ,on, port ,$, {PORT});
});