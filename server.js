const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json());


app.post('/addSchool', async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const [results] = await pool.query(query, [name, address, latitude, longitude]);
        res.status(201).json({ message: 'School added successfully', schoolId: results.insertId });
    } catch (err) {
        console.error('Error adding school:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Calculate the distance between two points using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}


app.get('/listSchools', async (req, res) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    try {
        const [results] = await pool.query('SELECT * FROM schools');
        const schoolsWithDistance = results.map(school => {
            const distance = calculateDistance(parseFloat(lat), parseFloat(lng), school.latitude, school.longitude);
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    } catch (err) {
        console.error('Error fetching schools:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
