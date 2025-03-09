import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface JobSearchProps {
  onSearch: (filters: JobFilters) => void;
}

export interface JobFilters {
  query: string;
  minBudget: string;
  maxBudget: string;
  skills: string[];
  duration: string;
}

const JobSearch: React.FC<JobSearchProps> = ({ onSearch }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<JobFilters>({
    query: '',
    minBudget: '',
    maxBudget: '',
    skills: [],
    duration: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleSkillInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      setFilters(prev => ({
        ...prev,
        skills: [...prev.skills, e.currentTarget.value]
      }));
      e.currentTarget.value = '';
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for jobs..."
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </button>
        </div>

        {isFiltersOpen && (
          <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Budget (MATIC)
                </label>
                <input
                  type="number"
                  value={filters.minBudget}
                  onChange={(e) => setFilters(prev => ({ ...prev, minBudget: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Budget (MATIC)
                </label>
                <input
                  type="number"
                  value={filters.maxBudget}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxBudget: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="No limit"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Required Skills
              </label>
              <input
                type="text"
                onKeyDown={handleSkillInput}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Press Enter to add skills"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {filters.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-indigo-600 hover:text-indigo-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <select
                value={filters.duration}
                onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Any duration</option>
                <option value="7">Up to 1 week</option>
                <option value="30">Up to 1 month</option>
                <option value="90">Up to 3 months</option>
                <option value="180">Up to 6 months</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search Jobs
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobSearch;