import connectionPool from "@/utils/db";

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { package_name, merry_limit, details } = req.body;

    // Validation ข้อมูลที่รับมา
    if (!package_name) {
      // || !details
      return res.status(400).json({ error: "All fields are required." });
    }
    try {
      const query = `
        INSERT INTO package (name_package, description, litmit_match, created_at, updated_at)
        VALUES ($1, $2, $3, NOW(), NOW())
      `;
      const values = [package_name, details, merry_limit]; //JSON.stringify(details)
      await connectionPool.query(query, values);

      return res.status(201).json({ message: "Package added successfully!" });
    } catch (error) {
      console.error("Database Error: ", error.message);
      console.error("Error Stack: ", error.stack);
      return res.status(500).json({ error: "Failed to add package." });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body; // รับ id ของ package ที่ต้องการลบ

    try {
      const query = `DELETE FROM package WHERE package_id = $1`;
      const values = [id];
      await connectionPool.query(query, values);

      return res.status(200).json({ message: "Package deleted successfully!" });
    } catch (error) {
      console.error("Database Error: ", error.message);
      return res.status(500).json({ error: "Failed to delete package." });
    }
  } else if (req.method === "GET") {
    // ดึงข้อมูลแพ็กเกจทั้งหมด
    try {
      const query = `SELECT * FROM package ORDER BY created_at DESC`;
      const { rows } = await connectionPool.query(query);

      return res.status(200).json(rows);
    } catch (error) {
      console.error("Database Error: ", error.message);
      return res.status(500).json({ error: "Failed to fetch packages." });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
