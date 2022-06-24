export interface ITodo {
  id: number
  title: string;
  description : string;
  todoDone : boolean;
  idOfList: number;
}

export interface IUser {
  username: string;
  password: string;
};

export interface IList {
  id: number;
  name: string;
  users: string[];
}

