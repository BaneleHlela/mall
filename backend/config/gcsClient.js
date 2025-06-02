import { Storage } from "@google-cloud/storage";

const storage = new Storage({
    projectId: "the-mall-440813",
    keyFilename: "C:/Users/banel/Desktop/the_mall/secrets/the-mall-440813-25bf86cf94b3.json"
});

export const uploadsBucket = storage.bucket("the-mall-uploads-giza69");


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