import React from 'react';
import { FiEdit2, FiTrash2, FiUser } from 'react-icons/fi';

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
  const initials = `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      {/* Avatar Section */}
      <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
        {avatar ? (
          <img
            src={avatar}
            alt={fullName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {initials || <FiUser className="text-3xl" />}
          </div>
        )}
        
        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {deletable && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-red-500 hover:bg-white shadow-sm transition-all"
            >
              <FiTrash2 className="text-sm" />
            </button>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-purple-500 hover:bg-white shadow-sm transition-all"
          >
            <FiEdit2 className="text-sm" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-600 shadow-sm">
            {position}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col p-4">
        <h3 className="font-semibold text-slate-800 text-base truncate">
          {fullName}
        </h3>
        {about && (
          <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {about}
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;
