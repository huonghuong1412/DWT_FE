import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import { getItemById } from './services';

// eslint-disable-next-line react/prop-types
const MissionFormModal = ({ show, onClose, onSubmit, item }) => {
	// eslint-disable-next-line react/prop-types
	const { id } = item;
	const [mission, setMission] = useState({});

	useEffect(() => {
		if (id) {
			getItemById(id).then((res) => {
				setMission(res.data);
			});
		} else {
			setMission({
				id: null,
				name: '',
				description: '',
				kpi_value: 0,
				start_time: moment().add(0, 'days').format('YYYY-MM-DD'),
				end_time: moment().add(0, 'days').format('YYYY-MM-DD'),
				status: 1,
			});
		}
	}, [id]);

	const handleChange = (e) => {
		const { value } = e.target;
		setMission({
			...mission,
			[e.target.name]: value,
		});
	};

	const handleSubmit = () => {
		const data = { ...mission };
		data.details = [
			{
				id: 1,
				name: 'Doanh thu đạt 500 tỷ',
			},
			{
				id: 2,
				name: 'Mở mới 120% khách hàng',
			},
		];
		onSubmit(data);
	};

	return (
		<Modal show={show} onHide={onClose} size='lg' scrollable centered>
			<Modal.Header closeButton>
				<Modal.Title>{id ? 'Cập nhật mục tiêu' : 'Thêm mới mục tiêu'}</Modal.Title>
			</Modal.Header>
			<Modal.Body className='px-4'>
				<div className='row'>
					<div className='col-md-12'>
						<Card shadow='sm'>
							<CardHeader>
								<CardLabel icon='Info' iconColor='success'>
									<CardTitle>Thông tin mục tiêu</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<FormGroup className='col-12' id='name' label='Tên mục tiêu'>
										<Input
											onChange={handleChange}
											value={mission.name || ''}
											name='name'
											required
										/>
									</FormGroup>
									<FormGroup
										className='col-12'
										id='description'
										label='Mô tả mục tiêu'>
										<Textarea
											name='description'
											onChange={handleChange}
											value={mission.description || ''}
											required
										/>
									</FormGroup>
									<FormGroup
										className='col-12'
										id='kpi_value'
										label='Giá trị KPI'>
										<Input
											type='number'
											name='kpi_value'
											onChange={handleChange}
											value={mission.kpi_value || 0}
											required
										/>
									</FormGroup>
									<FormGroup
										id='start_time'
										label='Ngày bắt đầu mục tiêu'
										isFloating>
										<Input
											name='start_time'
											placeholder='Ngày bắt đầu mục tiêu'
											onChange={handleChange}
											value={
												mission.start_time ||
												moment().add(0, 'days').format('YYYY-MM-DD')
											}
											type='date'
										/>
									</FormGroup>
									<FormGroup
										id='end_time'
										label='Ngày kết thúc mục tiêu'
										isFloating>
										<Input
											name='end_time'
											placeholder='Ngày kết thúc mục tiêu'
											onChange={handleChange}
											value={
												mission.end_time ||
												moment().add(0, 'days').format('YYYY-MM-DD')
											}
											type='date'
										/>
									</FormGroup>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onClose}>
					Đóng
				</Button>
				<Button variant='primary' onClick={handleSubmit}>
					Lưu mục tiêu
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default MissionFormModal;
