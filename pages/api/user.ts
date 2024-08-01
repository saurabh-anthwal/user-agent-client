import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookie, setCookie } from 'cookies-next';
import { authAxios, unAuthAxios } from '@/services/apiService';
// import { cookies } from 'next/headers';

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        if (!req.headers.cookie) {
            return res.status(403).json({ message: 'Not Authorized' })
        }

        try {
            const refresh = getCookie('refresh', { req, res });

            const body = {
                refresh
            }

            const { data } = await unAuthAxios.post('/auth/refresh/', body)

            if (data && data.access) {
                await setCookie('access', data.access, {
                    req,
                    res,
                    // httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 60 * 5,
                    path: '/',
                });

                const { data: userData } = await authAxios.get('/auth/user/profile/', {
                    headers: {
                        Authorization: `Bearer ${data.access}`
                    }
                });

                res.status(200).json({ user: userData, access: data.access })
            } else {
                res.status(500).json({ message: 'Something went wrong' })
            }
        } catch (error: any) {
            if (error.response) {
                return res.status(401).json({ message: error.response.data.detail })
            } else if (error.request) {
                console.error(error.request);
            } else {
                console.error('Error', error.message);
            }
            return res.status(500).json({ message: 'Something went wrong' })
        }

    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${req.method} is not allowed` })
    }
}

export default userHandler;