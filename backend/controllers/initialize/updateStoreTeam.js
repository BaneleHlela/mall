import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../../models/UserModel.js";
import Store from "../../models/StoreModel.js";

dotenv.config({ path: "../../../.env" });

const updateStoreTeams = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to DB");

    const stores = await Store.find({});
    console.log(`📦 Found ${stores.length} stores`);

    for (const store of stores) {
      let updated = false;

      const newTeam = await Promise.all(
        store.team.map(async (memberObj) => {
          // Skip if already has enriched data
          if (memberObj.username && memberObj.firstName && memberObj.lastName) {
            return memberObj;
          }

          const user = await User.findById(memberObj.member);
          if (!user) return memberObj;

          updated = true;
          return {
            ...memberObj,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.avatar || "",
            about: memberObj.about || "",
          };
        })
      );

      if (updated) {
        store.team = newTeam;
        await store.save();
        console.log(`✅ Updated store: ${store.name}`);
      }
    }

    console.log("🎉 All stores updated.");
    process.exit();
  } catch (err) {
    console.error("❌ Error updating store teams:", err);
    process.exit(1);
  }
};

updateStoreTeams();
