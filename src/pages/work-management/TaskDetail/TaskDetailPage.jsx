// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
import classNames from 'classnames';
import moment from 'moment';
import Dropdown, { DropdownToggle, DropdownMenu, DropdownItem } from '../../../components/bootstrap/Dropdown';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Alert from '../../../components/bootstrap/Alert';
import Button from '../../../components/bootstrap/Button';
import Badge from '../../../components/bootstrap/Badge';
import Icon from '../../../components/icon/Icon';
import Progress from '../../../components/bootstrap/Progress';
import Avatar from '../../../components/Avatar';
// import TaskProgress from '../task-management/TaskProgress';
import TaskDetailForm from './TaskDetailForm/TaskDetailForm';
// import COLORS from '../../../common/data/enumColors';
import dummyEventsData from '../../../common/data/dummyEventsData';
// import { priceFormat } from '../../../helpers/helpers';
import { getUserDataWithId } from '../../../common/data/userDummyData';
import useDarkMode from '../../../hooks/useDarkMode';
import Chart from '../../../components/extras/Chart';

const TaskDetailPage = () => {
	const [task, setTask] = useState({});
	const params = useParams();
	React.useEffect(() => {
		axios.get(`https://fake-data-dwt.herokuapp.com/tasks/${parseInt(params?.id, 10)}`)
			.then(res => {
				setTask(res.data);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [subtask, setSubTask] = React.useState();
	React.useEffect(() => {
		setSubTask(task.subtasks)
	}, [task]);
	const data = getUserDataWithId(params?.id);
	const { darkModeStatus } = useDarkMode();
	const [editModalStatus, setEditModalStatus] = useState(false);
	const [idEdit, setIdEdit] = useState(0);
	const [title, setTitle] = useState();
	const handleOpenModal = (id, titles) => {
		setEditModalStatus(true);
		setIdEdit(id);
		setTitle(titles)
	}
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
		},
	});
	const userTasks = dummyEventsData.filter((f) => f.assigned.username === data.username);
	function color(props) {
		if (props === 0) {
			return { name: "Đang thực hiện", color: "primary" }
		}
		if (props === 1) {
			return { name: "Đã hoàn thành", color: "success" }
		}
		if (props === 2) {
			return { name: "Bế tắc", color: "danger" }
		}
		if (props === 3) {
			return { name: "Xem xét", color: "warning" }
		}
		return 'light'
	}
	function priority(props) {
		if (props === 1) {
			return "success"
		}
		if (props === 2) {
			return "primary"
		}
		if (props === 3) {
			return "danger"
		}
		if (props === 4) {
			return "warning"
		}
		if (props === 5) {
			return "warning"
		}
		return 'light'
	}
	const handleDelete = async (idDelete) => {
		const newSubTasks = subtask.filter((item) => item.id !== idDelete)
		const taskValue = JSON.parse(JSON.stringify(task))
		const newData = Object.assign(taskValue, { subtasks: newSubTasks })
		const respose = await axios.patch(`https://fake-data-dwt.herokuapp.com/tasks/${parseInt(params?.id, 10)}`, newData)
		const result = await respose.data
		setTask(result)
	}
	return (
		<PageWrapper title={`${task?.name}`}>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<div className='display-4 fw-bold py-3'>{task?.name}</div>
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
											className={`bg-l${darkModeStatus ? 'o25' : '25'
												}-primary bg-l${darkModeStatus ? 'o50' : '10'
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
											className={`bg-l${darkModeStatus ? 'o25' : '25'
												}-danger bg-l${darkModeStatus ? 'o50' : '10'
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
											className={`bg-l${darkModeStatus ? 'o25' : '25'
												}-success bg-l${darkModeStatus ? 'o50' : '10'
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
										<CardLabel>Danh sách đầu việc</CardLabel>
									</CardTitle>
								</CardLabel>
								<Button
									color='success'
									size='lg'
									isLight
									className='w-30 h-100'
									onClick={() => handleOpenModal(0, 'add')}
									icon='AddCircle'>
									Thêm đầu việc
								</Button>
							</CardHeader>
							<CardBody>
								<div className='table-responsive'>
									<table className='table table-modern mb-0' style={{ textAlign: 'center' }}>
										<thead>
											<tr>
												<th>Ngày tạo</th>
												<th>Tên đầu việc</th>
												<th>Độ ưu tiên</th>
												<th>Kpi</th>
												<th>Hạn hoàn thành</th>
												<th>Tiến độ công việc</th>
												<th>Trạng thái</th>
												<th>Hành động</th>
											</tr>
										</thead>
										<tbody>
											{subtask ? '' : <tr style={{ textAlign: 'center' }}><td>Chưa có đầu việc nào</td></tr>}
											{subtask?.map((item) => (
												<tr key={item.id}>
													<td>
														<div className='d-flex align-items-center'>
															<span className='text-nowrap'>
																{item.estimate_time} {' '}{item.estimate_date}`,
															</span>
														</div>
													</td>
													<td>
														<div>
															<div>{item.name}</div>
															<div className='small text-muted'>
																{item.departmnent?.name}
															</div>
														</div>
													</td>
													<td>
														<span
															style={{
																paddingRight: '1rem',
																paddingLeft: '1rem',
															}}
															className={classNames(
																'badge',
																'border border-2',
																// [`border-${themeStatus}`],
																'bg-success',
																'pt-2 pb-2 me-2',
																`bg-${priority(item.priority)}`,
															)}>
															<span className=''>{`Cấp ${item.priority}`}</span>
														</span>
													</td>
													<td>{item.kpi_value}</td>
													<td>{item.deadline_time}{' '}{item.deadline_date}</td>
													<td>
														<Progress isAutoColor value={item.percent} height={10} />
													</td>
													<td>
														<Icon
															icon='Circle'
															color={color(item.status).color} />
														{color(item.status).name}
													</td>
													<td>
														<Dropdown>
															<DropdownToggle hasIcon={false}>
																<Button icon='MoreHoriz' />
															</DropdownToggle>
															<DropdownMenu isAlignmentEnd>
																<DropdownItem>
																	<Button icon='Delete' onClick={() => handleDelete(item.id)}>
																		Delete
																	</Button>
																</DropdownItem>
																<DropdownItem>
																	<Button icon='Edit' onClick={() => handleOpenModal(item.id, 'edit')}>
																		Edit
																	</Button>
																</DropdownItem>
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
				<TaskDetailForm
					title={title}
					setTask={setTask}
					task={task}
					setEditModalStatus={setEditModalStatus}
					editModalStatus={editModalStatus}
					id={parseInt(params?.id, 10)}
					idEdit={idEdit} />
			</Page>
		</PageWrapper>
	);
};
export default TaskDetailPage;