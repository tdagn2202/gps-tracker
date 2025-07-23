const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let latestGpsData = null;

app.post('/api/gps', (req, res) => {
  const { lat, lng, sat, time } = req.body;

  if (lat == null || lng == null) {
    return res.status(400).json({ message: 'Thiếu tọa độ GPS' });
  }

  latestGpsData = {
    lat,
    lng,
    sat,
    time: time || new Date().toISOString(),
    receivedAt: new Date().toISOString()
  };

  res.json({ message: 'Đã nhận dữ liệu GPS', data: latestGpsData });
});

app.get('/api/gps', (req, res) => {
  if (!latestGpsData) {
    return res.json({ lat: null, lng: null });
  }

  res.json(latestGpsData);
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
