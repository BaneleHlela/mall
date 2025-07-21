import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import AddTeamMemberModal from "../../../components/store_dashboard/modals/AddTeamMemberModal";
import TeamMemberCard from "../../../components/the_mall/store_dashboard/cards/TeamMemberCard";

const StoreTeam = () => {
  const store = useAppSelector((state) => state.storeAdmin.store);
  const [addPackageOpen, setAddPackageOpen] = useState(false);
  
  const teamMembers = store?.team || [];
  
  return (
    <div className="w-full h-full p-[.3vh]">
      <div className="w-full h-full bg-white rounded text-center flex flex-col items-center justify-start gap-4 p-4">
        <button
          className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-blue-700 transition-all"
          onClick={() => setAddPackageOpen(true)}
        >
          Add Member
        </button>

        {/* You can display current team members here if needed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center w-full">
          {teamMembers.map((member: any) => (
            <TeamMemberCard
              key={member._id}
              name={member.member}
              position={member.role}
              avatar={member.image}
              about={member.about || "Add about info here"}
            />
          ))}
        </div>


        <AddTeamMemberModal
          open={addPackageOpen}
          onClose={() => setAddPackageOpen(false)}
        />
      </div>
    </div>
  );
};

export default StoreTeam;
