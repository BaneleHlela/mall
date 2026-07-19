import { useAppDispatch } from '../../app/hooks';
import { updateSearchPostStats } from './searchPostSlice';
import type { SearchPost } from '../../types/searchPostTypes';

// likelihoodIndex is a server-computed ranking signal — never send it from the client
export const useSearchPostClickTracking = (searchPost: SearchPost) => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(updateSearchPostStats({
      searchPostId: searchPost._id,
      stats: { clicks: 1 },
    }));
  };
};

export default useSearchPostClickTracking;
