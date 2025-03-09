// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SkillVerification {
    struct Skill {
        string name;
        uint256 level; // 1-5: Beginner to Expert
        uint256 endorsements;
        bool isVerified;
    }

    mapping(address => mapping(string => Skill)) public skills;
    mapping(address => string[]) public userSkills;
    mapping(address => mapping(string => mapping(address => bool))) public hasEndorsed;

    event SkillAdded(address indexed user, string skill);
    event SkillEndorsed(address indexed endorser, address indexed user, string skill);
    event SkillVerified(address indexed user, string skill);

    function addSkill(string memory _skillName, uint256 _level) external {
        require(_level > 0 && _level <= 5, "Invalid skill level");
        require(skills[msg.sender][_skillName].level == 0, "Skill already exists");

        skills[msg.sender][_skillName] = Skill({
            name: _skillName,
            level: _level,
            endorsements: 0,
            isVerified: false
        });

        userSkills[msg.sender].push(_skillName);
        
        emit SkillAdded(msg.sender, _skillName);
    }

    function endorseSkill(address _user, string memory _skillName) external {
        require(msg.sender != _user, "Cannot endorse own skill");
        require(skills[_user][_skillName].level > 0, "Skill does not exist");
        require(!hasEndorsed[msg.sender][_skillName][_user], "Already endorsed");

        skills[_user][_skillName].endorsements++;
        hasEndorsed[msg.sender][_skillName][_user] = true;

        // Auto-verify skills with enough endorsements
        if (skills[_user][_skillName].endorsements >= 5 && !skills[_user][_skillName].isVerified) {
            skills[_user][_skillName].isVerified = true;
            emit SkillVerified(_user, _skillName);
        }

        emit SkillEndorsed(msg.sender, _user, _skillName);
    }

    function getUserSkills(address _user) external view returns (string[] memory) {
        return userSkills[_user];
    }

    function getSkillDetails(address _user, string memory _skillName) 
        external 
        view 
        returns (Skill memory) 
    {
        return skills[_user][_skillName];
    }
}