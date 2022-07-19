import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
// import Page from '../../../layout/Page/Page';
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
// import Progress from '../../../components/bootstrap/Progress';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
// import TaskProgress from '../task-management/TaskProgress';
// import TaskCount from '../task-management/TaskCount';
// import TaskRecent from '../task-management/TaskRecent';
import Progress from '../../../components/bootstrap/Progress';
import Textarea from '../../../components/bootstrap/forms/Textarea';

const dataMissions = [
	{
		id: 1,
		name: 'Mục tiêu 1',
		department: ' Phòng 1',
		total_kpi_value: 0,
		assign_to: 'Người 1',
		estimateDate: '',
		estimateTime: '',
		deadlineDate: '',
		deadlineTime: '',
	},
	{
		id: 2,
		name: 'Công việc 2',
		department: ' Phòng 2',
		total_kpi_value: 0,
		assign_to: 'Người 2',
		estimateDate: '',
		estimateTime: '',
		deadlineDate: '',
		deadlineTime: '',
	},
];

const MissionPage = () => {
	const [missions, setMissions] = useState(dataMissions);
	const navigate = useNavigate();
	const handleOnClickToEmployeeListPage = useCallback(
		(page) => navigate(`/quan-ly-cong-viec/muc-tieu/${page}`),
		[navigate],
	);
	const [editModalStatus, setEditModalStatus] = useState(false);
	const formik = useFormik({
		initialValues: {
			name: '',
			department: '',
			total_kpi_value: 0,
			assign_to: '',
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
	const date = `30 ngày nữa hết hạn`;
	return (
		<PageWrapper title={demoPages.quanLyCongViec.subMenu.danhSach.text}>
			<div>
				{/* <Card>
					<CardBody>
						<div className='row'>
							<div className='col-md-12'>
								<div className='display-6 fw-bold py-3'>Thông tin mục tiêu</div>
							</div>
							<div className='col-md-7'>
								<TaskProgress />
							</div>
							<div className='col-md-5'>
								<TaskCount />
							</div>
						</div>
					</CardBody>
				</Card> */}
				<Card>
					<CardBody>
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
										Thêm công việc
									</Button>
								</div>
							</div>
						</div>
					</CardBody>
					<CardBody>
						<div className='row'>
							{missions.map((item) => (
								<div className='col-md-6 col-xl-4 col-sm-12' key={item.id}>
									<Card stretch>
										<CardHeader className='bg-transparent'>
											<CardLabel>
												<CardTitle tag='h4' className='h5'>
													{item.name}
												</CardTitle>
											</CardLabel>
											<CardActions>
												<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
													{date}
												</small>
											</CardActions>
											<CardActions>
												<Button
													icon='ArrowForwardIos'
													aria-label='Read More'
													hoverShadow='default'
													onClick={() =>
														handleOnClickToEmployeeListPage(item.id)
													}
												/>
											</CardActions>
										</CardHeader>
										<CardBody>
											<CardSubTitle tag='div' className='h5 text-muted'>
												<p>Phòng ban phụ trách: {item.department}</p>
												<p>Nhân viên phụ trách: {item.assign_to}</p>
												<p>Giá trị KPI: {item.total_kpi_value}</p>
												<div className='col-md-6'>
													{60}%
													<Progress isAutoColor value={60} height={10} />
												</div>
											</CardSubTitle>
										</CardBody>
									</Card>
								</div>
							))}
						</div>
					</CardBody>
				</Card>

				<Modal
					setIsOpen={setEditModalStatus}
					isOpen={editModalStatus}
					size='lg'
					isScrollable>
					<ModalHeader className='px-4' setIsOpen={setEditModalStatus}>
						<ModalTitle id='project-edit'>Thêm mới công việc</ModalTitle>
					</ModalHeader>
					<ModalBody>
						<div className='row g-4'>
							<div className='col-12'>
								<FormGroup id='name' label='Tên công việc' isFloating>
									<Input
										placeholder='Tên công việc'
										onChange={formik.handleChange}
										value={formik.values.name}
									/>
								</FormGroup>
							</div>
							{/* <div className='col-12'>
								<FormGroup id='workCategory' label='Thuộc công việc' isFloating>
									<Input
										placeholder='Thuộc công việc'
										onChange={formik.handleChange}
										value={formik.values.workCategory}
									/>
								</FormGroup>
							</div> */}
							<div className='col-12'>
								<FormGroup id='department' label='Phòng ban' isFloating>
									<Input
										placeholder='Phòng ban'
										onChange={formik.handleChange}
										value={formik.values.department}
									/>
								</FormGroup>
							</div>
							<div className='col-12'>
								<FormGroup id='assign_to' label='Nhân viên phụ trách' isFloating>
									<Input
										placeholder='Nhân viên phụ trách'
										onChange={formik.handleChange}
										value={formik.values.assign_to}
									/>
								</FormGroup>
							</div>
							<div className='col-12'>
								<FormGroup id='total_kpi_value' label='Mức điểm KPI' isFloating>
									<Input
										placeholder='Mức điểm KPI'
										onChange={formik.handleChange}
										value={formik.values.total_kpi_value}
									/>
								</FormGroup>
							</div>
							<div className='col-6'>
								<FormGroup
									id='estimateDate'
									label='Ngày hoàn thành ước tính'
									isFloating>
									<Input
										placeholder='Ngày hoàn thành ước tính'
										onChange={formik.handleChange}
										value={formik.values.estimateDate}
										type='date'
									/>
								</FormGroup>
							</div>
							<div className='col-6'>
								<FormGroup
									id='estimateTime'
									label='Thời gian hoàn thành ước tính'
									isFloating>
									<Input
										placeholder='Thời gian hoàn thành ước tính'
										onChange={formik.handleChange}
										value={formik.values.estimateTime}
										type='time'
									/>
								</FormGroup>
							</div>
							<div className='col-6'>
								<FormGroup id='deadlineDate' label='Hạn ngày hoàn thành' isFloating>
									<Input
										placeholder='Hạn ngày hoàn thành'
										onChange={formik.handleChange}
										value={formik.values.deadlineDate}
										type='date'
									/>
								</FormGroup>
							</div>
							<div className='col-6'>
								<FormGroup
									id='deadlineTime'
									label='Hạn thời gian hoàn thành'
									isFloating>
									<Input
										placeholder='Hạn thời gian hoàn thành'
										onChange={formik.handleChange}
										value={formik.values.deadlineTime}
										type='time'
									/>
								</FormGroup>
							</div>
							<div className='col-12'>
								<Card isCompact className='mb-0'>
									<CardBody>
										<FormGroup id='note' label='Ghi chú đầu việc' isFloating>
											<Textarea
												className='h-100'
												rows={12}
												placeholder='note'
												onChange={formik.handleChange}
												value={formik.values.note}
											/>
										</FormGroup>
									</CardBody>
								</Card>
							</div>
							{/* <div className='col-12'>
								<Card isCompact className='mb-0'>
									<CardHeader>
										<CardLabel>
											<CardTitle>Thông báo khi đến hạn</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<FormGroup>
											<Checks
												id='notify'
												type='switch'
												label={
													<>
														Thông báo cho khách hàng
														<Popovers
															trigger='hover'
															desc='Check this checkbox if you want your customer to receive an email about the scheduled appointment'>
															<Icon
																icon='Help'
																size='lg'
																className='ms-1 cursor-help'
															/>
														</Popovers>
													</>
												}
												onChange={formik.handleChange}
												checked={formik.values.notify}
											/>
										</FormGroup>
									</CardBody>
								</Card>
							</div> */}
							<div className='col-12'>
								<Card isCompact className='mb-0'>
									<CardHeader>
										<CardLabel>
											<CardTitle>Tạo đầu việc</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<Button
											color='info'
											size='lg'
											isLight
											className='h-100'
											icon='AddCircle'>
											Thêm mới
										</Button>
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
							Lưu công việc
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		</PageWrapper>
	);
};

export default MissionPage;
