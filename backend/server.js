const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

app.use(cors());

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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
