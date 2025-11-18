import HeaderTop from '@/components/global/HeaderTop';
import UserList from '@/components/manage-users/UserList';

const ManageUserPage = () => {
  return (
    <div>
      <HeaderTop
        title="Manage Users"
        text="View and manage all your users"
        link="/dashboard"
        linkText="Back to Dashboard"
      />
      <UserList />
    </div>
  );
};

export default ManageUserPage;
