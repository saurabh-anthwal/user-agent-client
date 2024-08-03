import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookie, setCookie } from 'cookies-next';
import { authAxios, unAuthAxios } from '@/services/apiService';
// import { cookies } from 'next/headers';

const agentHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        if (!req.headers.cookie) {
            return res.status(403).json({ message: 'Not Authorized' })
        }

        try {
            const access = getCookie('access', { req, res });
                const { data: agentData } = await authAxios.get('/api/agents/', {
                    headers: {
                        Authorization: `Bearer ${access}`
                    }
                });

                res.status(200).json({ agent: agentData, access: access })
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
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${req.method} is not allowed` })
    }
}

export default agentHandler;