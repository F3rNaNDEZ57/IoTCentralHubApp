const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// PostgreSQL connection setup
const pool = new Pool({
    host: 'dpg-cknvpl9rfc9c73ffmf00-a.singapore-postgres.render.com',
    port: 5432,
    user: 'iotcentralhub_user',
    password: 'lMWhdRC7i15uJGr9E4UsL4y9rAzPC49h',
    database: 'iotcentralhub',
    ssl: {
        rejectUnauthorized: false
    }
});

// Endpoint to fetch sensor data
app.get('/sensors', async (req, res) => {
    try {
        const result = await pool.query('SELECT sensor_id,sensor_type,location FROM sensors;');
        res.json(result.rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send('Server error1');
    }
});

// New endpoint to fetch the data of specific sensors from the last 10 days
app.post('/sensorData', async (req, res) => {
    const sensorIds = req.body.sensorIds; 

    if (!sensorIds || sensorIds.length === 0) {
        return res.status(400).send('No sensorIds provided');
    }

    try {
        const result = await pool.query(`
            SELECT * FROM sensor_data
            WHERE sensor_id = ANY($1::text[]) AND timestamp >= NOW() - interval '2 days'
            ORDER BY timestamp DESC;
        `, [sensorIds]);
        res.json(result.rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
