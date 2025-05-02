import express, { Request, Response } from "express";
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import { profile, posts, users } from './routes/api';
import bodyParser from "body-parser";

const app = express();
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch((err: Error) => console.log(err));

app.get('/', (req: Request, res: Response) => {
  return res.send("Hello, azurepwq!");
});

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 3000;

console.log("Getting started...");
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Swagger docs at http://localhost:${port}/api-docs`);
});

