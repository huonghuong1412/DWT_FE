// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
// import { cloneDeep } from 'lodash';
import { Container, Draggable } from 'react-smooth-dnd';
import Button from '../../../components/bootstrap/Button';
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import CardItem from './Card';
import './style.scss';

const CoulmnTitle = styled.span`
	font-weight: 700;
	font-size: 16px;
	color: #212529;
	cursor: pointer;
`;
const ColumnCount = styled.span`
	font-weight: 700;
	font-size: 16px;
	color: #212529;
	cursor: pointer;
`;
const WrapForm = styled.div``;

const RenderColumnTitle = ({ columnName, countCard }) => {
	return (
		// <CardHeader className={`column-drag-handle pt-1 pb-1 bg-l50-${status}`}>
		<CardHeader className='column-drag-handle pt-1 pb-1' style={{ background: '#eee' }}>
			<CoulmnTitle className='w-100'>{columnName}</CoulmnTitle>
			<ColumnCount>{countCard}</ColumnCount>
		</CardHeader>
	);
};

const Column = (props) => {
	const { column, onCardDrop } = props;
	// const { cards } = mapOrder(column.cards, column.cardOrder, 'id');
	const { cards } = column;
	const [newCardTitle, setNewCardTitle] = useState('');
	const [openNewCardForm, setOpenNewCardForm] = useState(false);
	const newCardInputRef = useRef(null);

	const handleNewCardTitleChange = useCallback((e) => {
		setNewCardTitle(e.target.value);
	}, []);

	const handleToggleNewCardForm = () => {
		setOpenNewCardForm(!openNewCardForm);
	};

	const handleCloseNewCardForm = () => {
		setOpenNewCardForm(false);
	};

	const addNewCard = () => {
		if (!newCardTitle) {
			newCardInputRef.current.focus();
			// eslint-disable-next-line no-useless-return
			return;
		}
		const data = {
			id: Math.random().toString(36).substr(2, 5),
			boardId: column.boardId,
			columnId: column.id,
			title: newCardTitle.trim(),
			cover: null,
		};
		const newColumn = { ...column };
		// const newColumn = cloneDeep(column);
		newColumn.cards.push(data);
		newColumn.cardOrder.push(data.id);
		// setColumns(newColumn);
		// onAddCardToColumn(newColumn);
		setNewCardTitle('');
	};

	return (
		<Card className='card-column'>
			<RenderColumnTitle
				status={column?.status}
				columnName={column?.title}
				countCard={column?.cards.length}
			/>
			<CardBody className='cursor-pointer' style={{ padding: '1rem 1rem 0 1rem' }}>
				<Container
					// eslint-disable-next-line react/jsx-props-no-spreading
					groupName='col'
					onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
					getChildPayload={(index) => cards[index]}
					dragClass='card-ghost'
					dropClass='card-ghost-drop'
					dropPlaceholder={{
						animationDuration: 150,
						showOnTop: true,
						className: 'drop-preview',
					}}
					dropPlaceholderAnimationDuration={200}>
					{cards.map((card) => {
						return (
							<Draggable key={card.id}>
								{/* eslint-disable-next-line react/jsx-props-no-spreading */}
								<CardItem {...card} key={card.id} />
							</Draggable>
						);
					})}
				</Container>
			</CardBody>
			<CardFooter className='d-block w-100'>
				{openNewCardForm && (
					<WrapForm>
						<Form.Control
							ref={newCardInputRef}
							className='rounded-0 add-column-input add-card-input'
							name='column'
							size='sm'
							type='text'
							as='textarea'
							rows='5'
							placeholder='Nhập công việc'
							autoFocus
							value={newCardTitle}
							onChange={handleNewCardTitleChange}
							onKeyDown={(e) => e.key === 'Enter' && addNewCard()}
						/>
						<div className='d-flex align-items-center'>
							<Button className='add-column-button' color='info' onClick={addNewCard}>
								Thêm công việc
							</Button>
							<Icon
								className='add-column-icon cursor-pointer'
								size='2x'
								icon='XLg'
								onClick={handleCloseNewCardForm}
							/>
						</div>
					</WrapForm>
				)}
				{!openNewCardForm && (
					<Button
						onClick={handleToggleNewCardForm}
						className='d-flex align-items-center cursor-pointer'
						style={{ fontSize: 15, color: '#6C757D', border: '1px solid #6C757D' }}>
						<Icon size='lg' icon='PlusCircle' />
						<span className='mx-2'>Thêm công việc</span>
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};

export default Column;
