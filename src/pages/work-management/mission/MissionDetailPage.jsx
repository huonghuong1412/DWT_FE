// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast,{ Toaster } from 'react-hot-toast';
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
import Button from '../../../components/bootstrap/Button';
import Badge from '../../../components/bootstrap/Badge';
import Icon from '../../../components/icon/Icon';
import Progress from '../../../components/bootstrap/Progress';
import Avatar, { AvatarGroup } from '../../../components/Avatar';
import USERS from '../../../common/data/userDummyData';
// import TaskProgress from '../task-management/TaskProgress';
import MissionDetailForm from './TaskDetailForm/MissionDetailForm';

const Item = ({
	name,
	teamName,
	attachCount,
	taskCount,
	percent,
	startTime,
	endTime,
	id,
	handleOpenModal,
	setEditModalStatus,
	...props
}) => {
	const navigate = useNavigate();
	const handleOnClickToProjectPage = useCallback(
		() => navigate(`../${demoPages.quanLyCongViec.subMenu.chiTietCongViecPhongBan.path}`),
		[navigate],
	);
	const date = `Còn 30 ngày nữa`;
	const handleDelete = (idDelete) => {
        try {
            axios.delete(`https://fake-data-dwt.herokuapp.com/tasks/${idDelete}`)
            toast.success(`Delete Task success !`)
        } catch {
            toast.error('Delete Task Error !')
		}
		setEditModalStatus(false)
    }
	return (
		<div className='col-md-6 col-xl-4 col-sm-12' {...props}>
			<Toaster/>
			<Card stretchclassName='cursor-pointer'>
				<CardHeader>
					<CardLabel icon='Ballot' onClick={handleOnClickToProjectPage} >
						<CardTitle>{name}</CardTitle>
						<CardSubTitle>{teamName}</CardSubTitle>
					</CardLabel>
					<CardActions>
						<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
							{date}
						</small>
					</CardActions>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button icon='MoreHoriz' />
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd>
							<DropdownItem>
								<Button icon='Delete' onClick={()=>handleDelete(id)}>
									Delete
								</Button>
							</DropdownItem>
							<DropdownItem>
								<Button icon='Edit' onClick={()=>handleOpenModal(id)}>
									Edit
								</Button>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</CardHeader>
				<CardBody>
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
		axios.get(`https://fake-data-dwt.herokuapp.com/tasks?mission_id=${parseInt(params?.id, 10)}`)
			.then(res => {
				setMission(res);
			});
	}, [params?.id, editModalStatus]);
	const [editModalStatus, setEditModalStatus] = useState(false);
	const [idEdit, setIdEdit] = useState();
	const handleOpenModal = (id) => {
		setEditModalStatus(true);
		setIdEdit(id);
	}
	return (
		<PageWrapper title={`${mission?.name}`}>
			<Page container='fluid'>
				{/* <div className='row'>
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
				</div> */}
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
								onClick={() => handleOpenModal()}
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
								handleOpenModal={handleOpenModal}
								id={item.id}
								setEditModalStatus={setEditModalStatus}
							/>
						);
					})}
				</div>
				<MissionDetailForm setEditModalStatus={setEditModalStatus} editModalStatus={editModalStatus} id={idEdit} />
			</Page>
		</PageWrapper>
	);
};

export default MissionDetailPage;