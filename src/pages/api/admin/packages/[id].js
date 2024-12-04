import connectionPool from "@/utils/db";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Invalid package ID." });
  }

  if (req.method === "GET") {
    // ดึงข้อมูลแพ็กเกจที่ระบุด้วย `id`
    try {
      // const result = await connectionPool.query("SELECT * FROM package WHERE package_id = $1",[id]); เขียนแบบนี้ได้
      const query = `SELECT * FROM package WHERE package_id = $1`;
      const { rows } = await connectionPool.query(query, [id]);

      if (rows.length === 0) {
        return res.status(404).json({ error: "Package not found" });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Database Error:", error.message);
      return res.status(500).json({ error: "Failed to fetch package data." });
    }
  } else if (req.method === "PUT") {
    // อัปเดตข้อมูลแพ็กเกจ
    const { name_package, litmit_match, description, price } = req.body;
    console.log("Data received in PUT request:", req.body);

    if (!name_package || !litmit_match || description === undefined) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    try {
      console.log("Updating package with ID:", id);
      console.log("Data to update:", {
        name_package,
        litmit_match,
        description,
        price,
      });

      const query = `
        UPDATE package
        SET name_package = $1, description = $2, litmit_match = $3, price = $4, updated_at = NOW()
        WHERE package_id = $5
      `;
      const result = await connectionPool.query(query, [
        name_package,
        description,
        litmit_match,
        price,
        id,
      ]);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Package not found" });
      }
      return res.status(200).json({ message: "Package updated successfully!" });
    } catch (error) {
      console.error("Database Error:", error.message);
      return res.status(500).json({ error: "Failed to update package." });
    }
  } else if (req.method === "DELETE") {
    // ลบแพ็กเกจที่ระบุด้วย `id`
    try {
      const query = `DELETE FROM package WHERE package_id = $1`;
      await connectionPool.query(query, [id]);
      return res.status(200).json({ message: "Package deleted successfully!" });
    } catch (error) {
      console.error("Database Error:", error.message);
      return res.status(500).json({ error: "Failed to delete package." });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
