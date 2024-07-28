import axios from 'axios';
import { env } from '@/env';

export const axiosApi = axios.create({
	baseURL: `${env.NEXT_PUBLIC_API_BASE_URL}/api`,
	timeout: 30000,
	withCredentials: true,
});
