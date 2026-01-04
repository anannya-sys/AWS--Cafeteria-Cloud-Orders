// Seed script to populate menu items
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Menu } from "./models/menu.model.js";
import { connectDB } from "./config/db.js";

dotenv.config();

// Using Unsplash Source API for unique food images
// Each item gets a unique image based on its name
const getImageUrl = (itemName, category) => {
  // Create a unique search term from the item name
  const searchTerm = encodeURIComponent(itemName.toLowerCase().replace(/\s+/g, ','));
  // Use Unsplash Source API with search - this gives different images for each item
  return `https://source.unsplash.com/400x300/?${searchTerm},food`;
};



const menuItems = [
  // Pizza
  { name: "Margherita Pizza", price: 299, category: "Pizza", type: "veg", image: getImageUrl("Margherita Pizza", "Pizza"), description: "Classic cheese pizza with fresh basil" },
  { name: "Pepperoni Pizza", price: 349, category: "Pizza", type: "non-veg", image: getImageUrl("Pepperoni Pizza", "Pizza"), description: "Spicy pepperoni with mozzarella cheese" },
  { name: "Veg Supreme Pizza", price: 329, category: "Pizza", type: "veg", image: getImageUrl("Vegetable Supreme Pizza", "Pizza"), description: "Loaded with veggies and cheese" },
  { name: "BBQ Chicken Pizza", price: 379, category: "Pizza", type: "non-veg", image: getImageUrl("BBQ Chicken Pizza", "Pizza"), description: "BBQ chicken with red onions" },
  
  // Burgers
  { name: "Veg Burger", price: 149, category: "Burgers", type: "veg", image: getImageUrl("Vegetable Burger", "Burgers"), description: "Crispy veg patty with fresh veggies" },
  { name: "Chicken Burger", price: 199, category: "Burgers", type: "non-veg", image: getImageUrl("Chicken Burger", "Burgers"), description: "Juicy chicken patty with special sauce" },
  { name: "Classic Burger", price: 179, category: "Burgers", type: "veg", image: getImageUrl("Classic Burger", "Burgers"), description: "Traditional burger with lettuce and tomato" },
  { name: "Cheese Burger", price: 219, category: "Burgers", type: "non-veg", image: getImageUrl("Cheese Burger", "Burgers"), description: "Double cheese with beef patty" },
  { name: "Aloo Tikki Burger", price: 129, category: "Burgers", type: "veg", image: getImageUrl("Aloo Tikki Burger", "Burgers"), description: "Spiced potato patty burger" },
  
  // Rice
  { name: "Chicken Biryani", price: 249, category: "Rice", type: "non-veg", image: getImageUrl("Chicken Biryani", "Rice"), description: "Fragrant basmati rice with tender chicken" },
  { name: "Veg Biryani", price: 199, category: "Rice", type: "veg", image: getImageUrl("Vegetable Biryani", "Rice"), description: "Aromatic rice with mixed vegetables" },
  { name: "Mutton Biryani", price: 299, category: "Rice", type: "non-veg", image: getImageUrl("Mutton Biryani", "Rice"), description: "Rich mutton biryani with spices" },
  { name: "Egg Biryani", price: 179, category: "Rice", type: "non-veg", image: getImageUrl("Egg Biryani", "Rice"), description: "Biryani with boiled eggs" },
  
  // Curry
  { name: "Butter Chicken", price: 329, category: "Curry", type: "non-veg", image: getImageUrl("Butter Chicken", "Curry"), description: "Creamy tomato-based curry" },
  { name: "Paneer Tikka", price: 279, category: "Curry", type: "veg", image: getImageUrl("Paneer Tikka", "Curry"), description: "Grilled paneer in spicy masala" },
  { name: "Chicken Curry", price: 289, category: "Curry", type: "non-veg", image: getImageUrl("Chicken Curry", "Curry"), description: "Traditional chicken curry" },
  { name: "Dal Makhani", price: 199, category: "Curry", type: "veg", image: getImageUrl("Dal Makhani", "Curry"), description: "Creamy black lentils" },
  
  // Pasta
  { name: "Pasta Carbonara", price: 249, category: "Pasta", type: "non-veg", image: getImageUrl("Pasta Carbonara", "Pasta"), description: "Creamy pasta with bacon" },
  { name: "Pasta Alfredo", price: 229, category: "Pasta", type: "veg", image: getImageUrl("Pasta Alfredo", "Pasta"), description: "Creamy white sauce pasta" },
  { name: "Arrabbiata Pasta", price: 219, category: "Pasta", type: "veg", image: getImageUrl("Arrabbiata Pasta", "Pasta"), description: "Spicy tomato pasta" },
  { name: "Chicken Pasta", price: 259, category: "Pasta", type: "non-veg", image: getImageUrl("Chicken Pasta", "Pasta"), description: "Pasta with grilled chicken" },
  
  // Sides
  { name: "French Fries", price: 99, category: "Sides", type: "veg", image: getImageUrl("French Fries", "Sides"), description: "Crispy golden fries" },
  { name: "Onion Rings", price: 119, category: "Sides", type: "veg", image: getImageUrl("Onion Rings", "Sides"), description: "Crispy onion rings" },
  { name: "Chicken Wings", price: 199, category: "Sides", type: "non-veg", image: getImageUrl("Chicken Wings", "Sides"), description: "Spicy buffalo wings" },
  { name: "Mozzarella Sticks", price: 149, category: "Sides", type: "veg", image: getImageUrl("Mozzarella Sticks", "Sides"), description: "Fried cheese sticks" },
  
  // Salads
  { name: "Caesar Salad", price: 179, category: "Salads", type: "non-veg", image: getImageUrl("Caesar Salad", "Salads"), description: "Fresh romaine with caesar dressing" },
  { name: "Garden Salad", price: 149, category: "Salads", type: "veg", image: getImageUrl("Garden Salad", "Salads"), description: "Mixed greens and vegetables" },
  { name: "Greek Salad", price: 169, category: "Salads", type: "veg", image: getImageUrl("Greek Salad", "Salads"), description: "Mediterranean style salad" },
  
  // Wraps
  { name: "Chicken Wrap", price: 199, category: "Wraps", type: "non-veg", image: getImageUrl("Chicken Wrap", "Wraps"), description: "Grilled chicken wrap" },
  { name: "Veg Wrap", price: 159, category: "Wraps", type: "veg", image: getImageUrl("Vegetable Wrap", "Wraps"), description: "Fresh vegetable wrap" },
  { name: "Paneer Wrap", price: 179, category: "Wraps", type: "veg", image: getImageUrl("Paneer Wrap", "Wraps"), description: "Spiced paneer wrap" },
  { name: "Chicken Caesar Wrap", price: 219, category: "Wraps", type: "non-veg", image: getImageUrl("Chicken Caesar Wrap", "Wraps"), description: "Caesar salad in a wrap" },
  
  // South Indian
  { name: "Masala Dosa", price: 89, category: "South Indian", type: "veg", image: getImageUrl("Masala Dosa", "South Indian"), description: "Crispy dosa with potato filling" },
  { name: "Plain Dosa", price: 69, category: "South Indian", type: "veg", image: getImageUrl("Plain Dosa", "South Indian"), description: "Crispy plain dosa" },
  { name: "Idli Sambar", price: 79, category: "South Indian", type: "veg", image: getImageUrl("Idli Sambar", "South Indian"), description: "Steamed rice cakes with sambar" },
  { name: "Uttapam", price: 99, category: "South Indian", type: "veg", image: getImageUrl("Uttapam", "South Indian"), description: "Thick dosa with toppings" },
  
  // Coffee
  { name: "Cappuccino", price: 129, category: "Coffee", type: "veg", image: getImageUrl("Cappuccino", "Coffee"), description: "Espresso with steamed milk foam" },
  { name: "Espresso", price: 99, category: "Coffee", type: "veg", image: getImageUrl("Espresso", "Coffee"), description: "Strong Italian coffee" },
  { name: "Latte", price: 139, category: "Coffee", type: "veg", image: getImageUrl("Latte", "Coffee"), description: "Smooth espresso with milk" },
  { name: "Americano", price: 109, category: "Coffee", type: "veg", image: getImageUrl("Americano", "Coffee"), description: "Espresso with hot water" },
  { name: "Mocha", price: 149, category: "Coffee", type: "veg", image: getImageUrl("Mocha", "Coffee"), description: "Chocolate coffee delight" },
  
  // Noodles
  { name: "Veg Noodles", price: 179, category: "Noodles", type: "veg", image: getImageUrl("Vegetable Noodles", "Noodles"), description: "Stir-fried vegetable noodles" },
  { name: "Chicken Noodles", price: 219, category: "Noodles", type: "non-veg", image: getImageUrl("Chicken Noodles", "Noodles"), description: "Spicy chicken noodles" },
  { name: "Hakka Noodles", price: 199, category: "Noodles", type: "veg", image: getImageUrl("Hakka Noodles", "Noodles"), description: "Indo-Chinese style noodles" },
  
  // Sandwiches
  { name: "Grilled Cheese Sandwich", price: 149, category: "Sandwiches", type: "veg", image: getImageUrl("Grilled Cheese Sandwich", "Sandwiches"), description: "Melted cheese sandwich" },
  { name: "Chicken Sandwich", price: 189, category: "Sandwiches", type: "non-veg", image: getImageUrl("Chicken Sandwich", "Sandwiches"), description: "Grilled chicken sandwich" },
  { name: "Club Sandwich", price: 219, category: "Sandwiches", type: "non-veg", image: getImageUrl("Club Sandwich", "Sandwiches"), description: "Triple decker sandwich" },
  
  // Desserts
  { name: "Chocolate Brownie", price: 129, category: "Desserts", type: "veg", image: getImageUrl("Chocolate Brownie", "Desserts"), description: "Fudgy chocolate brownie" },
  { name: "Ice Cream Sundae", price: 149, category: "Desserts", type: "veg", image: getImageUrl("Ice Cream Sundae", "Desserts"), description: "Vanilla ice cream with toppings" },
  { name: "Cheesecake", price: 179, category: "Desserts", type: "veg", image: getImageUrl("Cheesecake", "Desserts"), description: "Creamy New York style cheesecake" },
  
  // Drinks
  { name: "Fresh Lime Soda", price: 79, category: "Drinks", type: "veg", image: getImageUrl("Lime Soda", "Drinks"), description: "Refreshing lime drink" },
  { name: "Mango Shake", price: 99, category: "Drinks", type: "veg", image: getImageUrl("Mango Shake", "Drinks"), description: "Creamy mango milkshake" },
  { name: "Orange Juice", price: 89, category: "Drinks", type: "veg", image: getImageUrl("Orange Juice", "Drinks"), description: "Fresh orange juice" },
];

// Export menuItems for use in app.js
export { menuItems };

async function seedMenu() {
  try {
    await connectDB();
    console.log("🌱 Starting to seed menu items...");

    // Clear existing menu items
    await Menu.deleteMany({});
    console.log("✅ Cleared existing menu items");

    // Insert new menu items
    const insertedItems = await Menu.insertMany(menuItems);
    console.log(`✅ Successfully seeded ${insertedItems.length} menu items`);

    // Display the items
    console.log("\n📋 Menu Items:");
    insertedItems.forEach((item) => {
      console.log(`  - ${item.name} (₹${item.price}) - ${item.category} [${item.type}]`);
    });

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding menu:", error);
    mongoose.connection.close();
    process.exit(1);
  }
}

seedMenu();

