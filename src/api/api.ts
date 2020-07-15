import axios from 'axios';
import BASE_URL from '../config';

interface HttpResponse {
    headers: any;
    data: any;
}
const config = { headers: { 'content-type': 'application/json' } };

const get = async (url: string, data?: any, options: any = {}): Promise<HttpResponse> => {
    const response = await axios.get(BASE_URL + url, {
        ...options,
        params: data,
    });
    return response;
};


const getById = async (url : string, id : number) => {const response = await axios.get(`${BASE_URL + url  }/${id}`);

    console.log(response);
return response ;};

const getAll = async (url : string) => {const response = await axios.get(BASE_URL + url);
    console.log(response);
return response;};

const post = async (url : string, data : any) => {const response = await axios.post(BASE_URL + url, data, config);
return response;};

const put = async (url : string, data : any) => {const response = await axios.put(BASE_URL + url, data, config);
return response;};

const remove = async (url : string, id : number) =>{const response =  await axios.delete(`${BASE_URL + url }/${id}`);
return response;};

export default { get, getById, getAll, post, put, remove};