import { setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
    setCookie('refresh', '', {
        req,
        res,
        httpOnly: true,
        secure: false,
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
    });

	res.status(200).json({message: 'User has been logged out'})
}

export default logout;