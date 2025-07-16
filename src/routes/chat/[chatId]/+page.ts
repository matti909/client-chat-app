import type { PageLoad } from './$types';
import { API_HOST } from '../../../constants';
import axios from 'axios';

export const load: PageLoad = async ({ params }) => {
	const { chatId } = params;
	console.log(chatId);

	const response = await axios.get(`${API_HOST}/api/v1/chat/${chatId}/message/`);
	const messages = response.data.data;

	return {
		message: messages,
		chatId: chatId
	};
};
