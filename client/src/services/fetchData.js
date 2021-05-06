import axios from 'axios';
import getAPIUrl from 'services/getAPIUrl';

export default async (apiRoute, { data = {} } = {}) => axios(`${getAPIUrl()}${apiRoute}`, { data });
