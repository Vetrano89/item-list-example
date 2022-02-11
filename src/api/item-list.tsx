import { ListItem } from '../types';

interface ApiReturn {
  data: ListItem[],
  status: number
}

export async function addItem(newItem: ListItem): Promise<ApiReturn> {
  const response = await fetch('http://localhost:9000/items/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newItem })
  })

  return {
    data: await response.json(),
    status: response.status
  }
}

export async function deleteItem(itemIndex: number): Promise<ApiReturn> {
  const response = await fetch('http://localhost:9000/items/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ itemIndex })
  })

  return {
    data: await response.json(),
    status: response.status
  }
}

export async function getItems(): Promise<ApiReturn> {
  const response = await fetch('http://localhost:9000/items');

  return {
    data: await response.json(),
    status: response.status
  }
}