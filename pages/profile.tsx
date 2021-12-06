
import { useUser } from 'utils/useUser';

const Profile = () => {

  const { user } = useUser();

  return (
    <div>
      This is Profile
    </div>
  )
}

export default Profile;