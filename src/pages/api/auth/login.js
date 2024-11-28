import connectionPool from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.setHeader("Allow", ["POST"]).status(405).end();
  }

  const { username, password } = req.body;

  try {
    const sqlQuery = "SELECT * FROM users WHERE username = $1";
    const { rows } = await connectionPool.query(sqlQuery, [username]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Invalid username",
      });
    }

    const user = rows[0];

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
