import ProfileComponent from "../components/ProfileComponent";
import AppWrapper from "../components/AppWrapper";
const ProfilePage = () => {
  return (
    <>
      <AppWrapper />
      <div className="flex justify-center">
        <ProfileComponent />
      </div>
    </>
  );
};

export default ProfilePage;
