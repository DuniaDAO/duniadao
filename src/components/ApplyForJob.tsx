import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useGetUserSkills } from '../hooks/useContracts';
import { Briefcase, CheckCircle, XCircle } from 'lucide-react';

interface ApplyForJobProps {
  jobId: number;
  requiredSkills: string[];
  onApply: () => void;
}

const ApplyForJob: React.FC<ApplyForJobProps> = ({ jobId, requiredSkills, onApply }) => {
  const { address } = useAccount();
  const { data: userSkills } = useGetUserSkills(address!);
  const [proposal, setProposal] = useState('');

  const matchingSkills = userSkills?.filter(skill => 
    requiredSkills.includes(skill)
  ) || [];

  const skillMatch = (skill: string) => 
    userSkills?.includes(skill);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Briefcase className="h-5 w-5" />
        Apply for Job #{jobId}
      </h3>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Required Skills</h4>
        <div className="space-y-2">
          {requiredSkills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2">
              {skillMatch(skill) ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className={skillMatch(skill) ? 'text-green-700' : 'text-red-700'}>
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Proposal
          </label>
          <textarea
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
            rows={6}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Describe why you're the best fit for this job..."
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {matchingSkills.length}/{requiredSkills.length} required skills verified
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyForJob;