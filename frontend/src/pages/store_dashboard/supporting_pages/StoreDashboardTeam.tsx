import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import AddTeamMemberModal from "../../../components/store_dashboard/modals/AddTeamMemberModal";
import TeamMemberCard from "../../../components/the_mall/store_dashboard/cards/TeamMemberCard";
import { deleteTeamMember } from "../../../features/store_admin/storeAdminSlice";
import Swal from "sweetalert2";
import EditTeamMemberModal from "../../../components/store_dashboard/modals/EditTeamMemberModal";
import ComingSoon from "../../../components/the_mall/ComingSoon";
import { FiUsers, FiPlus, FiUserPlus } from "react-icons/fi";


const StoreTeam = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);
  const [addPackageOpen, setAddPackageOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const ready = true;
  
  const teamMembers = store?.team || [];

  const handleDelete = async (username: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This team member will be removed from your store.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove!",
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-xl px-6',
        cancelButton: 'rounded-xl px-6'
      }
    });

    if (result.isConfirmed && store?.slug) {
      dispatch(deleteTeamMember({ storeSlug: store.slug, username }));
    }
  };

  if (!ready) {
    return (
      <div className="p-4 lg:p-6 h-full">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full overflow-hidden">
          <ComingSoon 
            message="Team management features are coming soon. You'll soon be able to add, edit, and manage your store staff here." 
            title="Coming Soon"
            icon={<FiUsers className="text-white text-[3vh]"/>}
          />
        </div>
      </div>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <div className="p-4 lg:p-6 h-full w-full min-h-full">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col items-center justify-center p-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-6 shadow-lg">
            <FiUserPlus className="text-3xl" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">No Team Members Yet</h2>
          <p className="text-slate-500 text-center max-w-md mb-6">
            Start building your team by adding members who will help you manage your store.
          </p>
          <button
            onClick={() => setAddPackageOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all shadow-sm hover:shadow-md"
          >
            <FiPlus className="text-lg" />
            Add First Member
          </button>
        </div>
        <AddTeamMemberModal
          open={addPackageOpen}
          onClose={() => setAddPackageOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-full p-3 h-full">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 lg:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <FiUsers className="text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Team</h1>
                <p className="text-sm text-slate-500">{teamMembers.length} member{teamMembers.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            
            <button
              onClick={() => setAddPackageOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all shadow-sm hover:shadow-md"
            >
              <FiPlus className="text-lg" />
              Add Member
            </button>
          </div>
        </div>

        {/* Team Grid */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {teamMembers.map((member: any) => (
              <TeamMemberCard
                key={member._id}
                firstName={member.member?.firstName || "First"}
                lastName={member.member?.lastName || "Last"}
                position={member.role}
                avatar={member.image}
                deletable={teamMembers.length > 1}
                about={member.about || "No bio added yet"}
                onDelete={() => handleDelete(member.member.username)}
                onEdit={() => {
                  setEditingMember(member);
                  setEditModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>

        {/* Modals */}
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
