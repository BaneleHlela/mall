import { useNavigate, useLocation, useParams } from 'react-router-dom';

type ActionType = 'services' | 'buy' | 'subscribe' | 'call' | 'book';

interface ButtonClickHandlerOptions {
  storeSlug: string;
  type: ActionType;
  routes: Record<string, any>;
  contactNumber: string;
}

export const useStoreButtonClickHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { layoutId } = useParams<{ layoutId: string }>();

  const isHomePage = location.pathname === '/';
  const isLayoutRoute = location.pathname.startsWith('/layouts') && layoutId;

  return ({ type, routes, contactNumber, storeSlug }: ButtonClickHandlerOptions) => {
    if (!storeSlug && !isLayoutRoute) {
      console.error('storeSlug is missing and you are not inside a layout route');
      return;
    }

    switch (type) {
      /* ---------------------------------------
         BOOK  → services page
      ---------------------------------------- */
      case 'book' || 'services':
        if (isHomePage) {
          window.location.hash = '#services';
        } else if (isLayoutRoute) {
          navigate(`/layouts/${layoutId}/preview/preview/services`);
        } else {
          navigate(`/stores/${storeSlug}/services`);
        }
        break;


      /* ---------------------------------------
         BUY  → products page
      ---------------------------------------- */
      case 'buy' || 'shop':
        if (isHomePage) {
          window.location.hash = '#products';
        } else if (isLayoutRoute) {
          navigate(`/layouts/${layoutId}/preview/preview/products`);
        } else {
          navigate(`/stores/${storeSlug}/products`);
        }
        break;


      /* ---------------------------------------
         SUBSCRIBE  → packages page
      ---------------------------------------- */
      case 'subscribe' || 'packages':
        if (isHomePage) {
          window.location.hash = '#packages';
        } else if (isLayoutRoute) {
          navigate(`/layouts/${layoutId}/preview/packages`);
        } else {
          navigate(`/stores/${storeSlug}/packages`);
        }
        break;


      /* ---------------------------------------
         CALL  → tel: link
      ---------------------------------------- */
      case 'call':
        if (!contactNumber) {
          console.error('Missing contactNumber');
          return;
        }
        window.location.href = `tel:${contactNumber}`;
        break;


      /* ---------------------------------------
         FALLBACK
      ---------------------------------------- */
      default:
        console.warn(`Unhandled action type: ${type}`);
    }
  };
};
