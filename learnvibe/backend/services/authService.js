import pool from "../db.js";  // Database connection pool

// Function to check if user exists and create user if not
export const createUser = async (email, username, name) => {
  const role = "user"; // ✅ Define role before using it
  const verified = false; // ✅ Define verified before using it

  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1", 
    [email]
  );

  if (existingUser.rows.length === 0) {
    await pool.query(
      "INSERT INTO users (name, email, role, created_at, updated_at ,isverified) VALUES ($1, $2, $3, NOW(), NOW(),$4)",
      [name, email, role,verified] // ✅ Correct parameter order
    );
    return true; // User created
  } else {
    return false; // User already exists
  }
};

// Function to update user's updated_at timestamp
export const updateUser = async (email) => {
  await pool.query("UPDATE users SET updated_at = NOW() WHERE email = $1", [email]);
};

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0]; // Return user object if found
};
