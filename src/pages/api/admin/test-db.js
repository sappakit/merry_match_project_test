import connectionPool from "@/utils/db";

export default async function handle(req, res) {
  try {
    // ทดสอบการเชื่อมต่อกับฐานข้อมูล
    const result = await connectionPool.query("SELECT 1");
    console.log("Test Database Connection Result:", result);

    // ส่งผลลัพธ์กลับไปยัง client
    return res.status(200).json({
      message: "Database connection successful",
      result: result,
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return res.status(500).json({
      message: "Failed to connect to database",
      error: error.message,
    });
  }
}
