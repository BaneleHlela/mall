import { RiLock2Fill } from 'react-icons/ri';

const FeatureLocked = ({comment}: { comment: string}) => {
  return (
    <div
        className='flex flex-col items-center justify-center w-full h-full backdrop-blur rounded-xl'
    >
        <RiLock2Fill className='text-[1000%]'/>
        <p className="text-center ">{comment}</p>
    </div>
  )
}

export default FeatureLocked;