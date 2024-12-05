import connectionPool from "@/utils/db";
import { cloudinaryUpload } from "@/utils/upload";
import multer from "multer";
import cloudinary from "cloudinary";

// กำหนด multerUpload
const multerUpload = multer({ dest: "public/files" });

// ตั้งค่า Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// กำหนด config สำหรับ Next.js API Route (ต้องปิด bodyParser)
export const config = {
  api: {
    bodyParser: false,
  },
};

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
    try {
      multerUpload.single("icon")(req, res, async (err) => {
        if (err) {
          console.error("File upload error:", err);
          return res.status(500).json({ error: "File upload failed" });
        }
        // อัปเดตข้อมูลแพ็กเกจ
        const { name_package, litmit_match, description, price } = req.body;

        let iconUrl = req.body.icon_url || null; // ใช้รูปภาพเดิมหากไม่มีการอัปโหลดใหม่
        if (!req.file) {
          try {
            const query = `SELECT icon_url FROM package WHERE package_id = $1`;
            const { rows } = await connectionPool.query(query, [id]);
            if (rows.length > 0) {
              iconUrl = rows[0].icon_url; // ใช้ค่าเดิมจากฐานข้อมูล
            }
          } catch (error) {
            console.error("Error fetching icon_url:", error.message);
            return res
              .status(500)
              .json({ error: "Failed to fetch existing icon_url." });
          }
        } else {
          // หากมีการอัปโหลดรูปภาพใหม่ ให้ทำการอัปโหลดไปยัง Cloudinary
          try {
            const uploadResult = await cloudinaryUpload(req.file); // อัปโหลดไปยัง Cloudinary
            iconUrl = uploadResult.url; // รับ URL ของรูปภาพใหม่
          } catch (error) {
            console.error("Error uploading file to Cloudinary:", error.message);
            return res.status(500).json({ error: "Failed to upload icon." });
          }
        }

        if (!name_package || !litmit_match || description === undefined) {
          return res.status(400).json({ error: "Missing required fields." });
        }

        try {
          console.log("Updating package with ID:", id);
          console.log("Data to update:", {
            name_package,
            litmit_match,
            description,
            iconUrl,
            price,
          });

          const query = `
        UPDATE package
        SET name_package = $1, description = $2, litmit_match = $3, price = $4, icon_url = $5, updated_at = NOW()
        WHERE package_id = $6
      `;
          const result = await connectionPool.query(query, [
            name_package,
            description,
            litmit_match,
            price,
            iconUrl,
            id,
          ]);

          if (result.rowCount === 0) {
            return res.status(404).json({ error: "Package not found" });
          }
          return res.status(200).json({
            message: "Package updated successfully!",
            icon_url: iconUrl,
          });
        } catch (error) {
          console.error("Database Error:", error.message);
          return res.status(500).json({ error: "Failed to update package." });
        }
      });
    } catch (error) {
      console.error("Unexpected error:", error.message);
      return res.status(500).json({ error: "Unexpected server error" });
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
