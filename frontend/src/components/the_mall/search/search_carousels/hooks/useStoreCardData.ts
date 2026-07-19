import { useAppDispatch, useAppSelector } from '../../../../../app/hooks.ts';
import { updateUser } from '../../../../../features/user/userSlice.ts';
import { calculateDistanceToStore, formatDistance } from '../../../home/store_card/supporting/calculateDistance.ts';
import { getStoreStatus, getStoreStatusBadgeColorClasses } from '../../../home/store_card/supporting/storeStatus.ts';
import type { Store } from '../../../../../types/storeTypes.ts';

interface UseStoreCardDataOptions {
  onRemoveFavorite?: () => void;
  onNoUser: () => void;
}

export const useStoreCardData = (store: Store, options: UseStoreCardDataOptions) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const distance = user ? calculateDistanceToStore(user, store) : null;
  const distanceText = formatDistance(distance);
  const storeStatus = getStoreStatus(store.operationTimes, store.manualStatus);
  const statusColorClass = getStoreStatusBadgeColorClasses(storeStatus);
  const isFavorite = !!user?.favourites?.stores?.includes(store._id!);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      options.onNoUser();
      return;
    }

    dispatch(
      updateUser({ // @ts-ignore-next-line
        user: user._id,
        favoriteStore: store._id,
      })
    );

    options.onRemoveFavorite?.();
  };

  return { distanceText, storeStatus, statusColorClass, isFavorite, handleFavoriteClick };
};

export default useStoreCardData;
