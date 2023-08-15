export type User = {
  id: string;
  name: string;
  email: string;
};

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};
