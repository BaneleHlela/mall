import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import type { AppDispatch } from '../../app/store';
import { updateSetting } from '../../features/layouts/layoutSettingsSlice';

const MySwal = withReactContent(Swal);

type HandleDeleteClickParams = {
  sectionKey: string;            // e.g. "footer", "about", etc.
  path: string;                  // e.g. "routes.home.contains" or "routes.services.contains"
  currentSections: string[];    // current sections list (from Redux)
  dispatch: AppDispatch;        // your redux dispatch
};

export const createHandleDeleteClick = ({
  sectionKey,
  path,
  currentSections,
  dispatch,
}: HandleDeleteClickParams) => {
  return () => {
    MySwal.fire({
      title: `Delete "${sectionKey}"?`,
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = currentSections.filter((sec) => sec !== sectionKey);
        dispatch(updateSetting({
          field: path,
          value: updated,
        }));
      }
    });
  };
};
