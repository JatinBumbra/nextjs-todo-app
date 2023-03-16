import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "PUT") {
    await fetch(`http://localhost:3001/todos/${req.query.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: req.body,
    });
    res.status(200).json({
      message: "Todo was updated successfully",
    });
  }

  if (req.method === "DELETE") {
    await fetch(`http://localhost:3001/todos/${req.query.id}`, {
      method: "DELETE",
    });
    res.status(200).json({
      message: "Todo was deleted successfully",
    });
  }
}
