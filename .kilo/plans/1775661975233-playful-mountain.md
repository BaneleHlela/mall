# Plan: Refactor Home Page Post System for Dynamic Display

## Current State Analysis
- Home.tsx contains ~784 lines with hardcoded post JSX imports and rendering
- Posts are imported from SimplePosts.tsx as individual React components
- No algorithm for post ordering; fixed sequence in feed section
- PostInteraction component tracks likes/reviews/shares but not views
- No existing system for pinned posts or priority-based selection

## Goals
- Create dynamic post display system that feels "alive" with limited posts
- Implement simple algorithm: pinned posts first, then weighted random selection based on priority
- Track post views/interactions for personalization
- Maintain scalability for future complex algorithms and user-generated posts
- Reduce Home.tsx file size significantly

## Proposed Solution

### 1. Post Data Structure
Create a centralized post registry in a new file `frontend/src/data/posts.ts`:

```typescript
export interface PostData {
  id: string;
  component: React.ComponentType;
  priority: number; // 1-10, higher = more likely to appear
  pinned: boolean; // Always show at top
  category?: string; // For future filtering
  storeSlug?: string;
}

export const POSTS_REGISTRY: PostData[] = [
  {
    id: 'welcome-to-mall',
    component: WelcomeToTheMall,
    priority: 10,
    pinned: true,
    storeSlug: 'themall'
  },
  {
    id: 'not-ready-for-customers',
    component: NotReadyForCustomers,
    priority: 9,
    pinned: false,
    storeSlug: 'themall'
  },
  // ... all other posts with appropriate priorities
];
```

### 2. Post Selection Algorithm
Create `frontend/src/utils/postSelector.ts`:

```typescript
interface PostSelectorOptions {
  maxPosts: number;
  userId?: string;
}

export function selectPostsForHome(options: PostSelectorOptions): PostData[] {
  const { maxPosts, userId } = options;
  
  // Get seen post IDs from localStorage
  const seenPosts = getSeenPosts(userId);
  
  // Separate pinned and regular posts
  const pinnedPosts = POSTS_REGISTRY.filter(p => p.pinned);
  const regularPosts = POSTS_REGISTRY.filter(p => !p.pinned && !seenPosts.has(p.id));
  
  // Sort regular posts by priority (higher first) with some randomization
  const prioritizedPosts = regularPosts
    .sort((a, b) => {
      // Add random factor to priority to prevent always same order
      const aScore = a.priority + Math.random();
      const bScore = b.priority + Math.random();
      return bScore - aScore;
    });
  
  // Combine: pinned first, then top prioritized unseen posts
  const selectedPosts = [
    ...pinnedPosts,
    ...prioritizedPosts.slice(0, maxPosts - pinnedPosts.length)
  ];
  
  // Mark as seen (will be viewed)
  markPostsAsSeen(selectedPosts.map(p => p.id), userId);
  
  return selectedPosts;
}

function getSeenPosts(userId?: string): Set<string> {
  const key = userId ? `seenPosts_${userId}` : 'seenPosts_guest';
  const stored = localStorage.getItem(key);
  return stored ? new Set(JSON.parse(stored)) : new Set();
}

function markPostsAsSeen(postIds: string[], userId?: string): void {
  const key = userId ? `seenPosts_${userId}` : 'seenPosts_guest';
  const seen = getSeenPosts(userId);
  postIds.forEach(id => seen.add(id));
  localStorage.setItem(key, JSON.stringify([...seen]));
}
```

### 3. Home.tsx Refactor
Replace hardcoded feed section with dynamic rendering:

```typescript
// In Home.tsx
import { selectPostsForHome } from '../utils/postSelector';
import { POSTS_REGISTRY } from '../data/posts';

// In component
const selectedPosts = useMemo(() => 
  selectPostsForHome({ 
    maxPosts: 12, // Configurable limit
    userId: user?._id 
  }), 
  [user?._id]
);

// Replace entire feed section with:
<div className="space-y-[.6vh]">
  {selectedPosts.map((postData) => (
    <StorePostJSX
      key={postData.id}
      tipFor={getTipFor(postData)} // Helper to determine tip text
      jsx={<postData.component />}
      onModalOpen={setIsReviewsModalOpen}
      isFeedbackPost={isFeedbackPost(postData)}
      storeSlug={postData.storeSlug}
    />
  ))}
</div>
```

### 4. Migration Strategy
- Create POSTS_REGISTRY with all existing posts
- Assign priorities: Welcome (10), NotReadyForCustomers (9), LaunchDate (8), etc.
- Pin only WelcomeToTheMall initially
- Test with maxPosts = 15 to maintain similar density
- Gradually reduce as more posts are added

### 5. Future Extensibility
- Easy to add user-generated posts to registry
- Backend API can replace localStorage for seen tracking
- Priority can become dynamic based on engagement metrics
- Categories enable department filtering
- Algorithm can be swapped for ML-based recommendations

## Implementation Steps
1. Create post data structure and registry
2. Implement post selector utility
3. Refactor Home.tsx to use dynamic selection
4. Test with different user states (logged in/out)
5. Add configuration for max posts displayed

## Questions for Clarification
- What priority levels should each post have? (Current suggestion: 1-10 scale)
- Which posts should be pinned besides WelcomeToTheMall?
- What should be the maximum number of posts displayed? (Suggestion: 12-15)
- Should randomization be more/less aggressive?
- Any special handling for different user types (vendors vs potential customers)?</content>
<parameter name="filePath">C:\Users\banel\Desktop\the_mall\.kilo\plans\1775661975233-playful-mountain.md