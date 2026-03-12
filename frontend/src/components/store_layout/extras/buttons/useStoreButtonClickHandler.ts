import { useNavigate, useLocation, useParams } from 'react-router-dom';

type ActionType = 'services' | 'buy' | 'subscribe' | 'call' | 'book' | 'email' | 'shop' | 'packages' | 'whatsapp';

interface ButtonClickHandlerOptions {
  storeSlug: string;
  type: ActionType;
  routes: Record<string, any>;
  contactNumber?: string;
  contactEmail?: string;
}

export const useStoreButtonClickHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { layoutId } = useParams<{ layoutId: string }>();

  const isHomePage = location.pathname === '/';
  const isLayoutRoute = location.pathname.startsWith('/layouts') && layoutId;

  return ({ type, routes, contactNumber, contactEmail, storeSlug }: ButtonClickHandlerOptions) => {
    if (!storeSlug && !isLayoutRoute) {
      console.error('storeSlug is missing and you are not inside a layout route');
      return;
    }

    switch (type) {
      /* ---------------------------------------
         BOOK  → services page
      ---------------------------------------- */
      case 'book':
      case 'services':
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
      case 'buy':
      case 'shop':
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
      case 'subscribe':
      case 'packages':
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
         EMAIL  → mailto: link
      ---------------------------------------- */
      case 'email':
        if (!contactEmail) {
          console.error('Missing contactEmail');
          return;
        }
        console.log(`Opening email client for: ${contactEmail}`);
        window.location.href = `mailto:${contactEmail}`;
        break;


      /* ---------------------------------------
         WHATSAPP  → wa.me link
      ---------------------------------------- */
      case 'whatsapp':
        if (!contactNumber) {
          console.error('Missing contactNumber');
          return;
        }

        // Remove non-digit characters
        let cleanNumber = contactNumber.replace(/\D/g, '');

        // If number starts with 0 (local SA format), replace with country code 27
        if (cleanNumber.startsWith('0')) {
          cleanNumber = '27' + cleanNumber.substring(1);
        }

        // If number doesn't already start with 27, prepend it
        if (!cleanNumber.startsWith('27')) {
          cleanNumber = '27' + cleanNumber;
        }

        window.location.href = `https://wa.me/${cleanNumber}`;
        break;


      /* ---------------------------------------
         FALLBACK
      ---------------------------------------- */
      default:
        console.warn(`Unhandled action type: ${type}`);
    }
  };
};
