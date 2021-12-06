
import { useUser } from 'utils/useUser';

const Profile = () => {

  const { user } = useUser();

  return (
    <div>
      {user?.id}
    </div>
  )
}

export default Profile;