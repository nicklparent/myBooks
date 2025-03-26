
export type Preferences = {
  theme: string;
  contentFilter: boolean;
}

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type Collections = {
  
}

export type ApiError = {
  message: string,
  error: string
}
