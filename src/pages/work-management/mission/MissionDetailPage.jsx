// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import styled from 'styled-components';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPages } from '../../../menu';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
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
			setEditModalStatus(false);
		},
	});
	return (
		<div className='col-md-6 col-xl-4 col-sm-12' {...props}>
			<Card stretch onClick={handleOnClickToProjectPage} className='cursor-pointer'>
				<CardHeader>
					<CardLabel icon='Ballot'>
						<CardTitle>{name}</CardTitle>
						<CardSubTitle>{teamName}</CardSubTitle>
					</CardLabel>
				</CardHeader>
				<CardBody>
					<div className='d-flex align-items-center mb-3'>
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
					</div>
					<div className='row g-2 mb-3'>
						{/* <div className='col-auto'>
							<Badge color='dark' isLight style={{ fontSize: 18 }}>
								<Icon icon='AttachFile' /> {attachCount}
							</Badge>
						</div> */}
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

const MissionTitleIndex = styled.h3`
	font-size: 20px;
	color: #333;
	padding: 15px;
	border: 1px solid #eee;
	margin-bottom: 0;
`;

const MissionValueIndex = styled.h3`
	font-size: 16px;
	color: #333;
	padding: 15px;
	border: 1px solid #eee;
	margin-top: 0;
`;

const dataMissions = [
	{
		id: 1,
		name: 'Mục tiêu 1',
		description: 'Mô tả mục tiêu 1',
		total_kpi_value: 1000,
		progress: 60,
		keys: [
			{
				name: 'Doanh thu',
				value: '100,000,000 đ',
			},
			{
				name: 'Đầu việc',
				value: '100',
			},
			{
				name: 'Giá trị KPI',
				value: '1000',
			},
			{
				name: 'Ngân sách',
				value: '500,000,000 đ',
			},
			{
				name: 'Đã chi',
				value: '150,000,000 đ',
			},
		],
		tasks: [
			{
				id: 1,
				name: 'Công việc 1 - Mục tiêu 1',
				description: 'Mô tả công việc 1 - Mục tiêu 1',
				teamName: 'Phòng kinh doanh',
				estimateTime: '16-07-2022 17:00',
				startTime: '15-07-2022 08:00',
				endTime: '16-07-2022 17:00',
				kpi_value: 300,
				status: 2,
				priority: 1,
			},
			{
				id: 2,
				name: 'Công việc 2 - Mục tiêu 1',
				description: 'Mô tả công việc 2 - Mục tiêu 1',
				teamName: 'Phòng kinh doanh',
				estimateTime: '20-07-2022 17:00',
				startTime: '18-07-2022 08:00',
				endTime: '20-07-2022 17:00',
				kpi_value: 500,
				status: 1,
				priority: 1,
			},
			{
				id: 3,
				name: 'Công việc 3 - Mục tiêu 1',
				description: 'Mô tả công việc 3 - Mục tiêu 1',
				teamName: 'Phòng kinh doanh',
				estimateTime: '20-07-2022 17:00',
				startTime: '18-07-2022 08:00',
				endTime: '20-07-2022 17:00',
				kpi_value: 200,
				status: 3,
				priority: 3,
			},
			{
				id: 4,
				name: 'Công việc 4 - Mục tiêu 1',
				description: 'Mô tả công việc 4 - Mục tiêu 1',
				teamName: 'Phòng kinh doanh',
				estimateTime: '20-07-2022 17:00',
				startTime: '18-07-2022 08:00',
				endTime: '20-07-2022 17:00',
				kpi_value: 200,
				status: 3,
				priority: 3,
			},
		],
	},
	{
		id: 2,
		name: 'Mục tiêu 2',
		description: 'Mô tả mục tiêu 2',
		total_kpi_value: 1000,
		progress: 20,
		keys: [
			{
				name: 'Đầu việc',
				value: '100',
			},
			{
				name: 'Giá trị KPI',
				value: '1000',
			},
		],
	},
	{
		id: 3,
		name: 'Mục tiêu 3',
		description: 'Mô tả mục tiêu 3',
		total_kpi_value: 1000,
		progress: 80,
		keys: [
			{
				name: 'Doanh thu',
				value: '100,000,000 đ',
			},
			{
				name: 'Đầu việc',
				value: '100',
			},
			{
				name: 'Giá trị KPI',
				value: '1000',
			},
		],
	},
	{
		id: 4,
		name: 'Mục tiêu 4',
		description: 'Mô tả mục tiêu 4',
		total_kpi_value: 1000,
		progress: 10,
		keys: [
			{
				name: 'Số giờ',
				value: '100h',
			},
			{
				name: 'Đầu việc',
				value: '100',
			},
			{
				name: 'Giá trị KPI',
				value: '1000',
			},
		],
	},
	{
		id: 5,
		name: 'Mục tiêu 5',
		description: 'Mô tả mục tiêu 2',
		total_kpi_value: 1000,
		progress: 50,
	},
];

const MissionDetailPage = () => {
	const [mission, setMission] = useState({});
	const params = useParams();
	useEffect(() => {
		setMission(dataMissions.filter((item) => item.id === parseInt(params?.id, 10))[0]);
	}, [params?.id]);

	return (
		<PageWrapper title={`${mission?.name}`}>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						color='info'
						isLink
						icon='ArrowBack'
						tag='a'
						to={`../${demoPages.quanLyCongViec.subMenu.mission.path}`}>
						Quay lại
					</Button>
					<SubheaderSeparator />
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<div className='display-6 fw-bold py-3'>Thông tin mục tiêu</div>
					</div>
					<div className='col-md-12 col-xl-12 col-sm-12'>
						<Card stretch>
							<CardHeader className='bg-transparent'>
								<CardLabel>
									<CardTitle tag='h2' className='h2'>
										{mission?.name}
									</CardTitle>
									<CardSubTitle tag='h3' className='h3 text-muted mt-4'>
										{mission?.description}
									</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<h3>Chỉ số mục tiêu</h3>
								<div className='d-flex justify-content-start align-items-center'>
									{mission?.keys?.map((item, index) => (
										// eslint-disable-next-line react/no-array-index-key
										<div style={{ minWidth: '20%' }} key={index}>
											<MissionTitleIndex>{item?.name}</MissionTitleIndex>
											<MissionValueIndex>{item?.value}</MissionValueIndex>
										</div>
									))}
								</div>
							</CardBody>
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
								icon='AddCircle'
								// onClick={handleUpcomingEdit}
							>
								Thêm công việc
							</Button>
						</div>
					</div>
				</div>
				<div className='row mt-3'>
					{mission?.tasks?.map((item, index) => {
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
							Thêm công việc
						</Button>
					</ModalFooter>
				</Modal>
			</Page>
		</PageWrapper>
	);
};

export default MissionDetailPage;
