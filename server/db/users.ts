import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { IUser } from '../types/types';

config();

const uri: string = `mongodb+srv://admin2:${process.env.DB_PASSWORD}@todoapp.fzqwl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client: MongoClient = new MongoClient(uri);

export const addUser = async (user: IUser) => {
  try {
    await client.connect();
    await client.db('TodoApp').collection('users').insertOne(user);
    await client.close();
    return 'Added!';
  } catch (error) {
    await client.close();
    return 'Something went wrong when adding user.'
  }
};

export const getUser = async (username: string) => {
  try {
    await client.connect();
    const user = await client.db('TodoApp').collection('users').findOne({ username });
    await client.close();
    if (!user) {
      return 'Something went wrong when getting user.';
    };
    return user;
  } catch (error) {
    await client.close();
    return;
  };
};