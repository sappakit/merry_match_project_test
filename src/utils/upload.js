import cloudinary from "cloudinary";
import fs from "fs/promises";

// ตั้งค่า Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ฟังก์ชันอัปโหลดไฟล์เดี่ยวไปยัง Cloudinary
const cloudinaryUpload = async (file) => {
  try {
    // อัปโหลดไฟล์ไปยัง Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "test/pic", // โฟลเดอร์ที่ต้องการจัดเก็บบน Cloudinary
      private: true, // กำหนดให้ไฟล์เป็น private
    });

    // ลบไฟล์ชั่วคราวที่เก็บใน server หลังอัปโหลดเสร็จ
    await fs.unlink(file.path);

    // ส่งคืน URL และ publicId ของไฟล์ที่อัปโหลด
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    throw new Error("Failed to upload file to Cloudinary.");
  }
};

export { cloudinaryUpload };
