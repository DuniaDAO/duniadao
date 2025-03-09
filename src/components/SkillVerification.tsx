import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useAddSkill, useGetUserSkills } from '../hooks/useContracts';
import { Award, Plus, Star } from 'lucide-react';

const SkillVerification = () => {
  const { address } = useAccount();
  const { data: userSkills } = useGetUserSkills(address!);
  const { write: addSkill, isLoading } = useAddSkill();
  const [newSkill, setNewSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState<number>(1);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill || skillLevel < 1 || skillLevel > 5) return;

    addSkill({
      args: [newSkill, BigInt(skillLevel)],
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Award className="h-6 w-6 text-indigo-600" />
        <h2 className="text-2xl font-bold">Skill Verification</h2>
      </div>

      <form onSubmit={handleAddSkill} className="mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Solidity"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proficiency Level
            </label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(Number(e.target.value))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value={1}>Beginner</option>
              <option value={2}>Elementary</option>
              <option value={3}>Intermediate</option>
              <option value={4}>Advanced</option>
              <option value={5}>Expert</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold mb-4">Your Verified Skills</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {userSkills?.map((skill, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">{skill}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < skillLevel
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillVerification;