const axios = require('axios');

async function check() {
    try {
        const res = await axios.get('http://localhost:3000/api/v1/health');
        console.log('HEALTH_CHECK_RESULT:', JSON.stringify(res.data));
    } catch (err) {
        console.log('HEALTH_CHECK_ERROR:', err.message);
    }
}

check();
