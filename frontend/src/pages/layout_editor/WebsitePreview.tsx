import { useAppSelector } from '../../app/hooks';
import { store } from '../../app/store';
import StorePage from '../store/StorePage';


const WebsitePreview = ({storeId}: {storeId: string}) => {

  return (
    <div className='relative h-screen w-screen bg-stone-200 p-3'>
      <StorePage storeId={storeId}/>
    </div>
  );
};

export default WebsitePreview;
