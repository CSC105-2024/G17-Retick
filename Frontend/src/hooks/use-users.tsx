import { useMutation } from '@tanstack/react-query';
import { signupUser, updateProfile } from '@/api/user';

export function useSignup() {
  return useMutation({
    mutationFn: signupUser,
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfile,
  });
}
