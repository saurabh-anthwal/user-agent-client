import React, { useContext } from 'react';
import { AuthenticationContext, AuthenticationContextProps } from '@/context/AuthenticationContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logoipsum-332.svg';

const Navbar = () => {
    const { logout } = useContext<AuthenticationContextProps | undefined>(AuthenticationContext) ?? {};
    const router = useRouter();

    const handleLogout = async () => {
        await logout?.();
        router.push('/login');
    };

    return (
        <nav className="bg-white p-4 flex justify-between items-center shadow-lg">
            <Link href="/">
                <Image src={Logo} alt="Logo" width={50} height={50} />
            </Link>
            <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-full">
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
