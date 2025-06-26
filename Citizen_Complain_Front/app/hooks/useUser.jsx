import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

export const useUser = () => {
  return useContext(UserContext);
};
