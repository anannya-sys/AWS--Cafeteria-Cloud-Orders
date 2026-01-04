// Script to update existing menu items with type and image fields
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Menu } from "./models/menu.model.js";
import { connectDB } from "./config/db.js";
import { menuItems } from "./seed.js";

dotenv.config();

// Using Unsplash Source API for unique food images
const getImageUrl = (itemName, category) => {
  const searchTerm = encodeURIComponent(itemName.toLowerCase().replace(/\s+/g, ','));
  return `https://source.unsplash.com/400x300/?${searchTerm},food`;
};

async function updateMenu() {
  try {
    await connectDB();
    console.log("🔄 Updating menu items...");

    // Delete all existing items
    await Menu.deleteMany({});
    console.log("✅ Cleared existing menu items");

    // Insert updated menu items
    const insertedItems = await Menu.insertMany(menuItems);
    console.log(`✅ Successfully updated ${insertedItems.length} menu items`);
    console.log(`   - Items with images: ${insertedItems.filter(i => i.image).length}`);
    console.log(`   - Items with type: ${insertedItems.filter(i => i.type).length}`);
    console.log(`   - Veg items: ${insertedItems.filter(i => i.type === 'veg').length}`);
    console.log(`   - Non-veg items: ${insertedItems.filter(i => i.type === 'non-veg').length}`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating menu:", error);
    mongoose.connection.close();
    process.exit(1);
  }
}

updateMenu();

