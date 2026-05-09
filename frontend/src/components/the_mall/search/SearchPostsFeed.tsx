import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import RenderSearchPost from './RenderSearchPost';
import type { SearchPost } from '../../../types/searchPostTypes';

const SearchPostsFeed = () => {
  const searchPosts = useAppSelector(
    (state) => state.searchPosts.searchPostsByTypes
  );
  const isLoading = useAppSelector(state => state.searchPosts.isLoading);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-[10vh]">
        <div className="w-[5vh] h-[5vh] border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        <p className="mt-[2vh] text-gray-500 text-[1.6vh]">Loading posts...</p>
      </div>
    )
  }

  return (
    <div className='space-y-2'>
      {Object.values(searchPosts).map((searchPost) => (
        <RenderSearchPost
          key={(searchPost as SearchPost)._id}
          searchPost={searchPost as SearchPost}
          variation={(searchPost as SearchPost).variation}
        />
      ))}
    </div>
  );
};

export default SearchPostsFeed;