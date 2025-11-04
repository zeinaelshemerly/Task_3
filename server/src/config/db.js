import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    // Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    console.log('Using in-memory MongoDB:', mongoUri);
    try {
      await mongoose.connect(mongoUri, { autoIndex: true });
      console.log('In-memory MongoDB connected');
    } catch (err) {
      console.error('In-memory MongoDB connection error', err.message);
      process.exit(1);
    }
  } else {
    try {
      await mongoose.connect(uri, { autoIndex: true });
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error', err.message);
      process.exit(1);
    }
  }
}

export async function closeDB() {
  if (mongoServer) {
    await mongoServer.stop();
  }
  await mongoose.connection.close();
}
