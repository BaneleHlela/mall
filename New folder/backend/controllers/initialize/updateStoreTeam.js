import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../../models/UserModel.js";
import Store from "../../models/StoreModel.js";

dotenv.config({ path: "../../../../.env" });

const updateStoreTeams = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to DB");

    const stores = await Store.find({});
    console.log(`📦 Found ${stores.length} stores`);

    for (const store of stores) {
      let updated = false;

      const newTeam = store.team.map((memberObj) => {
        // Check if member is already ObjectId
        if (memberObj.member instanceof mongoose.Types.ObjectId) {
          // If already ObjectId, check if has redundant fields
          if (memberObj.username || memberObj.firstName || memberObj.lastName) {
            updated = true;
            const { username, firstName, lastName, ...rest } = memberObj;
            return rest;
          }
          return memberObj;
        }

        // Convert member to ObjectId and remove redundant fields
        updated = true;
        const { username, firstName, lastName, ...rest } = memberObj;
        return {
          ...rest,
          member: mongoose.Types.ObjectId(memberObj.member),
        };
      });

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
