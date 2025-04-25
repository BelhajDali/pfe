interface User {
  email: string;
}

interface AdminPanelProps {
  users: User[];
  onEdit: (email: string) => void;
}

const AdminPanel = ({ users, onEdit }: AdminPanelProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left pb-4 text-gray-600">User</th>
              <th className="text-right pb-4 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.email}>
                <td className="py-3">{user.email}</td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => onEdit(user.email)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel; 