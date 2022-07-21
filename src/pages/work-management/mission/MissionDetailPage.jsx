// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import moment from 'moment';
import styled from 'styled-components';
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
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Alert from '../../../components/bootstrap/Alert';
import Button from '../../../components/bootstrap/Button';
import Badge from '../../../components/bootstrap/Badge';
import Icon from '../../../components/icon/Icon';
import Progress from '../../../components/bootstrap/Progress';
import Chart from '../../../components/extras/Chart';
import Avatar, { AvatarGroup } from '../../../components/Avatar';
import USERS, { getUserDataWithId } from '../../../common/data/userDummyData';
import dummyEventsData from '../../../common/data/dummyEventsData';
import useDarkMode from '../../../hooks/useDarkMode';
import { priceFormat } from '../../../helpers/helpers';
import EVENT_STATUS from '../../../common/data/enumEventStatus';
import COLORS from '../../../common/data/enumColors';

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

	const { darkModeStatus } = useDarkMode();
	const data = getUserDataWithId(params?.id);

	const [dayHours] = useState({
		series: [
			{
				data: [8, 12, 15, 20, 15, 22, 9],
			},
		],
		options: {
			colors: [process.env.REACT_APP_SUCCESS_COLOR],
			chart: {
				type: 'radar',
				width: 200,
				height: 200,
				sparkline: {
					enabled: true,
				},
			},
			xaxis: {
				categories: [
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
					'Sunday',
				],
				convertedCatToNumeric: false,
			},
			tooltip: {
				theme: 'dark',
				fixed: {
					enabled: false,
				},
				x: {
					show: true,
				},
				y: {
					title: {
						// eslint-disable-next-line no-unused-vars
						formatter(seriesName) {
							return 'Hours';
						},
					},
				},
			},
			stroke: {
				curve: 'smooth',
				width: 2,
			},
			plotOptions: {
				radar: {
					polygons: {
						strokeColors: `${COLORS.SUCCESS.code}50`,
						strokeWidth: 1,
						connectorColors: `${COLORS.SUCCESS.code}50`,
					},
				},
			},
		},
	});

	const userTasks = dummyEventsData.filter((f) => f.assigned.username === data.username);

	return (
		<PageWrapper title={`${mission?.name}`}>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<div className='display-4 fw-bold py-3'>{mission?.name}</div>
					</div>
					<div className='col-lg-4'>
						<Card className='shadow-3d-info'>
							<CardBody>
								<div className='row g-5'>
									<div className='col-12 d-flex justify-content-center'>
										<Avatar
											src={data.src}
											srcSet={data.srcSet}
											color={data.color}
											isOnline={data.isOnline}
										/>
									</div>
									<div className='col-12'>
										<div className='row g-2'>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon icon='Mail' size='3x' color='info' />
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{`${data.username}@site.com`}
														</div>
														<div className='text-muted'>
															Email Address
														</div>
													</div>
												</div>
											</div>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon icon='Tag' size='3x' color='info' />
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{`@${data.username}`}
														</div>
														<div className='text-muted'>
															Social name
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='Stream' iconColor='warning'>
									<CardTitle>Skill</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								{data.services ? (
									<div className='row g-2'>
										{data?.services.map((service) => (
											<div key={service.name} className='col-auto'>
												<Badge
													isLight
													color={service.color}
													className='px-3 py-2'>
													<Icon
														icon={service.icon}
														size='lg'
														className='me-1'
													/>
													{service.name}
												</Badge>
											</div>
										))}
									</div>
								) : (
									<div className='row'>
										<div className='col'>
											<Alert
												color='warning'
												isLight
												icon='Report'
												className='mb-0'>
												No results to show
											</Alert>
										</div>
									</div>
								)}
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='ShowChart' iconColor='secondary'>
									<CardTitle>Chỉ số key</CardTitle>
								</CardLabel>
								<CardActions>
									Only in <strong>{moment().format('MMM')}</strong>.
								</CardActions>
							</CardHeader>
							<CardBody>
								<div className='row g-4 align-items-center'>
									<div className='col-xl-6'>
										<div
											className={classNames(
												'd-flex align-items-center rounded-2 p-3',
												{
													'bg-l10-warning': !darkModeStatus,
													'bg-lo25-warning': darkModeStatus,
												},
											)}>
											<div className='flex-shrink-0'>
												<Icon icon='DoneAll' size='3x' color='warning' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>12345</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													Đơn hàng
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
										<div
											className={classNames(
												'd-flex align-items-center rounded-2 p-3',
												{
													'bg-l10-info': !darkModeStatus,
													'bg-lo25-info': darkModeStatus,
												},
											)}>
											<div className='flex-shrink-0'>
												<Icon icon='Savings' size='3x' color='info' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>1,280 tỷ</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													Doanh thu
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
										<div
											className={classNames(
												'd-flex align-items-center rounded-2 p-3',
												{
													'bg-l10-primary': !darkModeStatus,
													'bg-lo25-primary': darkModeStatus,
												},
											)}>
											<div className='flex-shrink-0'>
												<Icon
													icon='Celebration'
													size='3x'
													color='primary'
												/>
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>76</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													Khách mời
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
										<div
											className={classNames(
												'd-flex align-items-center rounded-2 p-3',
												{
													'bg-l10-success': !darkModeStatus,
													'bg-lo25-success': darkModeStatus,
												},
											)}>
											<div className='flex-shrink-0'>
												<Icon icon='Timer' size='3x' color='success' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>427</div>
												<div className='text-muted mt-n2'>Giờ làm việc</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-8'>
						<Card className='shadow-3d-primary'>
							<CardHeader>
								<CardLabel icon='Summarize' iconColor='success'>
									<CardTitle tag='h4' className='h5'>
										Tổng kết
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-md-6'>
										<Card
											className={`bg-l${
												darkModeStatus ? 'o25' : '25'
											}-primary bg-l${
												darkModeStatus ? 'o50' : '10'
											}-primary-hover transition-base rounded-2 mb-4`}
											shadow='sm'>
											<CardHeader className='bg-transparent'>
												<CardLabel>
													<CardTitle tag='h4' className='h5'>
														Tiến độ công việc
													</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<div className='d-flex align-items-center pb-3'>
													<div className='flex-shrink-0'>
														<Icon
															icon='EmojiEmotions'
															size='4x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-3 mb-0'>
															70%
															<span className='text-info fs-5 fw-bold ms-3'>
																0
																<Icon icon='TrendingFlat' />
															</span>
														</div>
														<div className='text-muted'>
															trên tổng số 200 công việc (5000 đầu
															việc)
														</div>
													</div>
												</div>
											</CardBody>
										</Card>
										<Card
											className={`bg-l${
												darkModeStatus ? 'o25' : '25'
											}-danger bg-l${
												darkModeStatus ? 'o50' : '10'
											}-danger-hover transition-base rounded-2 mb-0`}
											shadow='sm'>
											<CardHeader className='bg-transparent'>
												<CardLabel>
													<CardTitle tag='h4' className='h5'>
														Đầu việc bị huỷ/thất bại
													</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<div className='d-flex align-items-center pb-3'>
													<div className='flex-shrink-0'>
														<Icon
															icon='Healing'
															size='4x'
															color='danger'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-3 mb-0'>
															61
															<span className='text-danger fs-5 fw-bold ms-3'>
																-50%
																<Icon icon='TrendingDown' />
															</span>
														</div>
														<div className='text-muted'>
															Thuộc 6 công việc
														</div>
													</div>
												</div>
											</CardBody>
										</Card>
									</div>
									<div className='col-md-6'>
										<Card
											className={`bg-l${
												darkModeStatus ? 'o25' : '25'
											}-success bg-l${
												darkModeStatus ? 'o50' : '10'
											}-success-hover transition-base rounded-2 mb-0`}
											stretch
											shadow='sm'>
											<CardHeader className='bg-transparent'>
												<CardLabel>
													<CardTitle tag='h4' className='h5'>
														Báo cáo ngày
													</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody className='pt-0'>
												<Chart
													className='d-flex justify-content-center'
													series={dayHours.series}
													options={dayHours.options}
													type={dayHours.options.chart.type}
													height={dayHours.options.chart.height}
													width={dayHours.options.chart.width}
												/>
												<div className='d-flex align-items-center pb-3'>
													<div className='flex-shrink-0'>
														<Icon
															icon='Timer'
															size='4x'
															color='success'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-3 mb-0'>
															~22H
															<span className='text-success fs-5 fw-bold ms-3'>
																+12.5%
																<Icon icon='TrendingUp' />
															</span>
														</div>
														<div className='text-muted'>
															Giờ làm việc đã được hoàn thành
														</div>
													</div>
												</div>
											</CardBody>
										</Card>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='Task' iconColor='danger'>
									<CardTitle>
										<CardLabel>Danh sách công việc</CardLabel>
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='table-responsive'>
									<table className='table table-modern mb-0'>
										<thead>
											<tr>
												<th>Date / Time</th>
												<th>Customer</th>
												<th>Service</th>
												<th>Duration</th>
												<th>Payment</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>
											{userTasks.map((item) => (
												<tr key={item.id}>
													<td>
														<div className='d-flex align-items-center'>
															<span
																className={classNames(
																	'badge',
																	'border border-2 border-light',
																	'rounded-circle',
																	'bg-success',
																	'p-2 me-2',
																	`bg-${item.status.color}`,
																)}>
																<span className='visually-hidden'>
																	{item.status.name}
																</span>
															</span>
															<span className='text-nowrap'>
																{moment(
																	`${item.date} ${item.time}`,
																).format('MMM Do YYYY, h:mm a')}
															</span>
														</div>
													</td>
													<td>
														<div>
															<div>{item.customer.name}</div>
															<div className='small text-muted'>
																{item.customer.email}
															</div>
														</div>
													</td>
													<td>{item.service.name}</td>
													<td>{item.duration}</td>
													<td>
														{item.payment && priceFormat(item.payment)}
													</td>
													<td>
														<Dropdown>
															<DropdownToggle hasIcon={false}>
																<Button
																	isLink
																	color={item.status.color}
																	icon='Circle'
																	className='text-nowrap'>
																	{item.status.name}
																</Button>
															</DropdownToggle>
															<DropdownMenu>
																{Object.keys(EVENT_STATUS).map(
																	(key) => (
																		<DropdownItem key={key}>
																			<div>
																				<Icon
																					icon='Circle'
																					color={
																						EVENT_STATUS[
																							key
																						].color
																					}
																				/>
																				{
																					EVENT_STATUS[
																						key
																					].name
																				}
																			</div>
																		</DropdownItem>
																	),
																)}
															</DropdownMenu>
														</Dropdown>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								{!userTasks.length && (
									<Alert color='warning' isLight icon='Report' className='mt-3'>
										There is no scheduled and assigned task.
									</Alert>
								)}
							</CardBody>
						</Card>
					</div>
				</div>
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
			</Page>
		</PageWrapper>
	);
};

export default MissionDetailPage;
