"use client";
import React from 'react';

import { signIn } from 'next-auth/react';

import { Button } from '../ui/button';

export const GoogleLoginButton = () => {
  return (
    <Button style={{ marginRight: 10 }} onClick={() => void signIn("google")}>
      Google
    </Button>
  );
};

export const FacebookLoginButton = () => {
  return (
    <Button style={{ marginRight: 10 }} onClick={() => void signIn("facebook")}>
      FaceBook
    </Button>
  );
};

export const CredentialsLoginButton = () => {
  return (
    <Button style={{ marginRight: 10 }} onClick={() => void signIn("credentials")}>
      Credentials
    </Button>
  );
};
