// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPages } from '../../../menu';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
	CardActions,
} from '../../../components/bootstrap/Card';
import Modal, { ModalHeader, ModalBody, ModalTitle, ModalFooter } from '../../../components/bootstrap/Modal';
import SubHeader, { SubHeaderLeft, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Badge from '../../../components/bootstrap/Badge';
import Icon from '../../../components/icon/Icon';
import Progress from '../../../components/bootstrap/Progress';
import Avatar, { AvatarGroup } from '../../../components/Avatar';
import USERS from '../../../common/data/userDummyData';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import TaskProgress from '../task-management/TaskProgress';

const Item = ({
	name,
	teamName,
	attachCount,
	taskCount,
	percent,
	startTime,
	endTime,
	...props
}) => {
	const navigate = useNavigate();
	const handleOnClickToProjectPage = useCallback(
		() => navigate(`../${demoPages.quanLyCongViec.subMenu.chiTietCongViecPhongBan.path}`),
		[navigate],
	);
	const date = `Còn 30 ngày nữa`;
	return (
		<div className='col-md-6 col-xl-4 col-sm-12' {...props}>
			<Card stretch onClick={handleOnClickToProjectPage} className='cursor-pointer'>
				<CardHeader>
					<CardLabel icon='Ballot'>
						<CardTitle>{name}</CardTitle>
						<CardSubTitle>{teamName}</CardSubTitle>
					</CardLabel>
					<CardActions>
						<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
							{date}
						</small>
					</CardActions>
				</CardHeader>
				<CardBody>
					{/* <div className='d-flex align-items-center mb-3'>
						<small
							className='border rounded-1 text-success fw-bold px-2 py-1'
							style={{ fontSize: 14 }}>
							{startTime}
						</small>
						-
						<small
							className='border rounded-1 text-success fw-bold px-2 py-1'
							style={{ fontSize: 14 }}>
							{endTime}
						</small>
					</div> */}
					<div className='row g-2 mb-3'>
						<div className='col-auto'>
							<Badge color='dark' isLight style={{ fontSize: 18 }}>
								<Icon icon='TaskAlt' /> {taskCount}
							</Badge>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6'>
							{percent}%
							<Progress isAutoColor value={percent} height={10} />
						</div>
						<div className='col-md-6 d-flex justify-content-end'>
							<AvatarGroup>
								<Avatar
									srcSet={USERS.GRACE.srcSet}
									src={USERS.GRACE.src}
									userName={`${USERS.GRACE.name} ${USERS.GRACE.surname}`}
									color={USERS.GRACE.color}
								/>
								<Avatar
									srcSet={USERS.SAM.srcSet}
									src={USERS.SAM.src}
									userName={`${USERS.SAM.name} ${USERS.SAM.surname}`}
									color={USERS.SAM.color}
								/>
								<Avatar
									srcSet={USERS.CHLOE.srcSet}
									src={USERS.CHLOE.src}
									userName={`${USERS.CHLOE.name} ${USERS.CHLOE.surname}`}
									color={USERS.CHLOE.color}
								/>
							</AvatarGroup>
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};
const MissionDetailPage = () => {
	const [mission, setMission] = useState({});
	const params = useParams();
	useEffect(() => {
		axios.get(`http://localhost:3001/api/forms?mission_id=${parseInt(params?.id, 10)}`)
			.then(res => {
				setMission(res);
			});
	}, [params?.id, editModalStatus]);
	const [editModalStatus, setEditModalStatus] = useState(false);
	const formik = useFormik({
		initialValues: {
			mission_id: 1,
			departmnent_id: 1,
			priority: 2,
			status: 0,
			user: {
				id: 1,
				name: 'Nhân viên 1',
			},
			name: '',
			description: '',
			assign_to: '',
			teamName: '',
			estimateTime: '',
			startTime: '',
			endTime: '',
			kpi_value: 0,
			keys: null,
		},
		// eslint-disable-next-line no-unused-vars
		onSubmit: (values) => {
			axios.post(`http://localhost:3001/api/forms`, values);
			axios.get(`http://localhost:3001/api/forms?mission_id=${parseInt(params?.id, 10)}`)
				.then(res => {
					setMission(res);
				});
			setEditModalStatus(false);
		},
	});
	return (
		<PageWrapper title={`${mission?.name}`}>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						color='info'
						isLink
						icon='ArrowBack'
						tag='a'
						to={`../${demoPages.mucTieu.subMenu.mission.path}`}>
						Quay lại
					</Button>
					<SubheaderSeparator />
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-md-12 col-xl-12 col-sm-12'>
						<Card stretch>
							<CardHeader className='bg-transparent'>
								<CardLabel>
									<CardTitle>
										<div className='row'>
											<div className=' row-12 md-5 h1'>
												Mục Tiêu : {` `}
												{mission?.name}
											</div>
											<div className='col-6 md-5' style={{ marginTop: '5%' }}>
												<ul style={{ listStyle: 'none' }}>
													{mission?.keys?.map((item) => (
														// eslint-disable-next-line react/no-array-index-key
														<li
															className='h4'
															style={{ margin: '0 0 3% 10%' }}>
															{item?.name} {' : '} {item?.value}
															{/* {30}% */}
															<div className='col-md-6'>
																<Progress isAutoColor value={30} height={10} />
															</div>
														</li>
													))}
												</ul>
											</div>
											<div className='col-6 md-5'>
												<TaskProgress />
											</div>
										</div>
									</CardTitle>
								</CardLabel>
							</CardHeader>
						</Card>
					</div>
				</div>
				<div className='row mt-3'>
					<div className='col-6'>
						<div className='display-6 fw-bold py-3'>Danh sách công việc</div>
					</div>
					<div className='col-md-6 col-xl-6 col-sm-6'>
						<div className='w-100 h-100 d-flex align-items-center justify-content-end'>
							<Button
								color='success'
								size='lg'
								isLight
								className='w-50 h-100'
								onClick={() => setEditModalStatus(true)}
								icon='AddCircle'>
								Thêm công việc
							</Button>
						</div>
					</div>
				</div>
				<div className='row mt-3'>
					{mission?.data?.map((item, index) => {
						return (
							<Item
								// eslint-disable-next-line react/no-array-index-key
								key={index}
								name={item.name}
								teamName={item.teamName}
								startTime={`${item.startTime}`}
								endTime={`${item.endTime}`}
								attachCount={6}
								taskCount={24}
								percent={65}
								data-tour='project-item'
							/>
						);
					})}
				</div>
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
							<div className='col-12'>
								<FormGroup id='teamName' label='Phòng ban' isFloating>
									<Input
										placeholder='Phòng ban'
										onChange={formik.handleChange}
										value={formik.values.teamName}
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
										<FormGroup
											id='description'
											label='Ghi chú mục tiêu'
											isFloating>
											<Textarea
												className='h-100'
												rows={12}
												placeholder='note'
												onChange={formik.handleChange}
												value={formik.values.description}
											/>
										</FormGroup>
									</CardBody>
								</Card>
							</div>
							<div className='col-12'>
								<Card isCompact className='mb-0'>
									<CardHeader>
										<CardLabel>
											<CardTitle>Tạo mục tiêu</CardTitle>
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
							Lưu mục tiêu
						</Button>
					</ModalFooter>
				</Modal>
			</Page>
		</PageWrapper>
	);
};

export default MissionDetailPage;