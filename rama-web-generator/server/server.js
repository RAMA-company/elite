import express from 'express';
import cors from 'cors';
import exportRouter from './routes/export.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', exportRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
