// backend/app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { Menu } from "./models/menu.model.js";

// Import routes
import authRoutes from "./routes/auth.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { recommendationRouter } from "./routes/recommendation.routes.js";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: "20kb" }));

// ✅ Connect Database and seed menu
const initializeApp = async () => {
  try {
    await connectDB();
    
    // Auto-seed menu if empty - using seed.js logic
    const seedMenuIfEmpty = async () => {
      try {
        const count = await Menu.countDocuments();
        if (count === 0) {
          console.log("🌱 Menu is empty, seeding default items...");
          try {
            // Import and use the seed data
            const seedModule = await import("./seed.js");
            const { menuItems } = seedModule;
            if (menuItems && menuItems.length > 0) {
              await Menu.insertMany(menuItems);
              console.log(`✅ Seeded ${menuItems.length} menu items with images`);
            } else {
              console.log("⚠️  No menu items found in seed.js");
            }
          } catch (importError) {
            console.error("❌ Error importing seed data:", importError.message);
            console.log("⚠️  Run 'npm run seed' manually to populate menu");
          }
        } else {
          console.log(`📋 Menu already has ${count} items`);
        }
      } catch (error) {
        console.error("❌ Error checking/seeding menu:", error);
      }
    };
    
    await seedMenuIfEmpty();
  } catch (error) {
    console.error("❌ Error initializing app:", error);
    process.exit(1);
  }
};

// Initialize app
initializeApp();

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/recommendations", recommendationRouter);

// ✅ Health Check Endpoint
app.get("/", (req, res) => {
  res.json({ 
    status: "success", 
    message: "🍔 Food Cafeteria Backend Running Successfully!",
    endpoints: {
      auth: "/api/auth",
      menu: "/api/menu",
      cart: "/api/cart",
      orders: "/api/orders",
      recommendations: "/api/recommendations"
    }
  });
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ 
    status: "error", 
    message: err.message || "Internal server error" 
  });
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    status: "error", 
    message: "Route not found" 
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
});
