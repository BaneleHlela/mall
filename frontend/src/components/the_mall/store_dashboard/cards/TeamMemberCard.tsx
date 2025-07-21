
interface TeamMemberCardProps {
  name: string;
  position: string;
  avatar?: string;
  about?: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, position, avatar, about }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 w-full max-w-xs text-center flex flex-col items-center gap-2">
      <img
        src={avatar || "/default-avatar.png"}
        alt={name}
        className="w-20 h-20 rounded-full object-cover"
      />
      <div className="font-semibold text-sm">{name}</div>
      <div className="text-xs text-gray-500">{position}</div>
      <div className="text-xs text-gray-500">{about}</div>
    </div>
  );
};

export default TeamMemberCard;
