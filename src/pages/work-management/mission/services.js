import axiosClient from '../../../utils/axiosClient';

const getAll = () => {
	// lấy toàn bộ danh sách mục tiêu
	return axiosClient({
		method: 'GET',
		url: '/missions',
	});
};

const getLatestTasks = () => {
	// lấy danh sách các task mới nhất
	return axiosClient({
		method: 'GET',
		url: '/tasks?_sort=id&_order=desc&_limit=6',
	});
};

const getItemById = (id) => {
	// lấy thông tin mục tiêu theo id
	return axiosClient({
		method: 'GET',
		url: `/missions/${id}`,
	});
};

const addNewItem = (data) => {
	// thêm mục tiêu mới
	return axiosClient({
		method: 'POST',
		url: '/missions',
		data,
	});
};

const updateItemById = (data) => {
	// cập nhật mục tiêu
	return axiosClient({
		method: 'PUT',
		url: `/missions/${data.id}`,
		data,
	});
};

const deleteItemById = (id) => {
	// xoá mục tiêu
	return axiosClient({
		method: 'DELETE',
		url: `/missions/${id}`,
	});
};

const getAllDepartments = () => {
	// lấy danh sách phòng ban
	return axiosClient({
		method: 'GET',
		url: '/departments',
	});
};

// task services

const getAllTaksByMissionID = (id) => {
	// lấy tất cả task của nhiệm vụ theo id
	return axiosClient({
		method: 'GET',
		url: `/tasks?mission_id=${id}`,
	});
};

const deleteTaskById = (id) => {
	// xoá task thuộc mục tiêu
	return axiosClient({
		method: 'DELETE',
		url: `/tasks/${id}`,
	});
};

const getTaskById = (id) => {
	// xoá task thuộc mục tiêu
	return axiosClient({
		method: 'GET',
		url: `/tasks/${id}`,
	});
};

const addNewTask = (data) => {
	// thêm nhiệm vụ mới
	return axiosClient({
		method: 'POST',
		url: '/tasks',
		data,
	});
};

const updateTaskByID = (data) => {
	// cập nhật công việc
	return axiosClient({
		method: 'PUT',
		url: `/tasks/${data.id}`,
		data,
	});
};

export {
	getAll,
	getLatestTasks,
	getAllDepartments,
	getItemById,
	addNewItem,
	updateItemById,
	deleteItemById,
	deleteTaskById,
	getAllTaksByMissionID,
	getTaskById,
	addNewTask,
	updateTaskByID,
};
