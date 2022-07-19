import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPages } from '../../../menu';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Progress from '../../../components/bootstrap/Progress';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import { getAll } from './services';

const MissionPage = () => {
	const [missions, setMissions] = useState([]);
	const navigate = useNavigate();
	const handleOnClickToEmployeeListPage = useCallback(
		(page) => navigate(`/quan-ly-cong-viec/muc-tieu/${page}`),
		[navigate],
	);
	const [editModalStatus, setEditModalStatus] = useState(false);
	const formik = useFormik({
		initialValues: {
			name: '',
			description: '',
			total_kpi_value: 0,
			task: [],
		},
		// eslint-disable-next-line no-unused-vars
		onSubmit: (values) => {
			const newMissions = [...missions];
			newMissions.push(values);
			setMissions(newMissions);
			setEditModalStatus(false);
		},
	});

	useEffect(() => {
		const fetchData = async () => {
			const result = await getAll();
			setMissions(result.data);
		};
		fetchData();
	}, []);

	return (
		<PageWrapper title={demoPages.quanLyCongViec.subMenu.danhSach.text}>
			<Page container='fluid'>
				<div className='row mt-4 mb-4'>
					<div className='col-6'>
						<div className='display-6 fw-bold py-3'>Danh sách mục tiêu</div>
					</div>
					<div className='col-md-12 col-xl-6 col-sm-12'>
						<div className='w-100 h-100 d-flex align-items-center justify-content-end'>
							<Button
								color='success'
								size='lg'
								className='w-50 h-100'
								icon='AddCircle'
								onClick={() => setEditModalStatus(true)}>
								Thêm mục tiêu
							</Button>
						</div>
					</div>
				</div>
				<div className='row'>
					{missions.map((item) => (
						<div className='col-md-6 col-xl-4 col-sm-12' key={item.id}>
							<Card stretch>
								<CardHeader className='bg-transparent'>
									<CardLabel>
										<CardTitle tag='h4' className='h5'>
											{item.name}
										</CardTitle>
										<CardSubTitle tag='div' className='h5 text-muted'>
											<p>{item.description}</p>
											<p>Giá trị KPI: {item.total_kpi_value}</p>
										</CardSubTitle>
									</CardLabel>
									<CardActions>
										<Button
											icon='ArrowForwardIos'
											aria-label='Read More'
											hoverShadow='default'
											onClick={() => handleOnClickToEmployeeListPage(item.id)}
										/>
									</CardActions>
								</CardHeader>
								<CardBody>
									<div className='row'>
										<div className='col-md-6'>
											{item.progress || 0}%
											<Progress
												isAutoColor
												value={item.progress || 0}
												height={20}
											/>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					))}
				</div>
				<Modal
					setIsOpen={setEditModalStatus}
					isOpen={editModalStatus}
					size='lg'
					isScrollable>
					<ModalHeader className='px-4' setIsOpen={setEditModalStatus}>
						<ModalTitle id='project-edit'>Thêm mới nhiệm vụ</ModalTitle>
					</ModalHeader>
					<ModalBody className='px-4'>
						<div className='row'>
							<div className='col-md-12'>
								<Card shadow='sm'>
									<CardHeader>
										<CardLabel icon='Info' iconColor='success'>
											<CardTitle>Thông tin nhiệm vụ</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<div className='row g-4'>
											<FormGroup
												className='col-12'
												id='name'
												label='Tên nhiệm vụ'>
												<Input
													onChange={formik.handleChange}
													value={formik.values.name}
												/>
											</FormGroup>
											<FormGroup
												className='col-12'
												id='description'
												label='Mô tả nhiệm vụ'>
												<Textarea
													onChange={formik.handleChange}
													value={formik.values.description}
												/>
											</FormGroup>
											<FormGroup
												className='col-12'
												id='total_kpi_value'
												label='Giá trị KPI'>
												<Input
													type='number'
													onChange={formik.handleChange}
													value={formik.values.total_kpi_value}
												/>
											</FormGroup>
										</div>
									</CardBody>
								</Card>
							</div>
						</div>
					</ModalBody>
					<ModalFooter className='px-4 pb-4'>
						<Button
							color='primary'
							className='w-100'
							type='submit'
							onClick={formik.handleSubmit}>
							Lưu nhiệm vụ
						</Button>
					</ModalFooter>
				</Modal>
			</Page>
		</PageWrapper>
	);
};

export default MissionPage;
