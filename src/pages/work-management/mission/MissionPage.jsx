import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useToasts } from 'react-toast-notifications';
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
import Toasts from '../../../components/bootstrap/Toasts';
import Button from '../../../components/bootstrap/Button';
import Avatar, { AvatarGroup } from '../../../components/Avatar';
import USERS from '../../../common/data/userDummyData';
import { addNewItem, deleteItemById, getAll, getLatestTasks, updateItemById } from './services';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import MissionAlertConfirm from './MissionAlertConfirm';
import MissionFormModal from './MissionFormModal';
// import Chart from '../../../components/extras/Chart';
// import { dataChart3 } from '../report-department/dataChart';
import Badge from '../../../components/bootstrap/Badge';
import Icon from '../../../components/icon/Icon';
import Progress from '../../../components/bootstrap/Progress';
import { calculateProgressTaskBySteps } from '../../../utils/function';

// eslint-disable-next-line react/prop-types
const Item = ({ id, name, teamName, attachCount, taskCount, percent, dueDate, ...props }) => {
	const navigate = useNavigate();
	const handleOnClickToProjectPage = useCallback(
		() => navigate(`../${demoPages.quanLyCongViec.subMenu.danhSach.path}/${id}`),
		[id, navigate],
	);
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
							{dueDate}
						</small>
					</CardActions>
				</CardHeader>
				<CardBody>
					<div className='row g-2 mb-3'>
						<div className='col-auto'>
							<Badge color='light' isLight>
								<Icon icon='AttachFile' /> {attachCount}
							</Badge>
						</div>
						<div className='col-auto'>
							<Badge color='light' isLight>
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

								<Avatar
									srcSet={USERS.JANE.srcSet}
									src={USERS.JANE.src}
									userName={`${USERS.JANE.name} ${USERS.JANE.surname}`}
									color={USERS.JANE.color}
								/>
								<Avatar
									srcSet={USERS.JOHN.srcSet}
									src={USERS.JOHN.src}
									userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
									color={USERS.JOHN.color}
								/>
								<Avatar
									srcSet={USERS.RYAN.srcSet}
									src={USERS.RYAN.src}
									userName={`${USERS.RYAN.name} ${USERS.RYAN.surname}`}
									color={USERS.RYAN.color}
								/>
							</AvatarGroup>
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

const MissionPage = () => {
	const { addToast } = useToasts();
	const [missions, setMissions] = useState([]);
	const [latestTasks, setLatestTasks] = useState([]);
	const [editModalStatus, setEditModalStatus] = useState(false);
	const [openConfirmModal, setOpenConfirmModal] = useState(false);
	const [itemEdit, setItemEdit] = useState({});
	// const [state3] = useState(dataChart3);

	const navigate = useNavigate();
	const navigateToDetailPage = useCallback(
		(page) => navigate(`/muc-tieu/chi-tiet/${page}`),
		[navigate],
	);
	const handleClearValueForm = () => {
		setItemEdit({
			name: '',
			description: '',
			kpi_value: '',
			start_time: moment().add(0, 'days').format('YYYY-MM-DD'),
			end_time: moment().add(0, 'days').format('YYYY-MM-DD'),
			status: 1,
		});
	};

	// confirm modal
	const handleOpenConfirmModal = (item) => {
		setOpenConfirmModal(true);
		setItemEdit({ ...item });
	};

	const handleCloseConfirmModal = () => {
		setOpenConfirmModal(false);
		setItemEdit(null);
	};

	const handleDeleteItem = async (id) => {
		try {
			await deleteItemById(id);
			const newState = [...missions];
			setMissions(newState.filter((item) => item.id !== id));
			handleCloseConfirmModal();
			handleShowToast(`Xo?? m???c ti??u`, `Xo?? m???c ti??u th??nh c??ng!`);
		} catch (error) {
			handleCloseConfirmModal();
			handleShowToast(`Xo?? m???c ti??u`, `Xo?? m???c ti??u kh??ng th??nh c??ng!`);
		}
	};

	// form modal
	const handleOpenEditForm = (item) => {
		setEditModalStatus(true);
		setItemEdit({ ...item });
	};

	const handleCloseEditForm = () => {
		setEditModalStatus(false);
		setItemEdit(null);
	};

	const handleShowToast = (title, content) => {
		addToast(
			<Toasts title={title} icon='Check2Circle' iconColor='success' time='Now' isDismiss>
				{content}
			</Toasts>,
			{
				autoDismiss: true,
			},
		);
	};

	const handleSubmitMissionForm = async (data) => {
		if (data.id) {
			try {
				const response = await updateItemById(data);
				const result = await response.data;
				const newMissions = [...missions];
				setMissions(
					newMissions.map((item) => (item.id === data.id ? { ...result } : item)),
				);
				handleClearValueForm();
				handleCloseEditForm();
				handleShowToast(
					`C???p nh???t m???c ti??u!`,
					`m???c ti??u ${result.name} ???????c c???p nh???t th??nh c??ng!`,
				);
			} catch (error) {
				setMissions(missions);
				handleShowToast(`C???p nh???t m???c ti??u`, `C???p nh???t m???c ti??u kh??ng th??nh c??ng!`);
			}
		} else {
			try {
				const response = await addNewItem(data);
				const result = await response.data;
				const newMissions = [...missions];
				newMissions.push(result);
				setMissions(newMissions);
				handleClearValueForm();
				handleCloseEditForm();
				handleShowToast(`Th??m m???c ti??u`, `m???c ti??u ${result.name} ???????c th??m th??nh c??ng!`);
			} catch (error) {
				setMissions(missions);
				handleShowToast(`Th??m m???c ti??u`, `Th??m m???c ti??u kh??ng th??nh c??ng!`);
			}
		}
	};

	useEffect(() => {
		// missions
		const fetchData = async () => {
			const result = await getAll();
			setMissions(result.data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		// latest tasks
		const fetchData = async () => {
			const result = await getLatestTasks();
			setLatestTasks(result.data);
		};
		fetchData();
	}, []);

	return (
		<PageWrapper title={demoPages.quanLyCongViec.subMenu.danhSach.text}>
			<Page container='fluid'>
				<div className='row mt-4 mb-4'>
					<div className='col-6'>
						<div className='display-6 fw-bold py-3'>Danh s??ch m???c ti??u</div>
					</div>
				</div>
				{/* <div className='row'>
					<div className='col-xl-6 col-xxl-4 col-md-12 col-sm-12'>
						<Card stretch>
							<CardHeader>
								<CardTitle
									className='text-center w-100'
									style={{ fontSize: '2rem', fontWeight: 500 }}>
									Doanh thu
								</CardTitle>
							</CardHeader>
							<CardBody>
								<Chart
									series={state3.series}
									options={state3.options}
									type={state3.options.chart.type}
									width={state3.options.chart.width}
									className='d-flex align-items-center justify-content-center'
								/>
							</CardBody>
						</Card>
					</div>
					<div className='col-xl-6 col-xxl-4 col-md-12 col-sm-12'>
						<Card stretch>
							<CardHeader>
								<CardTitle
									className='text-center w-100'
									style={{ fontSize: '2rem', fontWeight: 500 }}>
									S???n ph???m b??n ra
								</CardTitle>
							</CardHeader>
							<CardBody>
								<Chart
									series={state3.series}
									options={state3.options}
									type={state3.options.chart.type}
									width={state3.options.chart.width}
									className='d-flex align-items-center justify-content-center'
								/>
							</CardBody>
						</Card>
					</div>
					<div className='col-xl-6 col-xxl-4 col-md-12 col-sm-12'>
						<Card stretch>
							<CardHeader>
								<CardTitle
									className='text-center w-100'
									style={{ fontSize: '2rem', fontWeight: 500 }}>
									Kh??ch h??ng m???i
								</CardTitle>
							</CardHeader>
							<CardBody>
								<Chart
									series={state3.series}
									options={state3.options}
									type={state3.options.chart.type}
									width={state3.options.chart.width}
									className='d-flex align-items-center justify-content-center'
								/>
							</CardBody>
						</Card>
					</div>
				</div> */}
				<div className='row'>
					{missions?.map((item) => (
						<div className='col-md-6 col-xl-4 col-sm-12' key={item.id}>
							<Card stretch>
								<CardHeader className='bg-transparent'>
									<CardLabel>
										<CardTitle tag='h4' className='h5'>
											{item?.name}
										</CardTitle>
										<CardSubTitle>{item?.description}</CardSubTitle>
									</CardLabel>
									<CardActions>
										<Dropdown>
											<DropdownToggle hasIcon={false}>
												<Button
													color='dark'
													isLink
													hoverShadow='default'
													icon='MoreHoriz'
													aria-label='More Actions'
												/>
											</DropdownToggle>
											<DropdownMenu isAlignmentEnd>
												<DropdownItem>
													<Button
														icon='ArrowForwardIos'
														tag='a'
														onClick={() =>
															navigateToDetailPage(item.id)
														}>
														Chi ti???t
													</Button>
												</DropdownItem>
												<DropdownItem>
													<Button
														icon='Edit'
														tag='button'
														onClick={() => handleOpenEditForm(item)}>
														S???a m???c ti??u
													</Button>
												</DropdownItem>
												<DropdownItem>
													<Button
														icon='Delete'
														tag='button'
														onClick={() =>
															handleOpenConfirmModal(item)
														}>
														Xo?? m???c ti??u
													</Button>
												</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</CardActions>
								</CardHeader>
								<CardBody>
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

										<Avatar
											srcSet={USERS.JANE.srcSet}
											src={USERS.JANE.src}
											userName={`${USERS.JANE.name} ${USERS.JANE.surname}`}
											color={USERS.JANE.color}
										/>
										<Avatar
											srcSet={USERS.JOHN.srcSet}
											src={USERS.JOHN.src}
											userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
											color={USERS.JOHN.color}
										/>
										<Avatar
											srcSet={USERS.RYAN.srcSet}
											src={USERS.RYAN.src}
											userName={`${USERS.RYAN.name} ${USERS.RYAN.surname}`}
											color={USERS.RYAN.color}
										/>
									</AvatarGroup>
								</CardBody>
							</Card>
						</div>
					))}
					<div className='col-md-12 col-xl-4 col-sm-12'>
						<Card stretch>
							<CardBody className='d-flex align-items-center justify-content-center'>
								<Button
									color='info'
									size='lg'
									isLight
									className='w-100 h-100'
									icon='AddCircle'
									onClick={() => handleOpenEditForm(null)}>
									Th??m m???c ti??u
								</Button>
							</CardBody>
						</Card>
					</div>
				</div>
				<div className='row mt-4'>
					<div className='col-12'>
						<div className='display-6 fw-bold py-3'>C??ng vi???c m???i c???p nh???t</div>
					</div>
					{latestTasks.map((item) => {
						return (
							<Item
								key={item.id}
								id={item.id}
								name={item?.name}
								teamName={item.departmnent?.name}
								// dueDate={`${item.deadline_date}  ${item.deadline_time}`}
								dueDate={`${item.deadline_date}`}
								percent={calculateProgressTaskBySteps(item?.subtasks) || 0}
								data-tour='project-item'
							/>
						);
					})}
				</div>

				<MissionAlertConfirm
					openModal={openConfirmModal}
					onCloseModal={handleCloseConfirmModal}
					onConfirm={() => handleDeleteItem(itemEdit?.id)}
					title='Xo?? m???c ti??u'
					content={`X??c nh???n xo?? m???c ti??u <strong>${itemEdit?.name}</strong> ?`}
				/>
				<MissionFormModal
					show={editModalStatus}
					onClose={handleCloseEditForm}
					onSubmit={handleSubmitMissionForm}
					item={itemEdit}
				/>
			</Page>
		</PageWrapper>
	);
};

export default MissionPage;
