
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const AllUsers = () => {
    
 
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
        const res = await axiosSecure.get('/users');
        return res.data;
    }
})
const handleBlock = async (userId) => {
    try {
        const res = await axiosSecure.patch(`/users/block/${userId}`);
        if (res.data.user) {  // ✅ Check if Prisma updated the user
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User has been blocked!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        console.error("Error blocking user:", error);
    }
};

const handleUnblock = async (userId) => {
    try {
        const res = await axiosSecure.patch(`/users/unblock/${userId}`);
        if (res.data.user) {  // ✅ Check if Prisma updated the user
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User has been unblocked!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        console.error("Error unblocking user:", error);
    }
};

    return (
        <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.isBlocked ? "Blocked" : "Active"}</td>
              <td>
                {u.isBlocked ? (
                  <button className="btn btn-success" onClick={() => handleUnblock(u.id)}>Unblock</button>
                ) : (
                  <button className="btn btn-error" onClick={() => handleBlock(u.id)}>Block</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default AllUsers;