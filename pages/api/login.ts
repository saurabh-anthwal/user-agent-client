import axios from 'axios';
import { setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { unAuthAxios, authAxios } from '@/services/apiService';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let accessToken: string | null = null;

    if (req.method === 'POST') {
        const { email, password } = req.body;

        const body = {
            email,
            password,
        };

        try {
            const { data: accessResponse } = await unAuthAxios.post('/auth/login/', body);

            accessToken = accessResponse.access;

            // In production, change secure to true
            setCookie('refresh', accessResponse.refresh, {
                req,
                res,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24,
                path: '/',
            });
            setCookie('access', accessResponse.access, {
                req,
                res,
                // httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 5,
                path: '/',
            });

        } catch (error: any) {
            if (error.response) {
                console.error(error.response.data);
                // console.error(error.response.status);
                // console.error(error.response.headers);
                return res.status(401).json({ message: error.response.data.detail });
            } else if (error.request) {
                console.error(error.request);
            } else {
                console.error('Error', error.message);
            }
            console.error(error.config);

            return res.status(500).json({ message: 'Something went wrong' });
        }

        if (accessToken) {
            const { data: userData } = await authAxios.get('/auth/user/profile/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            return res.status(200).json({ user: userData, access: accessToken });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} is not allowed` });
    }
};
export default handler;