import { AplicationError } from '@/protocols';

export function invalidCredentialsError(details?: string[]): ApplicationInvalidateCredentialError {
  return {
    name: 'InvalidDataError',
    message: 'Invalid data',
    details,
  };
}

type ApplicationInvalidateCredentialError = AplicationError & {
  details: string[];
};