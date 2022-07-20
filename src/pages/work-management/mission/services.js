import axiosClient from '../../../utils/axiosClient';

const getAll = () => {
	return axiosClient({
		method: 'GET',
		url: '/missions',
	});
};

const getLatestTasks = () => {
	return axiosClient({
		method: 'GET',
		url: '/tasks?_sort=id&_order=desc&_limit=6',
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

export { getAll, getLatestTasks, getItemById, addNewItem, updateItemById, deleteItemById };
