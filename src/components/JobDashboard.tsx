import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useGetJob } from '../hooks/useContracts';
import { Calendar, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';

const JobDashboard = () => {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState<'posted' | 'applied'>('posted');

  // Mock data - replace with actual contract calls
  const postedJobs = [
    {
      id: 1,
      title: 'Smart Contract Developer',
      budget: '5000',
      duration: '30',
      status: 'active',
      applications: 3,
    },
    {
      id: 2,
      title: 'Frontend Developer',
      budget: '3000',
      duration: '20',
      status: 'completed',
      applications: 5,
    },
  ];

  const appliedJobs = [
    {
      id: 3,
      title: 'Blockchain Developer',
      budget: '4000',
      duration: '25',
      status: 'pending',
      clientAddress: '0x1234...5678',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Job Dashboard</h2>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('posted')}
              className={`${
                activeTab === 'posted'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Posted Jobs
            </button>
            <button
              onClick={() => setActiveTab('applied')}
              className={`${
                activeTab === 'applied'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Applied Jobs
            </button>
          </nav>
        </div>
      </div>

      <div className="grid gap-6">
        {activeTab === 'posted'
          ? postedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center text-gray-500">
                        <DollarSign className="h-5 w-5 mr-1" />
                        <span>{job.budget} MATIC</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-5 w-5 mr-1" />
                        <span>{job.duration} days</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        job.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {job.status === 'active' ? (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-1" />
                      )}
                      {job.status}
                    </span>
                    <span className="mt-2 text-sm text-gray-500">
                      {job.applications} applications
                    </span>
                  </div>
                </div>
              </div>
            ))
          : appliedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center text-gray-500">
                        <DollarSign className="h-5 w-5 mr-1" />
                        <span>{job.budget} MATIC</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-5 w-5 mr-1" />
                        <span>{job.duration} days</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Client: {job.clientAddress}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default JobDashboard;