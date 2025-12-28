import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadSingleFile = (fieldName) => upload.single(fieldName);

export const uploadSectionImages = upload.fields([
  { name: "mobile", maxCount: 1 },
  { name: "desktop", maxCount: 1 },
]);

export const uploadProductImages = upload.array("images", 5);

export const uploadServiceImages = upload.array("images", 3);

export const uploadRentalImages = upload.array("images", 3);

export const uploadDonationImages = upload.array("images", 5);

export const uploadTeamMemberImage = uploadSingleFile('image');
