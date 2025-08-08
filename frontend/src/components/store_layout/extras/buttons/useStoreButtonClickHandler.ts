import { useNavigate, useLocation, useParams } from 'react-router-dom';

type ActionType = 'services' | 'buy' | 'subscribe' | 'call' | 'book';

interface ButtonClickHandlerOptions {
  type: ActionType;
  routes: Record<string, any>;
  contactNumber: string;
}

export const useStoreButtonClickHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeId } = useParams(); // ✅ Get from router context
  const isHomePage = location.pathname === '/';

  return ({ type, routes, contactNumber }: ButtonClickHandlerOptions) => {
    if (!storeId) {
      console.error('storeId is missing from URL parameters');
      return;
    }


    switch (type) {
      case 'book':
        if (isHomePage) {
          window.location.hash = '#services';
        } else {
          navigate(`/stores/${storeId}/services`);
        }
        break;

      case 'buy':
        if (isHomePage) {
          window.location.hash = '#products';
        } else {
            console.log("Here")
          navigate(`/stores/${storeId}/products`);
        }
        break;

      case 'subscribe':
        if (isHomePage) {
          window.location.hash = '#packages';
        } else {
          navigate( `/stores/${storeId}/packages`);
        }
        break;

      case 'call':
        window.location.href = `tel:${contactNumber}`;
        break;

      default:
        console.warn(`Unhandled action type: ${type}`);
    }
  };
};
