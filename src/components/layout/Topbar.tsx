import Image from 'next/image';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/server/auth';

import ThemeToggleButton from '../utils/ThemeToggleButton';

const TopBar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="w-full sticky top-0 z-10 flex gap-3 items-center justify-end bg-[#f5f8fa] dark:bg-[#1e1e2d] dark:text-gray-500 py-3 px-5">
      <ThemeToggleButton />
      <Image
        priority
        className="w-10 h-10 rounded-full"
        alt="user-logo"
        width={40}
        height={40}
        src={
          session?.user.image
            ? session.user.image
            : "/svg/no-profile-picture-icon.svg"
        }
      />
    </header>
  );
};

export default TopBar;
