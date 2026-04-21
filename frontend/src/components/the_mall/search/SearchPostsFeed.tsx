import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import RenderSearchPost from './RenderSearchPost';
import type { SearchPost } from '../../../types/searchPostTypes';

const SearchPostsFeed = () => {
  const searchPosts = useAppSelector(
    (state) => state.searchPosts.searchPostsByTypes
  );

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