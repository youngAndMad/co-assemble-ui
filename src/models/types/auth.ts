export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  username: string;
};

export type MailVerificationData = {
  token: string;
  email: string;
};

export type PasswordResetData = {
  email: string;
};
