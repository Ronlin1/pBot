import { useAuth } from "@pangeacyber/react-auth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile">
      <h1>Profile</h1>      
      <div>{user?.email}</div>
      <div>First Name: {user?.profile?.first_name}</div>
      <div>Last Name: {user?.profile?.last_name}</div>
      <div>Phone: {"...."}</div>
      <div>Token: {"pBot Vault"}</div>
      {/* <div>Token: {user?.active_token?.token}</div> */}
    </div>
  );
}

export default Profile;