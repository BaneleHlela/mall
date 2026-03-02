import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../../models/UserModel.js";

dotenv.config({ path:  "../../../.env" });

const generateUsername = (firstName, lastName, id) => {
  // lowercase, alphanumeric only
  const base = `${firstName || "user"}${lastName || ""}`.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `${base}_${id.toString().slice(-4)}`;
};

const initializeUsernames = async () => {
  try {
    

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB");

    const usersWithoutUsername = await User.find({ username: { $exists: false } });

    console.log(`Found ${usersWithoutUsername.length} users without username`);

    for (const user of usersWithoutUsername) {
      const username = generateUsername(user.firstName, user.lastName, user._id);

      // Ensure uniqueness
      const existing = await User.findOne({ username });
      const finalUsername = existing ? `${username}_${Math.floor(Math.random() * 1000)}` : username;

      user.username = finalUsername;
      await user.save();
      console.log(`Updated user ${user.email} with username: ${finalUsername}`);
    }

    console.log("Username initialization complete.");
    process.exit();
  } catch (error) {
    console.error("Error initializing usernames:", error);
    process.exit(1);
  }
};

initializeUsernames();
