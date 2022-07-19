import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import moment from 'moment';
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
import Avatar, { AvatarGroup } from '../../../components/Avatar';
import USERS from '../../../common/data/userDummyData';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import { addNewItem, deleteItemById, getAll, updateItemById } from './services';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import MissionAlertConfirm from './MissionAlertConfirm';

const MissionPage = () => {
	const [missions, setMissions] = useState([]);
	const navigate = useNavigate();
	const navigateToDetailPage = useCallback(
		(page) => navigate(`/quan-ly-cong-viec/muc-tieu/${page}`),
		[navigate],
	);
	const [editModalStatus, setEditModalStatus] = useState(false);
	const [openConfirmModal, setOpenConfirmModal] = useState(false);

	const [itemEdit, setItemEdit] = useState({
		name: '',
		description: '',
		kpi_value: 0,
		start_time: moment().add(0, 'days').format('YYYY-MM-DD'),
		end_time: moment().add(0, 'days').format('YYYY-MM-DD'),
		status: 1,
	});

	const formik = useFormik({
		initialValues: {
			name: itemEdit.name || '',
			description: itemEdit.description || '',
			kpi_value: itemEdit.kpi_value || 0,
			start_time: itemEdit.start_time || moment().add(0, 'days').format('YYYY-MM-DD'),
			end_time: itemEdit.end_time || moment().add(0, 'days').format('YYYY-MM-DD'),
			status: 1,
		},
		// eslint-disable-next-line no-unused-vars
		onSubmit: async (values) => {
			if (values.id) {
				const response = await updateItemById(values);
				const result = response.data;
				const newMissions = [...missions];
				newMissions.map((item) => (item.id === values.id ? { ...result } : item));
				setMissions(newMissions);
			} else {
				const response = await addNewItem(values);
				const result = response.data;
				const newMissions = [...missions];
				newMissions.push(result);
				setMissions(newMissions);
			}
			setEditModalStatus(false);
		},
	});

	const handleOpenConfirmModal = (item) => {
		setOpenConfirmModal(true);
		setItemEdit(item);
	};

	const handleCloseConfirmModal = () => {
		setOpenConfirmModal(false);
	};

	const handleOpenEditForm = (item) => {
		setEditModalStatus(true);
		setItemEdit(item);
	};

	const handleDeleteItem = async (id) => {
		try {
			await deleteItemById(id);
			const newState = [...missions];
			newState.filter((item) => item.id !== id);
			setMissions(newState);
			console.log(missions);
			handleCloseConfirmModal();
		} catch (error) {
			handleCloseConfirmModal();
		}
	};

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
											{item?.name}
										</CardTitle>
										<CardSubTitle tag='h5' className='h5 text-muted'>
											{item?.description}
										</CardSubTitle>
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
														Chi tiết
													</Button>
												</DropdownItem>
												<DropdownItem>
													<Button
														icon='Edit'
														tag='button'
														onClick={() => handleOpenEditForm(item)}>
														Sửa mục tiêu
													</Button>
												</DropdownItem>
												<DropdownItem>
													<Button
														icon='Delete'
														tag='button'
														onClick={() =>
															handleOpenConfirmModal(item)
														}>
														Xoá mục tiêu
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
				</div>
				<Modal
					setIsOpen={setEditModalStatus}
					isOpen={editModalStatus}
					size='lg'
					isScrollable>
					<ModalHeader className='px-4' setIsOpen={setEditModalStatus}>
						<ModalTitle id='project-edit'>
							{itemEdit.id ? 'Cập nhật mục tiêu' : 'Thêm mới mục tiêu'}
						</ModalTitle>
					</ModalHeader>
					<ModalBody className='px-4'>
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
											<Input
												onChange={formik.handleChange}
												value={itemEdit?.id}
												type='hidden'
											/>
											<FormGroup
												className='col-12'
												id='name'
												label='Tên mục tiêu'>
												<Input
													onChange={formik.handleChange}
													value={itemEdit.name || formik.values.name}
												/>
											</FormGroup>
											<FormGroup
												className='col-12'
												id='description'
												label='Mô tả mục tiêu'>
												<Textarea
													onChange={formik.handleChange}
													value={
														itemEdit.description ||
														formik.values.description
													}
												/>
											</FormGroup>
											<FormGroup
												className='col-12'
												id='kpi_value'
												label='Giá trị KPI'>
												<Input
													type='number'
													onChange={formik.handleChange}
													value={
														itemEdit.kpi_value ||
														formik.values.kpi_value
													}
												/>
											</FormGroup>
											<FormGroup
												id='start_time'
												label='Ngày bắt đầu mục tiêu'
												isFloating>
												<Input
													placeholder='Ngày bắt đầu mục tiêu'
													onChange={formik.handleChange}
													value={
														itemEdit.start_time ||
														formik.values.start_time
													}
													type='date'
												/>
											</FormGroup>
											<FormGroup
												id='end_time'
												label='Ngày kết thúc mục tiêu'
												isFloating>
												<Input
													placeholder='Ngày kết thúc mục tiêu'
													onChange={formik.handleChange}
													value={
														itemEdit.end_time || formik.values.end_time
													}
													type='date'
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
				<MissionAlertConfirm
					openModal={openConfirmModal}
					onCloseModal={handleCloseConfirmModal}
					onConfirm={() => handleDeleteItem(itemEdit.id)}
					title='Xoá công việc'
					content={`Xác nhận xoá công việc <strong>${itemEdit.name}</strong> ?`}
				/>
			</Page>
		</PageWrapper>
	);
};

export default MissionPage;
