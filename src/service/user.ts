import api from './api';

export type UserItem = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserItem = Omit<UserItem, 'id' | 'createdAt' | 'updatedAt'>;

export async function postUser(content: UpdateUserItem): Promise<UserItem[]> {
  const response = await fetch(`/api/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, updatedAt: new Date().toISOString() }),
  });

  if (response.ok) {
    return await response.json();
  }

  return [];
}

export async function getUsers(): Promise<UserItem[]> {
  const response = await fetch(`/api/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    return await response.json();
  }

  return [];
}

export async function getUser(id: string): Promise<UserItem[]> {
  const response = await fetch(`/api/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    return await response.json();
  }

  return [];
}

export async function putUser(id: string, content: UpdateUserItem): Promise<UserItem[]> {
  const response = await fetch(`/api/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...content, updatedAt: new Date().toISOString() }),
  });

  if (response.ok) {
    return await response.json();
  }

  return [];
}

export async function deleteUser(id: string): Promise<UserItem[]> {
  const response = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    return await response.json();
  }

  return [];
}
