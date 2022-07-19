import axiosClient from '../../../utils/axiosClient';

const getAll = () => {
	return axiosClient({
		method: 'GET',
		url: '/missions',
	});
};

const getItemById = (id) => {
	return axiosClient({
		method: 'GET',
		url: `/missions/${id}`,
	});
};

const addNewItem = (data) => {
	return axiosClient({
		method: 'POST',
		url: '/missions',
		data,
	});
};

const updateItemById = (data) => {
	return axiosClient({
		method: 'PUT',
		url: `/missions/${data.id}`,
		data,
	});
};

const deleteItemById = (id) => {
	return axiosClient({
		method: 'DELETE',
		url: `/missions/${id}`,
	});
};

export { getAll, getItemById, addNewItem, updateItemById, deleteItemById };
