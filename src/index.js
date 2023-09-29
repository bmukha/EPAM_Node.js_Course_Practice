import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/health-check', (req, res) => res.json({ isRunning: true }));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
