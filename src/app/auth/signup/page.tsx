"use client";

import React, { useEffect } from 'react';

import { type NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  slug: string;
}

interface SearchParams {
  error?: string;
}

const SignUp: NextPage<PageProps> = ({ searchParams }) => {
  const { error } = searchParams;
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="relative flex w-[90%] flex-col items-center justify-center gap-10 md:w-[55%]">
      {/* Logo and heading */}
      <div className="flex w-full flex-col items-center gap-3">
        <Image src={"/images/logo.png"} alt="logo" height={60} width={60} />

        <div className="flex w-full flex-col items-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-500">Create your account today</p>
        </div>
      </div>

      {/* Auth part */}
      <div className="flex w-full flex-col gap-4">
        {/* oauth buttons */}
        <Button
          disabled
          onClick={() => void signIn("google")}
          className="w-full border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 dark:border-gray-500 dark:bg-[#0f111a] dark:text-gray-400 dark:hover:border-[#222834] dark:hover:bg-[#222834] dark:hover:text-gray-300"
        >
          Sign Up with Google
        </Button>
        <Button
          disabled
          onClick={() => void signIn("facebook")}
          className="w-full border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 dark:border-gray-500 dark:bg-[#0f111a] dark:text-gray-400 dark:hover:border-[#222834] dark:hover:bg-[#222834] dark:hover:text-gray-300"
        >
          Sign Up with Facebook
        </Button>
        {/* or */}
        <div className="flex w-full items-center gap-3">
          <div className="flex-1 border-b border-gray-300" />
          <span className="font-semibold text-gray-500">or use email</span>
          <div className="flex-1 border-b border-gray-300" />
        </div>
        {/* email and password */}
        <div className="flex w-full flex-col gap-4">
          <div className="relative flex w-full flex-col gap-1">
            <label
              className="px-4 text-xs font-medium text-gray-600"
              htmlFor="email"
            >
              EMAIL ADDRESS
            </label>
            <input
              disabled
              id="email"
              placeholder="name@example.com"
              type="email"
              className="w-full rounded border border-gray-400 px-8 py-1 shadow-md outline-none placeholder:relative placeholder:bottom-[3px] placeholder:text-sm focus:border-blue-400 focus:shadow-blue-400 focus:ring-1"
            />
            <Image
              src="/svg/person-icon.svg"
              alt="email"
              height={20}
              width={20}
              className="absolute bottom-[9px] left-2"
            />
          </div>
          <div className="relative flex w-full flex-col gap-1">
            <label
              className="px-4 text-xs font-medium text-gray-600"
              htmlFor="password"
            >
              PASSWORD
            </label>
            <input
              disabled
              id="password"
              placeholder="Password"
              type="password"
              className="w-full rounded border border-gray-400 px-10 py-1 shadow-md outline-none placeholder:relative placeholder:bottom-[2px] placeholder:text-sm focus:border-blue-400 focus:shadow-blue-400 focus:ring-1"
            />
            <Image
              src="/svg/key-icon.svg"
              alt="email"
              height={20}
              width={20}
              className="absolute bottom-[8px] left-2"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <input
                disabled
                className="h-4 w-4"
                type="checkbox"
                name=""
                id="remember-me"
              />
              <label className="text-sm" htmlFor="remember-me">
                Remember Me
              </label>
            </span>

            <button disabled className="text-sm text-blue-400">
              Forgot Passowrd?
            </button>
          </div>
        </div>
      </div>

      {/* button */}
      <div className="flex w-full flex-col gap-1">
        <button
          disabled
          className="rounded-md bg-blue-600 py-2 text-sm text-white"
        >
          Sign In
        </button>
        <Link
          href="/auth/signin"
          className="py-2 text-center text-sm font-semibold text-blue-600"
        >
          Sign in to an existing account
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
