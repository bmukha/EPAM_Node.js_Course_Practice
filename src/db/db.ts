import mongoose from 'mongoose';

export const connectToDB = async (url: string) => {
  try {
    await mongoose.connect(url, {
      autoIndex: true,
    });
    console.log('DB connection successful!');
  } catch (error) {
    console.error('DB connection failed!', error);
  }
};

export const disconnectFromDB = async () => await mongoose.disconnect();

export const clearDB = async () => {
  const collections = await mongoose.connection.db.collections();
  collections.forEach(async (collection) => await collection.deleteMany({}));
};
