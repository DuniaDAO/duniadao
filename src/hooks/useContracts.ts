import { useContractRead, useContractWrite } from 'wagmi';
import { parseEther } from 'viem';
import DuniaDAOAbi from '../contracts/abi/DuniaDAO.json';
import SkillVerificationAbi from '../contracts/abi/SkillVerification.json';

const DUNIA_DAO_ADDRESS = import.meta.env.VITE_DUNIA_DAO_ADDRESS as `0x${string}`;
const SKILL_VERIFICATION_ADDRESS = import.meta.env.VITE_SKILL_VERIFICATION_ADDRESS as `0x${string}`;

export function useCreateJob() {
  return useContractWrite({
    address: DUNIA_DAO_ADDRESS,
    abi: DuniaDAOAbi,
    functionName: 'createJob',
  });
}

export function useGetJob(jobId: number) {
  return useContractRead({
    address: DUNIA_DAO_ADDRESS,
    abi: DuniaDAOAbi,
    functionName: 'getJob',
    args: [BigInt(jobId)],
  });
}

export function useAssignFreelancer() {
  return useContractWrite({
    address: DUNIA_DAO_ADDRESS,
    abi: DuniaDAOAbi,
    functionName: 'assignFreelancer',
  });
}

export function useCompleteJob() {
  return useContractWrite({
    address: DUNIA_DAO_ADDRESS,
    abi: DuniaDAOAbi,
    functionName: 'completeJob',
  });
}

export function useAddSkill() {
  return useContractWrite({
    address: SKILL_VERIFICATION_ADDRESS,
    abi: SkillVerificationAbi,
    functionName: 'addSkill',
  });
}

export function useGetUserSkills(address: `0x${string}`) {
  return useContractRead({
    address: SKILL_VERIFICATION_ADDRESS,
    abi: SkillVerificationAbi,
    functionName: 'getUserSkills',
    args: [address],
  });
}