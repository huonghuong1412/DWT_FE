import React from 'react';
import TaskItem from './TaskItem';

// eslint-disable-next-line react/prop-types
const TaskList = ({ tasks }) => {
	return (
		<div>
			{/* eslint-disable-next-line react/prop-types */}
			{tasks.map((item) => (
				// eslint-disable-next-line react/jsx-props-no-spreading
				<TaskItem {...item} key={item.id} />
			))}
		</div>
	);
};

export default TaskList;
