import { AplicationError } from '@/protocols';

export function unauthorizedError(): AplicationError {
  return {
    name: 'UnauthorizedError',
    message: 'You must be signed in to continue',
  };
}