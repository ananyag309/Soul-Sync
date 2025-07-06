import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useState, FormEvent } from 'react';

const Profile = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        gender: "",
        age: "",
        profession: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/create', { //3000
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clerkId: user?.id,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    email: user?.primaryEmailAddress?.emailAddress,
                    profileImage: user?.imageUrl,
                    ...formData,
                    age: parseInt(formData.age)
                })
            });

            if (response.ok) {
                alert('Profile saved successfully!');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-xl shadow-lg">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Complete Your Profile
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            disabled
                            value={user?.primaryEmailAddress?.emailAddress ?? ''}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            disabled
                            value={user?.fullName ?? ''}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Age
                        </label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            min="1"
                            max="120"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Profession
                        </label>
                        <input
                            type="text"
                            name="profession"
                            value={formData.profession}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;