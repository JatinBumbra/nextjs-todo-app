import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "PUT") {
    let resp = await fetch(`http://localhost:3001/todos/${req.query.id}`);
    let data = await resp.json();
    resp = await fetch(`http://localhost:3001/todos/${req.query.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, is_completed: !data.is_completed }),
    });
    data = await resp.json();
    res.status(200).json({
      message: `Todo was marked as ${
        data.is_completed ? "completed" : "incompleted"
      }`,
    });
  }
}
