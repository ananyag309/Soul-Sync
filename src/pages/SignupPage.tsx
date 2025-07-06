import { SignUp, useUser } from "@clerk/clerk-react"
import { useEffect } from "react"
import axios from "axios"

const SignupPage = () => {
  const { isSignedIn, user } = useUser()

  useEffect(() => {
    const syncUserWithMongo = async () => {
      if (isSignedIn && user) {
        try {
          await axios.post('http://localhost:3000/user/create', { //3000
            clerkId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.primaryEmailAddress?.emailAddress,
            profileImage: user.imageUrl
          })
        } catch (error) {
          console.error('Error syncing user:', error)
        }
      }
    }

    syncUserWithMongo()
  }, [isSignedIn, user])

  return (
    <div className='flex items-center justify-center h-screen'>
      <SignUp
        routing='path'
        path='/sign-up'
        signInUrl='/sign-in'
        forceRedirectUrl={'/profileCreation'}
      />
    </div>
  )
}

export default SignupPage