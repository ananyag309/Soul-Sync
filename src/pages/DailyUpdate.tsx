import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

interface DailyUpdateData {
    waterIntake: number;
    sleepHours: number;
    meditationMinutes: number;
    physicalActivityMinutes: number;
}

const DailyUpdate: React.FC = () => {
    const { user } = useUser();
    const [formData, setFormData] = useState<DailyUpdateData>({
        waterIntake: 0,
        sleepHours: 0,
        meditationMinutes: 0,
        physicalActivityMinutes: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: Number(value)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        
        try {
            await axios.post(
                `http://localhost:3000/user/${user?.primaryEmailAddress?.emailAddress}/daily-update`, //3000
                formData
            );
            alert('Daily update submitted successfully!');
            setFormData({
                waterIntake: 0,
                sleepHours: 0,
                meditationMinutes: 0,
                physicalActivityMinutes: 0,
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit update');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Daily Wellness Update</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Water Intake (glasses)</label>
                    <input
                        type="number"
                        name="waterIntake"
                        value={formData.waterIntake}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        min="0"
                    />
                </div>
                <div>
                    <label className="block mb-2">Sleep Hours</label>
                    <input
                        type="number"
                        name="sleepHours"
                        value={formData.sleepHours}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        min="0"
                        max="24"
                    />
                </div>
                <div>
                    <label className="block mb-2">Meditation (minutes)</label>
                    <input
                        type="number"
                        name="meditationMinutes"
                        value={formData.meditationMinutes}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        min="0"
                    />
                </div>
                <div>
                    <label className="block mb-2">Physical Activity (minutes)</label>
                    <input
                        type="number"
                        name="physicalActivityMinutes"
                        value={formData.physicalActivityMinutes}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        min="0"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Submit Daily Update
                </button>
            </form>
        </div>
    );
};

export default DailyUpdate;