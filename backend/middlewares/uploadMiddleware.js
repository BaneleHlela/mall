import multer from 'multer';

const storage = multer.memoryStorage();

export const uploadSingleFile = (fieldName) => multer({ storage }).single(fieldName);
