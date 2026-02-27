export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  chat_room: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  code: number;
  data: {
    access_token: string;
    refresh_token: string;
  };
}
