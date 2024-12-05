import connectionPool from "@/utils/db.js";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.setHeader("Allow", ["POST"]).status(405).end();
  }
  try {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      date: req.body.date,
      location: req.body.location,
      city: req.body.city,
    };
    let age = 25;
    let gender_id = 2;
    let sexual_Preference_id = 2;
    let racial_Preference_id = 2;
    let meeting_Interest_id = 2;
    let hobbies_id = [1, 2, 3];
    let about_me = "Hello";
    let image_profile = [
      "https://www.google.co.th/?gws_rd=ssl",
      "https://www.scorchsoft.com/solutions/chatgpt-development-company",
    ];
    if (!user.password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const salt = await bcrypt.genSalt(10);

    // การเข้ารหัส password
    user.password = await bcrypt.hash(user.password, salt);

    // const sqlQuery = "SELECT * FROM users WHERE username = $1 OR email = $2";
    // const { rows } = await connectionPool.query(sqlQuery, [
    //   user.username,
    //   user.email,
    // ]);

    // if (rows.length > 0) {
    //   return res
    //     .status(400)
    //     .json({ message: "Username or email already exists" });
    // }
    const insertQuery = `
    INSERT INTO users (
      username, email, password
    )
    VALUES ($1, $2, $3)
    RETURNING *`;

    const result = await connectionPool.query(insertQuery, [
      user.username,
      user.email,
      user.password,
    ]);

    // ตรวจสอบว่าผลลัพธ์ที่ได้มีข้อมูลหรือไม่
    // if (result.rows.length === 0) {
    //   return res.status(400).json({ message: "Failed to create user" });
    // }

    const userId = result.rows[0].users_id; // ใช้ result แทน resultUsers

    const insertQueryProfiles = `
    INSERT INTO user_profiles ( users_id,name,date_of_birth,age,location,city,gender_id,sexual_Preference_id,racial_Preference_id,meeting_Interest_id,hobbies_id,about_me,image_profile)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`;

    await connectionPool.query(insertQueryProfiles, [
      userId, // Insert the user_id from the first query
      user.name,
      user.date, // date_of_birth ของผู้ใช้
      age,
      user.location,
      user.city,
      gender_id,
      sexual_Preference_id,
      racial_Preference_id,
      meeting_Interest_id,
      hobbies_id,
      about_me,
      image_profile,
    ]);

    return res.status(201).json({
      message: "Registration successful",
      user: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
