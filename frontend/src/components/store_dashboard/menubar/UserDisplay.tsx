import { useAppSelector } from "../../../app/hooks";
import { IoChevronDown } from "react-icons/io5";

const UserDisplay = () => {
    const user = useAppSelector((state) => state.user.user);
    const store = useAppSelector((state) => state.storeAdmin.store);

    // Find the user's role in the store's team array
    const userRole = store?.team?.find((teamMember) => teamMember.member === user?._id as any)?.role;

    // Get user initials for avatar fallback
    const userInitials = user 
      ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
      : '?';

    return (
        <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 transition-colors">
            {/* Avatar */}
            <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
                    <img 
                        src="https://storage.googleapis.com/the-mall-uploads-giza/stores/682eff789260b810aeba2c5f/images/black_woman.png"
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
            </div>
            
            {/* User Info - Desktop only */}
            <div className="hidden lg:flex flex-col items-start">
                <span className="font-semibold text-slate-800 text-sm">
                    {user?.firstName} {user?.lastName}
                </span>
                <span className="text-xs text-slate-400 capitalize">
                    {userRole || 'Member'}
                </span>
            </div>
            
            {/* Dropdown Arrow - Desktop only */}
            <IoChevronDown className="hidden lg:block text-slate-400 text-sm" />
        </button>
    );
};

export default UserDisplay;