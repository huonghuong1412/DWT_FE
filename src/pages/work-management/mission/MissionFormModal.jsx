// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */

import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import styled from 'styled-components';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import Icon from '../../../components/icon/Icon';
import { getAllDepartments, getItemById } from './services';

const ErrorText = styled.span`
	font-size: 14px;
	color: #e22828;
	margin-top: 5px;
`;

const MissionFormModal = ({ show, onClose, onSubmit, item }) => {
	const [mission, setMission] = useState({});
	const [keysState, setKeysState] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [departmentOption, setDepartmentOption] = useState([]);
	const [errors, setErrors] = useState({
		name: { errorMsg: '' },
		kpi_value: { errorMsg: '' },
		departmentOption: { errorMsg: '' },
	});

	const nameRef = useRef(null);
	const kpiValueRef = useRef(null);
	const departmentRef = useRef(null);

	const onValidate = (value, name) => {
		setErrors((prev) => ({
			...prev,
			[name]: { ...prev[name], errorMsg: value },
		}));
	};

	const validateFieldForm = (field, value) => {
		if (!value) {
			onValidate(true, field);
		}
	};

	const validateForm = () => {
		validateFieldForm('name', mission?.name);
		validateFieldForm('kpi_value', mission?.kpi_value);
		validateFieldForm('kpi_value', parseInt(mission?.kpi_value, 10) > 0);
		validateFieldForm('departmentOption', departmentOption.length);
	};

	const handleClearErrorMsgAfterChange = (name) => {
		if (mission?.[name] || departmentOption.length > 0) {
			setErrors((prev) => ({
				...prev,
				[name]: { ...prev[name], errorMsg: '' },
			}));
		}
	};

	useEffect(() => {
		handleClearErrorMsgAfterChange('name');
		handleClearErrorMsgAfterChange('kpi_value');
		handleClearErrorMsgAfterChange('departmentOption');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mission?.name, mission?.kpi_value, departmentOption?.length]);

	useEffect(() => {
		if (item?.id) {
			getItemById(item?.id).then((res) => {
				setMission(res.data);
				setKeysState(res.data.keys);
				setDepartmentOption(
					res.data?.departments?.map((department) => {
						return {
							id: department.id,
							label: department.name,
							value: department.slug,
						};
					}),
				);
			});
		} else {
			setMission({
				id: null,
				name: '',
				description: '',
				kpi_value: '',
				start_time: moment().add(0, 'days').format('YYYY-MM-DD'),
				end_time: moment().add(0, 'days').format('YYYY-MM-DD'),
				status: 1,
			});
			setKeysState([]);
			setDepartmentOption([]);
		}
	}, [item?.id]);

	useEffect(() => {
		async function getDepartments() {
			try {
				const response = await getAllDepartments();
				const data = await response.data;
				setDepartments(
					data.map((department) => {
						return {
							id: department.id,
							label: department.name,
							value: department.slug,
						};
					}),
				);
			} catch (error) {
				setDepartments([]);
			}
		}
		getDepartments();
	}, []);

	// h??m validate cho dynamic field form
	const prevIsValid = () => {
		if (keysState.length === 0) {
			return true;
		}
		const someEmpty = keysState.some((key) => key.key_name === '' || key.key_value === '');

		if (someEmpty) {
			// eslint-disable-next-line array-callback-return
			keysState.map((key, index) => {
				const allPrev = [...keysState];
				if (keysState[index].key_name === '') {
					allPrev[index].error.key_name = 'Nh???p t??n ch??? s??? key!';
				}
				if (keysState[index].key_value === '') {
					allPrev[index].error.key_value = 'Nh???p gi?? tr??? key!';
				}
				setKeysState(allPrev);
			});
		}

		return !someEmpty;
	};

	// th??m field cho c??c gi?? tr??? key
	const handleAddFieldKey = () => {
		const initKeyState = {
			key_name: '',
			key_value: '',
			error: {
				key_name: null,
				key_value: null,
			},
		};
		if (prevIsValid()) {
			setKeysState((prev) => [...prev, initKeyState]);
		}
	};

	const handleChange = (e) => {
		const { value } = e.target;
		setMission({
			...mission,
			[e.target.name]: value,
		});
	};

	// h??m onchange cho input key
	const handleChangeKeysState = (index, event) => {
		event.preventDefault();
		event.persist();
		setKeysState((prev) => {
			return prev.map((key, i) => {
				if (i !== index) return key;
				return {
					...key,
					[event.target.name]: event.target.value,
					error: {
						...key.error,
						[event.target.name]:
							event.target.value.length > 0
								? null
								: `${[event.target.name]} is required!`,
					},
				};
			});
		});
	};

	// xo?? c??c key theo index
	const handleRemoveKeyField = (e, index) => {
		setKeysState((prev) => prev.filter((state) => state !== prev[index]));
	};

	const handleSubmit = () => {
		const data = { ...mission };
		data.keys = keysState;
		const departmentClone = [...departmentOption];
		data.departments = departmentClone.map((department) => {
			return {
				id: department.id,
				name: department.label,
				slug: department.value,
			};
		});
		validateForm();
		if (!mission?.name) {
			nameRef.current.focus();
			return;
		}
		if (parseInt(mission?.kpi_value, 10) <= 0 || !mission?.kpi_value) {
			kpiValueRef.current.focus();
			return;
		}
		if (!prevIsValid()) {
			return;
		}
		onSubmit(data);
		setMission({
			id: null,
			name: '',
			description: '',
			kpi_value: '',
			start_time: moment().add(0, 'days').format('YYYY-MM-DD'),
			end_time: moment().add(0, 'days').format('YYYY-MM-DD'),
			status: 1,
		});
		setKeysState([]);
		setDepartmentOption([]);
	};

	return (
		<Modal show={show} onHide={onClose} size='lg' scrollable centered>
			<Modal.Header closeButton>
				<Modal.Title>{item?.id ? 'C???p nh???t m???c ti??u' : 'Th??m m???i m???c ti??u'}</Modal.Title>
			</Modal.Header>
			<Modal.Body className='px-4'>
				<div className='row'>
					<div className='col-md-12'>
						<form>
							<Card shadow='sm'>
								<CardHeader>
									<CardLabel icon='Info' iconColor='success'>
										<CardTitle>Th??ng tin m???c ti??u</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody>
									<div className='row g-4'>
										<FormGroup
											className='col-12'
											id='name'
											label='T??n m???c ti??u'>
											<Input
												onChange={handleChange}
												value={mission.name || ''}
												name='name'
												ref={nameRef}
												required
												placeholder='T??n m???c ti??u'
												size='lg'
												className='border border-2'
											/>
										</FormGroup>
										{errors?.name?.errorMsg && (
											<ErrorText>Vui l??ng nh???p t??n m???c ti??u</ErrorText>
										)}
										<FormGroup
											className='col-12'
											id='description'
											label='M?? t??? m???c ti??u'>
											<Textarea
												name='description'
												onChange={handleChange}
												value={mission.description || ''}
												required
												placeholder='M?? t??? m???c ti??u'
												className='border border-2'
											/>
										</FormGroup>
										<FormGroup
											className='col-12'
											id='kpi_value'
											label='Gi?? tr??? KPI'>
											<Input
												ref={kpiValueRef}
												type='number'
												name='kpi_value'
												onChange={handleChange}
												value={mission.kpi_value || ''}
												required
												size='lg'
												placeholder='Gi?? tr??? KPI'
												className='border border-2'
											/>
										</FormGroup>
										{errors?.kpi_value?.errorMsg && (
											<ErrorText>Vui l??ng nh???p gi?? tr??? KPI h???p l???</ErrorText>
										)}
										<FormGroup
											className='col-12'
											id='kpi_value'
											label='Ph??ng ban ph??? tr??ch'>
											<Select
												defaultValue={departmentOption}
												value={departmentOption}
												onChange={setDepartmentOption}
												isMulti
												options={departments}
												ref={departmentRef}
											/>
										</FormGroup>
										{errors?.departmentOption?.errorMsg && (
											<ErrorText>
												Vui l??ng ch???n ph??ng ban cho nhi???m v???
											</ErrorText>
										)}
										<div className='d-flex align-items-center justify-content-between'>
											<FormGroup
												className='w-50 mr-2'
												style={{ width: '45%', marginRight: 10 }}
												id='start_time'
												label='Ng??y b???t ?????u m???c ti??u'
												isFloating>
												<Input
													name='start_time'
													placeholder='Ng??y b???t ?????u m???c ti??u'
													onChange={handleChange}
													value={
														mission.start_time ||
														moment().add(0, 'days').format('YYYY-MM-DD')
													}
													type='date'
													size='lg'
													className='border border-2'
												/>
											</FormGroup>
											<FormGroup
												className='w-50 ml-2'
												style={{ width: '45%', marginLeft: 10 }}
												id='end_time'
												label='Ng??y k???t th??c m???c ti??u'
												isFloating>
												<Input
													name='end_time'
													placeholder='Ng??y k???t th??c m???c ti??u'
													onChange={handleChange}
													value={
														mission.end_time ||
														moment().add(0, 'days').format('YYYY-MM-DD')
													}
													type='date'
													size='lg'
													className='border border-2'
												/>
											</FormGroup>
										</div>
										<FormGroup>
											<Button variant='success' onClick={handleAddFieldKey}>
												Th??m ch??? s??? key
											</Button>
										</FormGroup>
										{/* eslint-disable-next-line no-shadow */}
										{keysState?.map((item, index) => {
											return (
												<div
													// eslint-disable-next-line react/no-array-index-key
													key={index}
													className='mt-4 d-flex align-items-center justify-content-between'>
													<div
														style={{
															width: '45%',
															marginRight: 10,
														}}>
														<FormGroup
															className='mr-2'
															id='name'
															label='T??n ch??? s??? key'>
															<Input
																onChange={(e) =>
																	handleChangeKeysState(index, e)
																}
																value={item?.key_name || ''}
																name='key_name'
																required
																size='lg'
																className='border border-2'
																placeholder='VD: Doanh thu, ????n h??ng, ...'
															/>
														</FormGroup>
														{item.error?.key_name && (
															<ErrorText>
																{item.error?.key_name}
															</ErrorText>
														)}
													</div>
													<div style={{ width: '45%', marginLeft: 10 }}>
														<FormGroup
															className='ml-2'
															id='name'
															label='Gi?? tr??? key'>
															<Input
																onChange={(e) =>
																	handleChangeKeysState(index, e)
																}
																value={item?.key_value || ''}
																name='key_value'
																size='lg'
																required
																className='border border-2'
																placeholder='VD: 100 t???, 1000 ????n h??ng, ..'
															/>
														</FormGroup>
														{item.error?.key_value && (
															<ErrorText>
																{item.error?.key_value}
															</ErrorText>
														)}
													</div>
													<FormGroup>
														<Button
															color='light'
															variant='light'
															style={{
																background: 'transparent',
																border: 0,
															}}
															size='lg'
															className='mt-4 h-100'
															onClick={(e) =>
																handleRemoveKeyField(e, index)
															}>
															<Icon icon='Trash' size='lg' />
														</Button>
													</FormGroup>
												</div>
											);
										})}
									</div>
								</CardBody>
							</Card>
						</form>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onClose}>
					????ng
				</Button>
				<Button variant='primary' type='submit' onClick={handleSubmit}>
					L??u m???c ti??u
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default MissionFormModal;
