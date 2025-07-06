
import { SignedIn, UserProfile } from '@clerk/clerk-react'
import Wrapper from '../components/Wrapper'

const ProfilePage = () => {
  return (
    <Wrapper>
        <SignedIn>
            <UserProfile/>
        </SignedIn>
    </Wrapper>
  )
}

export default ProfilePage