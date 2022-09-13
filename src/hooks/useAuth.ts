import { useContext } from "react";

import { AuthContext } from "providers/AuthProvider/AuthProvider";
import { AuthContextValues } from "providers/AuthProvider/types";

const useAuth = (): AuthContextValues => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('No auth context availavle here');
  }

  return authContext; 
}

export default useAuth;
