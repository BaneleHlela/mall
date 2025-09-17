import { useAppSelector } from "../../../app/hooks";

const UserDisplay = () => {
    const user = useAppSelector((state) => state.user.user);
    const store = useAppSelector((state) => state.storeAdmin.store);

    // Find the user's role in the store's team array
    const userRole = store?.team?.find((teamMember) => teamMember.member === user?._id as any)?.role;

    return (
        <div className="h-full flex flex-row justify-center">
            {/*  */}
            <div
                className="flex flex-col justify-center"
            >
                <img 
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/682eff789260b810aeba2c5f/images/black_woman.png"
                    alt="Profile Photo" className="h-[5vh] aspect-square border-[.1vh] border-gray-700 rounded-[100%] mr-2 object-cover"
                />
            </div>
            <div className="h-full hidden lg:flex flex-col justify-center ">
                <p className="font-[600]">
                    {user?.lastName} {user?.firstName[0]}
                </p>
                <p className="font-[300]">
                    {userRole}
                </p>
            </div>
        </div>
    );
};

export default UserDisplay;