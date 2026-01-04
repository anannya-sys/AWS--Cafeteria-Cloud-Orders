// Script to check and fix database issues
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { connectDB } from "./config/db.js";

dotenv.config();

async function checkDatabase() {
  try {
    await connectDB();
    
    // Get all users
    const users = await User.find();
    console.log(`\n📊 Current users in database (${users.length}):`);
    users.forEach((u, i) => {
      console.log(`  ${i + 1}. ${u.email} - ${u.name} (ID: ${u._id})`);
    });
    
    // Check for duplicate emails (case-insensitive)
    const emails = users.map(u => u.email.toLowerCase());
    const uniqueEmails = [...new Set(emails)];
    
    if (emails.length !== uniqueEmails.length) {
      console.log(`\n⚠️ WARNING: Found duplicate emails!`);
      const duplicates = emails.filter((email, index) => emails.indexOf(email) !== index);
      console.log(`   Duplicates: ${[...new Set(duplicates)].join(", ")}`);
    } else {
      console.log(`\n✅ No duplicate emails found`);
    }
    
    // Test registration check
    console.log(`\n🔍 Testing email lookup...`);
    const testEmail = "test@example.com";
    const found = await User.findOne({ email: testEmail.toLowerCase() });
    console.log(`   Looking for: ${testEmail}`);
    console.log(`   Found: ${found ? found.email : "None"}`);
    
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

checkDatabase();

