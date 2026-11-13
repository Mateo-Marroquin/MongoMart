import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const uri =
    process.env['MONGODB_URI'] ?? 'mongodb://127.0.0.1:27017';
  await mongoose.connect(uri, { dbName: 'mongomart' });
  console.log('MongoDB conectado');
};
