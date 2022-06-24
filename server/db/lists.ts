import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { IList, IUser } from '../types/types';

config();

const uri: string = `mongodb+srv://admin2:${process.env.DB_PASSWORD}@todoapp.fzqwl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client: MongoClient = new MongoClient(uri);


export const addList = async (list: IList) => {
  try {
    await client.connect();
    await client.db('TodoApp').collection('lists').insertOne(list);
    await client.close();
    return 'Added!';
  } catch (error) {
    await client.close();
    return 'Something went wrong when adding list.';
  }
};

export const getList = async (id: number) => {
  try {
    await client.connect();
    const list = await client.db('TodoApp').collection('lists').findOne({ id });
    if (!list) {
      return 'No list.';
    }
    await client.close();
    return list;
  } catch (error) {
    await client.close();
    return 'Something went wrong when searching list.';
  }
};

export const getListsByUser = async (username: string) => {
  try {
    await client.connect();
    const userLists = await client.db('TodoApp').collection('lists').find({ users: username }).toArray();
    await client.close();
    return userLists;
  } catch (error) {
    await client.close();
    return 'Something went wrong when searching users lists.';
  }
};

export const addUserToList = async (user: IUser, list: IList) => {
  try {
    await client.connect();
    await client.db('TodoApp').collection('lists').updateOne({ id: list.id }, { $push: { users: user.username }});
    await client.close();
  } catch (err) {
    await client.close();
    return 'Something went wrong when adding user to list.';
  };
};

export const deleteUserFromList = async (user: IUser, list: IList) => {
  try {
    await client.connect();
    await client.db('TodoApp').collection('lists').updateOne({ id: list.id }, { $pull: { users: user.username }});
    await client.close();
  } catch (err) {
    await client.close();
    return 'Something went wrong when deleting user from list.';
  };
};

export const deleteList = async (id: number) => {
  try {
    await client.connect();
    await client.db('TodoApp').collection('lists').deleteOne({ id });
    await client.close();
    return 'Deleted!';
  } catch (error) {
    await client.close();
    return 'Something went wrong when deleting list.';
  }
};