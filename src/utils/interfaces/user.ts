interface response {
  success: boolean;
  code: number;
  message: string;
}
type metadata = {
  httpStatusCode: number;
  requestId: string;
  extendedRequestId: string;
  attempts: number;
  totalRetryDelay: number;
};
interface response {
  success: boolean;
  code: number;
  message: string;
}
export interface follower {
  user_id: number;
  follower_username: string;
  is_private: boolean;
}
export interface user {
  id: number;
  username: string;
  is_private: boolean;
}

export interface formUser {
  username: string;
  password: string;
}

export interface currentUser extends response {
  data: {
    user: user;
    token: string;
  };
}

export interface dataLogin extends response {
  data: {
    token: string;
    userId: number;
    username: string;
  };
}

export interface dataRegister extends response {
  data: {
    user: {
      id: number;
      username: string;
    };
    token: string;
  };
}

export interface dataFolowUser extends response {
  data: {
    id: number;
    user_id: number;
    target_user_id: number;
    created_at: Date;
  };
}

export interface dataUnflowUser extends dataFolowUser {}

export interface dataGetFollowers extends response {
  data: follower[];
}

export interface dataSearchUser extends response {
  data: user[];
}

export interface dataChangePrivacity extends response {
  data: {
    is_private: boolean;
    username: string;
  };
}

export interface responseUploadImage extends response {
  data: {
    metadata: metadata;
    Key: string;
  };
}
export interface responseGetImage extends response {
  data: string;
}
