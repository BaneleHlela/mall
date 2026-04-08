import { type PostData, POSTS_REGISTRY } from '../data/posts';

interface PostSelectorOptions {
  maxPosts: number;
  userId?: string;
}

export function selectPostsForHome(options: PostSelectorOptions): PostData[] {
  const { maxPosts, userId } = options;

  // Separate pinned and regular posts
  const pinnedPosts = POSTS_REGISTRY.filter(p => p.pinned);
  const regularPosts = POSTS_REGISTRY.filter(p => !p.pinned);

  // Sort regular posts by priority (higher first) with some randomization
  const prioritizedPosts = regularPosts
    .sort((a, b) => {
      // Add random factor to priority to prevent always same order
      const aScore = a.priority + Math.random();
      const bScore = b.priority + Math.random();
      return bScore - aScore;
    });

  // Combine: pinned first, then top prioritized posts
  const selectedPosts = [
    ...pinnedPosts,
    ...prioritizedPosts.slice(0, maxPosts - pinnedPosts.length)
  ];

  return selectedPosts;
}

