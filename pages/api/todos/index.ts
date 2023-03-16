import type { NextApiRequest, NextApiResponse } from "next";
import { Todo } from "../../../types/todo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    const resp = await fetch("http://localhost:3001/todos");
    const todos = (await resp.json()) as Todo[];
    res.status(200).json(todos);
  }

  if (req.method === "POST") {
    const resp = await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: req.body,
    });
    const todo = await resp.json();
    res.status(200).json({
      message: "Todo was added successfully",
      todo,
    });
  }
}
