import React from 'react';
import { Clock, DollarSign, Tag } from 'lucide-react';

const mockJobs = [
  {
    id: 1,
    title: 'Smart Contract Developer',
    description: 'Looking for an experienced Solidity developer to build DeFi protocols',
    budget: '5000 MATIC',
    duration: '3 months',
    skills: ['Solidity', 'Web3.js', 'React'],
    postedAt: '2 days ago'
  },
  {
    id: 2,
    title: 'Frontend Web3 Developer',
    description: 'Need a developer to build responsive Web3 interfaces with React',
    budget: '3000 MATIC',
    duration: '2 months',
    skills: ['React', 'TypeScript', 'Ethers.js'],
    postedAt: '1 day ago'
  },
  {
    id: 3,
    title: 'Blockchain Technical Writer',
    description: 'Create technical documentation for our Web3 platform',
    budget: '2000 MATIC',
    duration: '1 month',
    skills: ['Technical Writing', 'Blockchain', 'Documentation'],
    postedAt: '3 days ago'
  }
];

const JobList = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Latest Opportunities</h2>
        <div className="grid gap-6">
          {mockJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <p className="mt-2 text-gray-600">{job.description}</p>
                </div>
                <span className="text-sm text-gray-500">{job.postedAt}</span>
              </div>
              
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center text-gray-700">
                  <DollarSign className="h-5 w-5 mr-1" />
                  <span>{job.budget}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{job.duration}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                    >
                      <Tag className="h-4 w-4 mr-1" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;