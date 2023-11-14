import { AplicationError } from '@/protocols';

export function badRequestError(message?: string): AplicationError {
  return {
    name: 'BadRequestError',
    message,
  };
}