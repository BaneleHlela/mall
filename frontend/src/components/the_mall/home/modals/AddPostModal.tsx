import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { BiArrowBack } from 'react-icons/bi';

const AddPostModal = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.user);


    return (
        <div className='w-full h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50'>
            {/* Header */}
            <div className="relative flex items-center justify-center w-full h-fit py-2.5 border-b border-gray-300">
                <p className="text-center text-lg font-semibold">Add Post</p>
                <BiArrowBack onClick={() => {}} className={`absolute left-2 rounded-full p-2 text-[35px] bg-gray-200`}/>
            </div>
            {/* User and Add Post Button */}
            <div className="flex items-center justify-between w-full h-fit py-3 px-2">
                {/* User/Store name & Profile picture */}
                <div className="flex items-center gap-2">
                    <div className={`relative w-14 h-14 overflow-hidden rounded-full `}>
                        <img src={user?.avatar || 'https://storage.googleapis.com/the-mall-uploads-giza/users/default-profile-picture.png'} alt={user?.firstName} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-lg font-medium">{user?.firstName} {user?.lastName}</p>
                </div>
                {/* Add Post Button */}
                <button className="bg-blue-500 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-600">
                    Add Post
                </button>
            </div>
            {/* Input & Images preview area */}
            <div className="min-h-[35vh] border-b border-gray-300">
                {/* Input */}
                <div className="w-full h-fit py-3 px-4">
                    <textarea placeholder="What do you want to share?" className="w-full h-full border-gray-300 rounded-md focus:outline-none focus: focus:" />
                </div>
            </div>
            {/* Gallery/Images, Gif,  */}
        </div>
    )
}

export default AddPostModal