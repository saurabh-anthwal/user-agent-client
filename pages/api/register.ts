import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { unAuthAxios } from '@/services/apiService';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const { name, email, password } = req.body

        const body = {
            name,
            email,
            password
        }

        try {
            await unAuthAxios.post('/auth/register/', body)
        } catch (error: any) {
            if (error.response) {
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
                if (error.response.data.detail) {
                    return res.status(401).json({ message: error.response.data.detail })
                } else if (error.response.data) {
                    const first_key = Object.keys(error.response.data)[0]
                    return res.status(401).json({ message: first_key.charAt(0).toUpperCase() + first_key.slice(1) + ': ' + error.response.data[first_key][0] })
                }
            } else if (error.request) {
                console.error(error.request);
            } else {
                console.error('Error', error.message);
            }
            console.error(error.config);

            return res.status(500).json({ message: 'Something went wrong' });
        }
        res.status(200).json({ message: "User has been created" });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} is not allowed` });
    }
};
export default handler;