import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Oauth() {
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      navigate('/');
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className="mt-2 py-3 px-6 w-full text-lg bg-gray-400 text-black border-none rounded-md cursor-pointer transition duration-300 hover:bg-gray-300"
    >
      CONTINUE WITH GOOGLE
    </button>
  );
}