import axios from 'axios';
const server = 'desktop-p6kfrqb:3000';
const urls = {
	buka: `http://${server}/buka`, 
	bySyozok: `http://${server}/inventory-aging/by-syozok`, 
	byShcds: `http://${server}/inventory-aging/by-shcds`, 
	aging: `http://${server}/inventory-aging`, 
	periods: `http://${server}/inventory-aging/periods`, 
};
export const apis = Object.entries(urls).reduce((apis, [ name, url ]) => Object.assign(apis, {
	[name]: params => axios.get(urls[name], { params }).then(res => res.data), 
}), {});
export default apis;