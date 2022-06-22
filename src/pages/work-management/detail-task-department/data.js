// eslint-disable-next-line import/prefer-default-export
export const tasksList = [
	{
		id: '1',
		taskName: 'Đặt linh kiện',
		status: 'success',
		total: 4,
	},
	{
		id: '2',
		taskName: 'Nhận linh kiện',
		status: 'danger',
		total: 3,
	},
	{
		id: '3',
		taskName: 'Kỹ thuật kiểm tra',
		status: 'info',
		total: 4,
	},
	{
		id: '4',
		taskName: 'Bàn giao cho KH',
		status: 'warning',
		total: 6,
	},
	{
		id: '5',
		taskName: 'Test',
		status: 'warning',
		total: 6,
	},
	{
		id: '6',
		taskName: 'Test',
		status: 'info',
		total: 6,
	},
];

export const tasksItem = [
	{
		id: '1',
		parentId: '1',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '2',
		parentId: '1',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '3',
		parentId: '1',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '4',
		parentId: '1',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '5',
		parentId: '2',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '6',
		parentId: '2',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '7',
		parentId: '2',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '8',
		parentId: '3',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '9',
		parentId: '3',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '10',
		parentId: '3',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '11',
		parentId: '3',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '12',
		parentId: '4',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '13',
		parentId: '4',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '14',
		parentId: '4',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '15',
		parentId: '4',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '16',
		parentId: '4',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '17',
		parentId: '4',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '18',
		parentId: '5',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '19',
		parentId: '5',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
	{
		id: '20',
		parentId: '6',
		taskName: 'Thiết bị chấm công quét vân tay di động HP05',
		time: '20/03-27/09',
		member: [''],
	},
];

const getTaskByParentId = (parentId, items = []) => {
	return items.filter((item) => item.parentId === parentId);
};

// export const taskMap = tasksList.reduce(
// 	(previous, task) => ({
// 		...previous,
// 		taskName: task.taskName,
// 		items: getTaskByParentId(task.id, tasksItem),
// 	}),
// 	{},
// );

const taskMap = [];
tasksList.forEach((item, index) => {
	taskMap.push({
		index,
		taskName: item.taskName,
		status: item.status,
		items: getTaskByParentId(item.id, tasksItem),
	});
});

export default taskMap;
