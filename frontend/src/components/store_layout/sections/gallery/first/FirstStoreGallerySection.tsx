import { useEffect, useState } from 'react';
import axios from 'axios';

interface Image {
  url: string;
  category?: string;
  description?: string;
}

const FirstStoreGallerySection = ({ storeId }: { storeId: string }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(`http://localhost:5000/api/stores/${storeId}/gallery?page=${page}&limit=${limit}`);
      setImages(prev => [...prev, ...res.data.images]);
      setHasMore(res.data.hasMore);
    };

    fetchImages();
  }, [page]);

  return (
    <div className="gallery-container">
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={img.description || `Image ${index + 1}`}
            className="w-full h-full object-cover p-2"
          />
        ))}
      </div>

      {hasMore && (
        <button onClick={() => setPage(prev => prev + 1)} className="mt-4 px-4 py-2 bg-black text-white rounded">
          Load More
        </button>
      )}
    </div>
  );
};

export default FirstStoreGallerySection;