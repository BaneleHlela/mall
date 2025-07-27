import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import AddTeamMemberModal from "../../../components/store_dashboard/modals/AddTeamMemberModal";
import TeamMemberCard from "../../../components/the_mall/store_dashboard/cards/TeamMemberCard";
import { deleteTeamMember } from "../../../features/store_admin/storeAdminSlice";
import Swal from "sweetalert2";
import EditTeamMemberModal from "../../../components/store_dashboard/modals/EditTeamMemberModal";


const StoreTeam = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);
  const [addPackageOpen, setAddPackageOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  
  const teamMembers = store?.team || [];

  const handleDelete = async (username: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This team member will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed && store?._id) {
      dispatch(deleteTeamMember({ storeId: store._id, username }));
    }
  };

  
  return (
    <div className="w-full h-full p-[.3vh]">
      <div className="w-full h-full bg-white rounded text-center flex flex-col items-center justify-start gap-[1.2vh] p-[1.2vh]">
        <div className="h-[8%] flex flex-col items-center justify-center">
          <button
            className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-blue-700 transition-all"
            onClick={() => setAddPackageOpen(true)}
          >
            Add Member
          </button>
        </div>
        
        <span className="w-full h-[.1vh] bg-black"></span>
        <div className="w-full h-[90%] overflow-y-scroll hide-scrollbar">
          {/* You can display current team members here if needed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center w-full">
            {teamMembers.map((member: any) => (
              <TeamMemberCard
                key={member._id}
                firstName={member.firstName || "First"}
                lastName={member.lastName || "Last"}
                position={member.role}
                avatar={member.image}
                deletable={teamMembers.length > 1}
                about={member.about || "Add about info here"}
                onDelete={() => handleDelete(member.username)}
                onEdit={() => {
                  setEditingMember(member);
                  setEditModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
        <AddTeamMemberModal
          open={addPackageOpen}
          onClose={() => setAddPackageOpen(false)}
        />
        {editingMember && (
          <EditTeamMemberModal
            open={editModalOpen}
            onClose={() => {
              setEditModalOpen(false);
              setEditingMember(null);
            }}
            member={editingMember}
        />
        )}
      </div>
    </div>
  );
};

export default StoreTeam;
