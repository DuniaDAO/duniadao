// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DuniaDAO {
    struct Job {
        uint256 id;
        address client;
        string title;
        string description;
        uint256 budget;
        uint256 duration;
        string[] skills;
        bool isActive;
        address freelancer;
        bool isCompleted;
    }

    struct Escrow {
        uint256 jobId;
        address client;
        address freelancer;
        uint256 amount;
        bool isReleased;
    }

    mapping(uint256 => Job) public jobs;
    mapping(uint256 => Escrow) public escrows;
    mapping(address => uint256[]) public clientJobs;
    mapping(address => uint256[]) public freelancerJobs;

    uint256 private jobCounter;
    
    event JobCreated(uint256 indexed jobId, address indexed client, string title, uint256 budget);
    event JobAssigned(uint256 indexed jobId, address indexed freelancer);
    event JobCompleted(uint256 indexed jobId);
    event FundsReleased(uint256 indexed jobId, address indexed freelancer, uint256 amount);

    modifier onlyClient(uint256 _jobId) {
        require(jobs[_jobId].client == msg.sender, "Not the client");
        _;
    }

    modifier onlyFreelancer(uint256 _jobId) {
        require(jobs[_jobId].freelancer == msg.sender, "Not the freelancer");
        _;
    }

    function createJob(
        string memory _title,
        string memory _description,
        uint256 _budget,
        uint256 _duration,
        string[] memory _skills
    ) external payable {
        require(msg.value == _budget, "Budget must match sent value");
        
        uint256 jobId = jobCounter++;
        
        jobs[jobId] = Job({
            id: jobId,
            client: msg.sender,
            title: _title,
            description: _description,
            budget: _budget,
            duration: _duration,
            skills: _skills,
            isActive: true,
            freelancer: address(0),
            isCompleted: false
        });

        escrows[jobId] = Escrow({
            jobId: jobId,
            client: msg.sender,
            freelancer: address(0),
            amount: msg.value,
            isReleased: false
        });

        clientJobs[msg.sender].push(jobId);
        
        emit JobCreated(jobId, msg.sender, _title, _budget);
    }

    function assignFreelancer(uint256 _jobId, address _freelancer) external onlyClient(_jobId) {
        require(jobs[_jobId].isActive, "Job is not active");
        require(jobs[_jobId].freelancer == address(0), "Freelancer already assigned");
        
        jobs[_jobId].freelancer = _freelancer;
        escrows[_jobId].freelancer = _freelancer;
        freelancerJobs[_freelancer].push(_jobId);
        
        emit JobAssigned(_jobId, _freelancer);
    }

    function completeJob(uint256 _jobId) external onlyClient(_jobId) {
        require(!jobs[_jobId].isCompleted, "Job already completed");
        require(jobs[_jobId].freelancer != address(0), "No freelancer assigned");
        
        jobs[_jobId].isCompleted = true;
        jobs[_jobId].isActive = false;
        
        // Release funds to freelancer
        Escrow storage escrow = escrows[_jobId];
        require(!escrow.isReleased, "Funds already released");
        
        escrow.isReleased = true;
        payable(jobs[_jobId].freelancer).transfer(escrow.amount);
        
        emit JobCompleted(_jobId);
        emit FundsReleased(_jobId, jobs[_jobId].freelancer, escrow.amount);
    }

    function getJob(uint256 _jobId) external view returns (Job memory) {
        return jobs[_jobId];
    }

    function getClientJobs(address _client) external view returns (uint256[] memory) {
        return clientJobs[_client];
    }

    function getFreelancerJobs(address _freelancer) external view returns (uint256[] memory) {
        return freelancerJobs[_freelancer];
    }
}