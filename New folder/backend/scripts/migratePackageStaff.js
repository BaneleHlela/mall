import mongoose from 'mongoose';
import Package from '../models/PackageModel.js';
import Store from '../models/StoreModel.js';


const MONGODB_URI = process.env.MONGODB_URL || 'mongodb+srv://gizahlela_db_user:nIc44vojis9UcY9V@cluster0.jf9trd5.mongodb.net/the_mall';

async function migratePackageStaff() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all packages that don't have staff populated or have empty staff array
    const packages = await Package.find({
      $or: [
        { staff: { $exists: false } },
        { staff: { $size: 0 } }
      ]
    });

    console.log(`Found ${packages.length} packages without staff`);

    let totalUpdated = 0;

    for (const pkg of packages) {
      // Find the store and get its team members (owners, managers, staff)
      const store = await Store.findById(pkg.store);
      
      if (!store) {
        console.log(`Store not found for package ${pkg._id}`);
        continue;
      }

      // Get team member IDs (owners, managers, and staff)
      const staffIds = store.team
        .filter(member => ['owner', 'manager', 'staff', 'admin'].includes(member.role))
        .map(member => member.member);

      if (staffIds.length === 0) {
        console.log(`No staff found for store of package ${pkg._id}`);
        continue;
      }

      // Update the package with staff IDs
      pkg.staff = staffIds;
      await pkg.save();
      
      totalUpdated++;
      console.log(`Updated package ${pkg._id} with ${staffIds.length} staff members`);
    }

    console.log(`Migration completed successfully! Updated ${totalUpdated} packages`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migratePackageStaff();
