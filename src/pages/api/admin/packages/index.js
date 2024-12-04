import connectionPool from "@/utils/db";
import { cloudinaryUpload } from "@/utils/upload";
import multer from "multer";

// ตั้งค่าการเก็บไฟล์ด้วย multer
const multerUpload = multer({ dest: "public/files" });

// กำหนด config สำหรับ Next.js API Route (ต้องปิด bodyParser)
export const config = {
  api: {
    bodyParser: false, // ปิด bodyParser เพื่อให้ multer จัดการ request body เอง
  },
};

export default async function handle(req, res) {
  if (req.method === "POST") {
    multerUpload.single("icon")(req, res, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res
          .status(500)
          .json({ error: "File upload failed", details: err.message });
      }

      try {
        const { package_name, merry_limit, price, details } = req.body;

        // ตรวจสอบข้อมูล
        if (!package_name || !merry_limit || !price) {
          return res.status(400).json({ error: "Missing required fields." });
        }

        // แปลง price เป็นตัวเลข
        const numericPrice = Number(price);

        let parsedDetails = [];
        if (details) {
          try {
            parsedDetails = JSON.parse(details); // แปลง JSON string กลับเป็น array
          } catch (error) {
            console.error("Error parsing details:", error.message);
            return res.status(400).json({ error: "Invalid details format." });
          }
        }

        // อัปโหลดรูปภาพไปยัง Cloudinary
        let iconUrl = null;
        if (req.file) {
          const uploadResult = await cloudinaryUpload(req.file); // ใช้ฟังก์ชันใหม่
          iconUrl = uploadResult.url; // เก็บเฉพาะ URL ของรูปภาพ
        }

        const query = `
            INSERT INTO package (name_package, description, litmit_match, price, icon_url, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
          `;
        const values = [
          package_name,
          JSON.stringify(parsedDetails),
          merry_limit,
          numericPrice,
          iconUrl,
        ]; //JSON.stringify(details)

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
    });
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
