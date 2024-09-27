"use client"

import useSWR, { mutate } from "swr"

const url = "http://localhost:8080/tasks"

async function fetcher(url: string) {
  const res = await fetch(url)
  return await res.json()
}


export default function useTasks() {
  const { data, isValidating, isLoading } = useSWR(url, fetcher)

  const updateRow = async (id: string, data: any) => {
    await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    mutate(url)
  }

  const addRow = async () => {
    const data = {
      taskName: "New Task",
      initialEstimation: 1,
      remainingTime: 1,
      consumedTime: 0,
      status: "BACKLOG",
    }
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    mutate(url)
  }

  const deleteRow = async (id: string) => {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    })
    mutate(url)
  }

  return {
    data: data ?? [],
    isLoading,
    isValidating,
    updateRow,
    addRow,
    deleteRow,
  }
}
