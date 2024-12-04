import connectionPool from "@/utils/db";

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { package_name, merry_limit, price, details } = req.body;

    // แปลง price เป็นตัวเลข
    const numericPrice = Number(price);

    // Validation ข้อมูล
    if (!package_name || isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({
        error: "Invalid input. Package name and a valid price are required.",
      });
    }

    try {
      console.log("Inserting data into database:", {
        package_name,
        details,
        merry_limit,
        price: numericPrice,
      });

      const query = `
            INSERT INTO package (name_package, description, litmit_match, price, created_at, updated_at)
            VALUES ($1, $2, $3, $4, NOW(), NOW())
          `;
      const values = [package_name, details, merry_limit, numericPrice]; //JSON.stringify(details)

      console.log("Debugging Before Query Execution:");
      console.log("Query:", query);
      console.log("Values:", values);

      await connectionPool.query(query, values);

      return res.status(201).json({ message: "Package added successfully!" });
    } catch (error) {
      console.error("Database Error: ", error.message);
      console.error("Error Stack: ", error.stack);
      return res.status(500).json({ error: "Failed to add package." });
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
    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
