import { useParams } from 'react-router-dom';
import StorePage from '../store/StorePage';
import { useAppSelector } from '../../app/hooks';

const CaptureLayout = () => {
    const storeId = useAppSelector(state => state.layoutSettings.store);

    if (!storeId) {
        return <>Store Not Found</>
    }

    return ( // @ts-ignore next-line
        <StorePage storeSlug={storeId} />
    )
};

export default CaptureLayout;