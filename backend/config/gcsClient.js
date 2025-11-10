import { Storage } from "@google-cloud/storage";

const storage = new Storage({
    projectId: "mall-461908",
    keyFilename: "C:/Users/banel/Desktop/the_mall/secrets/mall-461908-71caa5f1648a.json", 
});

export const uploadsBucket = storage.bucket("the-mall-uploads-giza");


export const uploadToUploads = async (fileBuffer, destFileName) => {
    try {
      const file = uploadsBucket.file(destFileName);
      await file.save(fileBuffer, {
        resumable: true,
        metadata: {
          cacheControl: 'public, max-age=31536000',
        },
      });
      console.log(`${destFileName} uploaded to ${uploadsBucket.name}`);
    } catch (error) {
      console.error('Error uploading to the bucket:', error);
      throw new Error('Error uploading file');
    }
};

export const deleteFromUploads = async (filePath) => {
  await uploadsBucket.file(filePath).delete();
};
