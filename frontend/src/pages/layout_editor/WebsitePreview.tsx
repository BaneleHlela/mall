import { useAppSelector } from '../../app/hooks';
import { store } from '../../app/store';
import StorePage from '../store/StorePage';


const WebsitePreview = ({storeSlug}: {storeSlug: string}) => {

  return (
    <div className='relative h-screen w-screen bg-stone-200'>
      <StorePage storeSlug={storeSlug}/>
    </div>
  );
};

export default WebsitePreview;
