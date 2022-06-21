import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { dashboardMenu } from '../../menu';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import Button, { ButtonGroup } from '../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../components/bootstrap/Card';
import Chart from '../../components/extras/Chart';

import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import Alert, { AlertHeading } from '../../components/bootstrap/Alert';

import Popovers from '../../components/bootstrap/Popovers';
import CommonAvatarTeam from '../../components/common/CommonAvatarTeam';

import Company1 from '../../assets/logos/company1.png';
import Company2 from '../../assets/logos/company2.png';
import Company3 from '../../assets/logos/company3.png';
import Company4 from '../../assets/logos/company4.png';

import Avatar from '../../components/Avatar';
import USERS from '../../common/data/userDummyData';
import useDarkMode from '../../hooks/useDarkMode';
import CommonTodo from '../common/CommonTodo';

import TaskProgressTable from '../work-management/task-management/TaskProgressTable';

// eslint-disable-next-line react/prop-types
const AnswerCustomer = ({ id, imgWebp, img, name, job, value, color }) => {
	const [state] = useState({
		series: [value],
		options: {
			chart: {
				type: 'radialBar',
				width: 50,
				height: 50,
				sparkline: {
					enabled: true,
				},
			},
			dataLabels: {
				enabled: false,
			},
			plotOptions: {
				radialBar: {
					hollow: {
						margin: 0,
						size: '50%',
					},
					track: {
						margin: 0,
					},
					dataLabels: {
						show: false,
					},
				},
			},
			stroke: {
				lineCap: 'round',
			},
			colors: [
				(color === 'primary' && process.env.REACT_APP_PRIMARY_COLOR) ||
					(color === 'secondary' && process.env.REACT_APP_SECONDARY_COLOR) ||
					(color === 'success' && process.env.REACT_APP_SUCCESS_COLOR) ||
					(color === 'info' && process.env.REACT_APP_INFO_COLOR) ||
					(color === 'warning' && process.env.REACT_APP_WARNING_COLOR) ||
					(color === 'danger' && process.env.REACT_APP_DANGER_COLOR),
			],
		},
	});
	return (
		<div className='col-12' key={id}>
			<div className='row g-2'>
				<div className='col d-flex'>
					<div className='flex-shrink-0'>
						<Avatar
							src={img}
							srcSet={imgWebp}
							size={54}
							userName={name}
							color={color}
						/>
					</div>
					<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
						<div>
							{name}
							<div className='text-muted mt-n1'>
								<small>{job}</small>
							</div>
						</div>
					</div>
				</div>
				<div className='col-auto'>
					<div className='d-flex align-items-center'>
						<Popovers desc='Remaining time' trigger='hover'>
							<span className='me-3'>%{value}</span>
						</Popovers>
						<Chart
							series={state.series}
							options={state.options}
							type={state.options.chart.type}
							height={state.options.chart.height}
							width={state.options.chart.width}
							className='me-3'
						/>
						<Button
							color='info'
							isLight
							icon='ScheduleSend'
							className='text-nowrap'
							tag='a'
							href='mailto:example@site.com'>
							Gửi
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

const DashboardPage = () => {
	const { themeStatus, darkModeStatus } = useDarkMode();

	const TABS = {
		DAILY: 'Ngày',
		MONTHLY: 'Tháng',
		YEARLY: 'Quý',
	};
	const [activeTab, setActiveTab] = useState(TABS.YEARLY);

	const [sales, setSales] = useState({
		series: [
			{
				data: [34, 32, 36, 34, 34],
			},
		],
		options: {
			colors: [process.env.REACT_APP_WARNING_COLOR],
			chart: {
				type: 'line',
				width: '100%',
				height: 150,
				sparkline: {
					enabled: true,
				},
			},
			tooltip: {
				theme: 'dark',
				fixed: {
					enabled: false,
				},
				x: {
					show: false,
				},
				y: {
					title: {
						// eslint-disable-next-line no-unused-vars
						formatter(seriesName) {
							return '';
						},
					},
				},
			},
			stroke: {
				curve: 'smooth',
				width: 2,
			},
		},
		sales: {
			compare: 24,
		},
		campaigns: {
			price: 3265.72,
			compare: 5000,
		},
		coupons: {
			price: 2654.2,
			compare: 2300,
		},
	});
	useEffect(() => {
		if (activeTab === TABS.YEARLY) {
			setSales({
				series: [
					{
						data: [34, 32, 36, 34, 34],
					},
				],
				sales: {
					compare: 24,
				},
				campaigns: {
					price: 3265.72,
					compare: 5000,
				},
				coupons: {
					price: 2654.2,
					compare: 2300,
				},
				options: sales.options,
			});
		}
		if (activeTab === TABS.MONTHLY) {
			setSales({
				series: [
					{
						data: [32, 35, 40, 30, 32],
					},
				],
				sales: {
					compare: 27,
				},
				campaigns: {
					price: 450,
					compare: 480,
				},
				coupons: {
					price: 98,
					compare: 120,
				},
				options: sales.options,
			});
		}
		if (activeTab === TABS.WEEKLY) {
			setSales({
				series: [
					{
						data: [28, 32, 30, 29, 30],
					},
				],
				sales: {
					compare: 12,
				},
				campaigns: {
					price: 94,
					compare: 80,
				},
				coupons: {
					price: 80,
					compare: 45,
				},
				options: sales.options,
			});
		}
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	const [year, setYear] = useState(Number(moment().format('YYYY')));
	const companies = [
		{ name: 'Công ty A', img: Company1 },
		{ name: 'Công ty B', img: Company2 },
		{ name: 'Công ty C', img: Company3 },
		{ name: 'Công ty D', img: Company4 },
	];
	const COMPANIES_TAB = {
		COMP1: companies[0].name,
		COMP2: companies[1].name,
		COMP3: companies[2].name,
		COMP4: companies[3].name,
	};
	const [activeCompanyTab, setActiveCompanyTab] = useState(COMPANIES_TAB.COMP1);
	function randomize(value, x = year) {
		if (x === 2019) {
			if (value.toFixed(0) % 2) {
				return (value * 1.5).toFixed(2);
			}
			return (value / 1.4).toFixed(2);
		}
		if (x === 2020) {
			if (value.toFixed(0) % 2) {
				return (value / 1.5).toFixed(2);
			}
			return (value * 1.4).toFixed(2);
		}
		if (x === 2021) {
			if (value.toFixed(0) % 2) {
				return (value / 2).toFixed(2);
			}
			return (value * 1.4).toFixed(2);
		}
		return value.toFixed(2);
	}

	const salesByStoreOptions = {
		chart: {
			height: 370,
			type: 'line',
			stacked: false,
			toolbar: { show: false },
		},
		colors: [
			process.env.REACT_APP_INFO_COLOR,
			process.env.REACT_APP_SUCCESS_COLOR,
			process.env.REACT_APP_WARNING_COLOR,
		],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: [1, 1, 4],
			curve: 'smooth',
		},
		plotOptions: {
			bar: {
				borderRadius: 5,
				columnWidth: '20px',
			},
		},
		xaxis: {
			categories: [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			],
		},
		yaxis: [
			{
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
					color: process.env.REACT_APP_INFO_COLOR,
				},
				labels: {
					style: {
						colors: process.env.REACT_APP_INFO_COLOR,
					},
				},
				title: {
					text: 'Income (thousand cores)',
					style: {
						color: process.env.REACT_APP_INFO_COLOR,
					},
				},
				tooltip: {
					enabled: true,
				},
			},
			{
				seriesName: 'Income',
				opposite: true,
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
					color: process.env.REACT_APP_SUCCESS_COLOR,
				},
				labels: {
					style: {
						colors: process.env.REACT_APP_SUCCESS_COLOR,
					},
				},
				title: {
					text: 'Operating Cash Flow (thousand cores)',
					style: {
						color: process.env.REACT_APP_SUCCESS_COLOR,
					},
				},
			},
			{
				seriesName: 'Revenue',
				opposite: true,
				axisTicks: {
					show: true,
				},
				axisBorder: {
					show: true,
					color: process.env.REACT_APP_WARNING_COLOR,
				},
				labels: {
					style: {
						colors: process.env.REACT_APP_WARNING_COLOR,
					},
				},
				title: {
					text: 'Revenue (thousand cores)',
					style: {
						color: process.env.REACT_APP_WARNING_COLOR,
					},
				},
			},
		],
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: true,
				position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
				offsetY: 30,
				offsetX: 60,
			},
		},
		legend: {
			horizontalAlign: 'left',
			offsetX: 40,
		},
	};
	const salesByStoreSeries1 = [
		{
			name: 'Income',
			type: 'column',
			data: [
				randomize(1.4),
				randomize(2),
				randomize(2.5),
				randomize(1.5),
				randomize(2.5),
				randomize(2.8),
				randomize(3.8),
				randomize(4.6),
			],
		},
		{
			name: 'Cash Flow',
			type: 'column',
			data: [
				randomize(1.1),
				randomize(3),
				randomize(3.1),
				randomize(4),
				randomize(4.1),
				randomize(4.9),
				randomize(6.5),
				randomize(8.5),
			],
		},
		{
			name: 'Revenue',
			type: 'line',
			data: [
				randomize(20),
				randomize(29),
				randomize(37),
				randomize(36),
				randomize(44),
				randomize(45),
				randomize(50),
				randomize(58),
			],
		},
	];
	const salesByStoreSeries2 = [
		{
			name: 'Income',
			type: 'column',
			data: [
				randomize(4.4),
				randomize(5),
				randomize(6.5),
				randomize(7.5),
				randomize(6.5),
				randomize(9.8),
				randomize(7.8),
				randomize(6.6),
			],
		},
		{
			name: 'Cash Flow',
			type: 'column',
			data: [
				randomize(3),
				randomize(3),
				randomize(5.1),
				randomize(5),
				randomize(7.1),
				randomize(9.9),
				randomize(8.5),
				randomize(9.5),
			],
		},
		{
			name: 'Revenue',
			type: 'line',
			data: [
				randomize(34),
				randomize(54),
				randomize(43),
				randomize(63),
				randomize(35),
				randomize(63),
				randomize(46),
				randomize(53),
			],
		},
	];
	const salesByStoreSeries3 = [
		{
			name: 'Income',
			type: 'column',
			data: [
				randomize(4),
				randomize(3),
				randomize(2.5),
				randomize(1.5),
				randomize(2.5),
				randomize(3.8),
				randomize(3.8),
				randomize(4.6),
			],
		},
		{
			name: 'Cash Flow',
			type: 'column',
			data: [
				randomize(2),
				randomize(5),
				randomize(6.1),
				randomize(2),
				randomize(6.1),
				randomize(3.9),
				randomize(6.5),
				randomize(8.5),
			],
		},
		{
			name: 'Revenue',
			type: 'line',
			data: [
				randomize(34),
				randomize(21),
				randomize(54),
				randomize(56),
				randomize(34),
				randomize(43),
				randomize(37),
				randomize(43),
			],
		},
	];
	const salesByStoreSeries4 = [
		{
			name: 'Income',
			type: 'column',
			data: [
				randomize(3),
				randomize(3.2),
				randomize(1.4),
				randomize(1.9),
				randomize(2.9),
				randomize(1.8),
				randomize(4.6),
				randomize(4.2),
			],
		},
		{
			name: 'Cash Flow',
			type: 'column',
			data: [
				randomize(3),
				randomize(2),
				randomize(3.1),
				randomize(5),
				randomize(3.1),
				randomize(3.9),
				randomize(3.5),
				randomize(5.5),
			],
		},
		{
			name: 'Revenue',
			type: 'line',
			data: [
				randomize(30),
				randomize(43),
				randomize(51),
				randomize(19),
				randomize(32),
				randomize(25),
				randomize(39),
				randomize(42),
			],
		},
	];

	return (
		<PageWrapper title={dashboardMenu.dashboard.text}>
			<SubHeader>
				<SubHeaderLeft>
					<span className='h4 mb-0 fw-bold'>Bộ lọc</span>
					<SubheaderSeparator />
					<ButtonGroup>
						{Object.keys(TABS).map((key) => (
							<Button
								key={key}
								color={activeTab === TABS[key] ? 'success' : themeStatus}
								onClick={() => setActiveTab(TABS[key])}>
								{TABS[key]}
							</Button>
						))}
					</ButtonGroup>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonAvatarTeam>
						<strong>Marketing</strong> Team
					</CommonAvatarTeam>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<Alert
							icon='Verified'
							isLight
							color='primary'
							borderWidth={0}
							className='shadow-3d-primary'
							isDismissible>
							<AlertHeading tag='h2' className='h4'>
								Chúc mừng! Đầu việc “15. Thiết kế banner” đã hoàn tất.
							</AlertHeading>
							<span>Trưởng bộ phận Nhãn đã xác nhận đầu việc này hoàn thành!</span>
						</Alert>
					</div>
					<div className='col-xxl-9 col-xl-12'>
						<div className='row'>
							<div className='col-xxl-8'>
								<Card stretch>
									<CardHeader>
										<CardLabel icon='ReceiptLong'>
											<CardTitle tag='h4' className='h5'>
												Doanh số của cửa hàng
											</CardTitle>
											<CardSubTitle tag='h5' className='h6'>
												Báo cáo
											</CardSubTitle>
										</CardLabel>
										<CardActions>
											<ButtonGroup>
												<Button
													color='primary'
													isLight
													icon='ChevronLeft'
													aria-label='Previous Year'
													isDisable={year <= 2019}
													onClick={() => setYear(year - 1)}
												/>
												<Button color='primary' isLight isDisable>
													{year}
												</Button>
												<Button
													color='primary'
													isLight
													icon='ChevronRight'
													aria-label='Next Year'
													isDisable={year >= 2021}
													onClick={() => setYear(year + 1)}
												/>
											</ButtonGroup>
										</CardActions>
									</CardHeader>
									<CardBody>
										<div className='row'>
											<div className='col-xl-3 col-xxl-2'>
												<div className='row g-3'>
													{companies.map((company) => (
														<div
															key={company.name}
															className='col-xl-12 col-lg-6 col-sm-12'>
															<Button
																isLight={
																	activeCompanyTab !==
																	company.name
																}
																onClick={() =>
																	setActiveCompanyTab(
																		company.name,
																	)
																}
																color={themeStatus}
																className='w-100 py-4'
																shadow='sm'
																hoverShadow='none'>
																<img
																	src={company.img}
																	alt={company.name}
																	width='auto'
																	height={24}
																/>
															</Button>
														</div>
													))}
												</div>
											</div>
											<div className='col-xl-9 col-xxl-10'>
												<Chart
													series={
														(activeCompanyTab === COMPANIES_TAB.COMP1 &&
															salesByStoreSeries1) ||
														(activeCompanyTab === COMPANIES_TAB.COMP2 &&
															salesByStoreSeries2) ||
														(activeCompanyTab === COMPANIES_TAB.COMP3 &&
															salesByStoreSeries3) ||
														salesByStoreSeries4
													}
													options={salesByStoreOptions}
													type={salesByStoreOptions.chart.type}
													height={salesByStoreOptions.chart.height}
												/>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
							<div className='col-xxl-4'>
								<Card stretch>
									<CardHeader>
										<CardLabel icon='ContactSupport' iconColor='secondary'>
											<CardTitle tag='h4' className='h5'>
												Chờ câu trả lời
											</CardTitle>
											<CardSubTitle tag='h5' className='h6'>
												Khách hàng
											</CardSubTitle>
										</CardLabel>
										<CardActions>
											<Dropdown>
												<DropdownToggle hasIcon={false}>
													<Button
														color={darkModeStatus ? 'light' : 'dark'}
														isLink
														hoverShadow='default'
														icon='MoreHoriz'
														aria-label='More Actions'
													/>
												</DropdownToggle>
												<DropdownMenu isAlignmentEnd>
													<DropdownItem>
														<Button
															icon='Send'
															tag='a'
															href='mailto:example@site.com'>
															Gửi
														</Button>
													</DropdownItem>
												</DropdownMenu>
											</Dropdown>
										</CardActions>
									</CardHeader>
									<CardBody>
										<div className='row g-3'>
											<AnswerCustomer
												id={USERS.EMPLOYEETEST.id}
												img={USERS.EMPLOYEETEST.src}
												imgWebp={USERS.EMPLOYEETEST.srcSet}
												name={`${USERS.EMPLOYEETEST.fullname}`}
												color={USERS.EMPLOYEETEST.color}
												job='tp.trade@doppelherz.vn'
												value={43}
											/>
											<AnswerCustomer
												id={USERS.EMPLOYEETEST.id}
												img={USERS.EMPLOYEETEST.src}
												imgWebp={USERS.EMPLOYEETEST.srcSet}
												name={`${USERS.EMPLOYEETEST.fullname}`}
												color={USERS.EMPLOYEETEST.color}
												job='tp.trade@doppelherz.vn'
												value={35}
											/>
											<AnswerCustomer
												id={USERS.EMPLOYEETEST.id}
												img={USERS.EMPLOYEETEST.src}
												imgWebp={USERS.EMPLOYEETEST.srcSet}
												name={`${USERS.EMPLOYEETEST.fullname}`}
												color={USERS.EMPLOYEETEST.color}
												job='tp.trade@doppelherz.vn'
												value={27}
											/>
											<AnswerCustomer
												id={USERS.EMPLOYEETEST.id}
												img={USERS.EMPLOYEETEST.src}
												imgWebp={USERS.EMPLOYEETEST.srcSet}
												name={`${USERS.EMPLOYEETEST.fullname}`}
												color={USERS.EMPLOYEETEST.color}
												job='tp.trade@doppelherz.vn'
												value={15}
											/>
											<AnswerCustomer
												id={USERS.EMPLOYEETEST.id}
												img={USERS.EMPLOYEETEST.src}
												imgWebp={USERS.EMPLOYEETEST.srcSet}
												name={`${USERS.EMPLOYEETEST.fullname}`}
												color={USERS.EMPLOYEETEST.color}
												job='tp.trade@doppelherz.vn'
												value={12}
											/>
											<AnswerCustomer
												id={USERS.EMPLOYEETEST.id}
												img={USERS.EMPLOYEETEST.src}
												imgWebp={USERS.EMPLOYEETEST.srcSet}
												name={`${USERS.EMPLOYEETEST.fullname}`}
												color={USERS.EMPLOYEETEST.color}
												job='tp.trade@doppelherz.vn'
												value={12}
											/>
										</div>
									</CardBody>
								</Card>
							</div>
							<div className='col-xxl-12'>
								<TaskProgressTable />
							</div>
						</div>
					</div>
					<div className='col-xxl-3 col-xl-12'>
						<CommonTodo titleProps='Vấn đề của Bảo' />
					</div>
				</div>
				<div style={{ height: '10rem', padding: '4rem 0' }} />
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
