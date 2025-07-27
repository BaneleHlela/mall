import React from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { TiUserDelete } from 'react-icons/ti';

interface TeamMemberCardProps {
  firstName: string;
  lastName: string;
  position: string;
  avatar?: string;
  about?: string;
  onDelete?: () => void;
  onEdit?: () => void;
  deletable?: boolean;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  firstName,
  lastName,
  position,
  avatar,
  about,
  onDelete,
  onEdit,
  deletable = true,
}) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="aspect-[3/5] bg-white border border-stone-200 rounded-xl shadow-md overflow-hidden flex flex-col">
      <div className="relative h-[72%] w-full">
        <img
          src={avatar || "/default-avatar.png"}
          alt={fullName}
          className="w-full h-full object-cover"
        />
        {/* Edit and Remove */}
        <div onClick={onEdit} className="absolute top-[.6vh] border-[.3vh] border-yellow-500 pr-[.6vh] pl-[.8vh] rounded-[.6vh] right-[.8vh] flex flex-row items-center justify-between space-x-[.6vh] hover:scale-108">
          {deletable && (
            <button onClick={onDelete} className="text-[3vh] hover:text-red-600">
              <TiUserDelete />
            </button>
          )}
          <button className="text-[2.8vh] rounded-full hover:text-green-600">
            <FaUserEdit  />
          </button>
        </div>
      </div>
      <div className="h-[28%] flex flex-col items-center justify-evenly text-center px-3 py-2">
        <div className="font-semibold text-[2.5vh] font-[Outfit]">{fullName}</div>
        <div className="text-[2.2vh] text-gray-500">{position}</div>
        <div style={{lineHeight: "1.1"}} className="text-[1.8vh] text-gray-500">{about}</div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
