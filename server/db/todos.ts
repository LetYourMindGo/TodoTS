import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { ITodo } from '../types/types';

config();

const uri: string = `mongodb+srv://admin2:${process.env.DB_PASSWORD}@todoapp.fzqwl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client: MongoClient = new MongoClient(uri);

export const addTodo = async (todo: ITodo) => {
  try {
    await client.connect();
    await client.db('TodoApp').collection('todos').insertOne(todo);
    await client.close();
    return 'Added!';
  } catch (error) {
    await client.close();
    return 'Something went wrong when adding todo.';
  }
};

export const getTodos = async (id: number) => {
  try {
    await client.connect();
    const todos = await client.db('TodoApp').collection('todos').find({ idOfList: id }).toArray();    
    await client.close();
    return todos;
  } catch (error) {
    await client.close();
    return 'Something went wrong when searching todos.';
  }
};

export const getTodo = async (id: number) => {
  try {
    await client.connect();
    const todo = await client.db('TodoApp').collection('todos').findOne({ id });
    if (!todo) {
      return 'No task.';
    }
    await client.close();
    return todo;
  } catch (error) {
    await client.close();
    return 'Something went wrong when searching todo.';
  }
};

export const toggleTodo = async (id: number, todoDone: boolean) => {
  try {
    await client.connect();
    await client.db('TodoApp').collection('todos').updateOne({ id }, { $set : { todoDone } });
    await client.close();
    return 'Updated!';
  } catch (error) {
    await client.close();
    return 'Something went wrong when updating todo.';
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await client.connect();
    await client.db('TodoApp').collection('todos').deleteOne({ id });
    await client.close();
    return 'Deleted!';
  } catch (error) {
    await client.close();
    return 'Something went wrong when deleting todo.';
  }
};