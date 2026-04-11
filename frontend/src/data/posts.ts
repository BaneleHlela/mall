import React from 'react';
import {
  WelcomeToTheMall,
  MostImportantPoster,
  NoAyikhoPoster,
  WhatIsECommerce,
  VariousPosters,
  WhatIsMVP,
  MallStillBeta,
  YouCanInvest,
  LookOutForRedFlags,
  Diversify,
  WhyInvest,
  ImageConsentNotice,
  MallMVPAnnouncement,
  LaunchDate,
  Branding,
  ListOfSuppliersByChioma,
  FourFirstTimeSmallBusinessMistakes,
  HowToStartBusinessWhiteLabeling,
  BusinessAdviceForSmallBusiness,
  YCStartingCompanyKeyTerms,
  YCSalesPlaybook,
  YCStartupIdeas,
  YCCoFounderRelationships,
  SBDBusinessPlan,
  SBDBusinessStrategy,
  NotReadyForCustomers,
  OurRecommendedBook,
  LoansAndLaybuys,
  StoreServiceBidding,
  DoubleTapLikeButtonForReviews,
  CollaborateOrLearn,
  BuildABrandWithReadyTemplatesOrAI,
  AddYourOwnDomain,
  CustomersCanReviewEverything,
  SupplyChain,
  Scalability,
  HireABrandDesigner,
  AccountingVsEconomicProfit,
} from '../components/the_mall/home/posts/SimplePosts';
import FreePikPosters from '../components/the_mall/home/posts/FreePikPosters';
import MultipleLayoutsPost from '../components/the_mall/home/posts/MultipleLayoutsPost';

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
  {
    id: 'launch-date',
    component: LaunchDate,
    priority: 8,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'mvp-announcement',
    component: MallMVPAnnouncement,
    priority: 7,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'what-is-ecommerce',
    component: WhatIsECommerce,
    priority: 7,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'branding',
    component: Branding,
    priority: 6,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'supply-chain',
    component: SupplyChain,
    priority: 6,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'scalability',
    component: Scalability,
    priority: 6,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'you-can-invest',
    component: YouCanInvest,
    priority: 5,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'why-invest',
    component: WhyInvest,
    priority: 5,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'diversify',
    component: Diversify,
    priority: 5,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'look-out-for-red-flags',
    component: LookOutForRedFlags,
    priority: 5,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'accounting-vs-economic-profit',
    component: AccountingVsEconomicProfit,
    priority: 4,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'hire-a-brand-designer',
    component: HireABrandDesigner,
    priority: 4,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'customers-can-review-everything',
    component: CustomersCanReviewEverything,
    priority: 4,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'add-your-own-domain',
    component: AddYourOwnDomain,
    priority: 4,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'double-tap-for-reviews',
    component: DoubleTapLikeButtonForReviews,
    priority: 4,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'store-service-bidding',
    component: StoreServiceBidding,
    priority: 4,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'loans-and-laybuys',
    component: LoansAndLaybuys,
    priority: 4,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'collaborate-or-learn',
    component: CollaborateOrLearn,
    priority: 4,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'build-a-brand-with-ready-templates-or-ai',
    component: BuildABrandWithReadyTemplatesOrAI,
    priority: 4,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'our-recommended-book',
    component: OurRecommendedBook,
    priority: 4,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'list-of-suppliers-by-chioma',
    component: ListOfSuppliersByChioma,
    priority: 3,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'four-first-time-small-business-mistakes',
    component: FourFirstTimeSmallBusinessMistakes,
    priority: 3,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'how-to-start-business-white-labeling',
    component: HowToStartBusinessWhiteLabeling,
    priority: 3,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'business-advice-for-small-business',
    component: BusinessAdviceForSmallBusiness,
    priority: 3,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'yc-starting-company-key-terms',
    component: YCStartingCompanyKeyTerms,
    priority: 3,
    pinned: false,
    storeSlug: 'y-combinator'
  },
  {
    id: 'yc-sales-playbook',
    component: YCSalesPlaybook,
    priority: 3,
    pinned: false,
    storeSlug: 'y-combinator'
  },
  {
    id: 'yc-startup-ideas',
    component: YCStartupIdeas,
    priority: 3,
    pinned: false,
    storeSlug: 'y-combinator'
  },
  {
    id: 'yc-cofounder-relationships',
    component: YCCoFounderRelationships,
    priority: 3,
    pinned: false,
    storeSlug: 'y-combinator'
  },
  {
    id: 'sbd-business-plan',
    component: SBDBusinessPlan,
    priority: 3,
    pinned: false,
    storeSlug: 'small-business-development'
  },
  {
    id: 'sbd-business-strategy',
    component: SBDBusinessStrategy,
    priority: 3,
    pinned: false,
    storeSlug: 'small-business-development'
  },
  {
    id: 'most-important-poster',
    component: MostImportantPoster,
    priority: 3,
    pinned: false,
    storeSlug: 'mall-designs'
  },
  {
    id: 'no-ayikho-poster',
    component: NoAyikhoPoster,
    priority: 9,
    pinned: true,
    storeSlug: 'mall-designs'
  },
  {
    id: 'various-posters',
    component: VariousPosters,
    priority: 3,
    pinned: false,
    storeSlug: 'mall-designs'
  },
  {
    id: 'what-is-mvp',
    component: WhatIsMVP,
    priority: 2,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'mall-still-beta',
    component: MallStillBeta,
    priority: 2,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'image-consent',
    component: ImageConsentNotice,
    priority: 2,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'free-pik-posters',
    component: FreePikPosters,
    priority: 3,
    pinned: false,
    storeSlug: 'themall'
  },
  {
    id: 'multiple-layouts-post',
    component: MultipleLayoutsPost,
    priority: 3,
    pinned: false,
    storeSlug: 'themall'
  }
];