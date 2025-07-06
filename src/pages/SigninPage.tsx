import { SignIn, useSignIn, useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import axios from 'axios'

const SigninPage = () => {
  const { isSignedIn, user } = useUser()

  useEffect(() => {
    const syncUserWithMongo = async () => {
      if (isSignedIn && user) {
        try {
          const response = await axios.post('http://localhost:3000/user/create', { //3000
            clerkId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.primaryEmailAddress?.emailAddress,
            profileImage: user.imageUrl
          })
          console.log('User synced with MongoDB:', response.data)
        } catch (error) {
          console.error('Error syncing user:', error)
        }
      }
    }

    syncUserWithMongo()
  }, [isSignedIn, user])

  return (
    <div className='flex items-center justify-center h-screen'>
      <SignIn 
        routing='path'
        path='/sign-in'
        signUpUrl='/sign-up'
        forceRedirectUrl={'/'}
      />
    </div>
  )
}

export default SigninPage