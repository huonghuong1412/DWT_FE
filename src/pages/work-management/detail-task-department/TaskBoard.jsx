import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/bootstrap/Button';
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import TaskList from './TaskList';

const BoardTitle = styled.span`
	font-weight: 700;
	font-size: 16px;
	color: #212529;
`;

// eslint-disable-next-line react/prop-types
const RenderBoardTitle = ({ status, taskName }) => {
	return (
		<CardHeader className={`pt-1 pb-1 bg-l50-${status}`}>
			<BoardTitle className='w-100'>{taskName}</BoardTitle>
		</CardHeader>
	);
};

// eslint-disable-next-line react/prop-types
const TaskBoard = ({ boards }) => {
	return (
		<div className='d-flex'>
			{/* eslint-disable-next-line react/prop-types */}
			{boards.map((item) => (
				<Card
					key={item.index}
					style={{ marginRight: 20, minWidth: '360px', height: 'fit-content' }}>
					<RenderBoardTitle status={item.status} taskName={item.taskName} />
					<CardBody style={{ padding: '1rem 1rem 0 1rem' }}>
						<TaskList tasks={item.items} />
					</CardBody>
					<CardFooter style={{ padding: '0 1rem 1rem 1rem' }}>
						<Button
							className='d-flex align-items-center cursor-pointer'
							style={{ fontSize: 15, color: '#6C757D', border: '1px solid #6C757D' }}>
							<Icon size='lg' icon='PlusCircle' />
							<span className='mx-2'>Thêm công việc</span>
						</Button>
					</CardFooter>
				</Card>
			))}
			;
		</div>
	);
};

export default TaskBoard;
