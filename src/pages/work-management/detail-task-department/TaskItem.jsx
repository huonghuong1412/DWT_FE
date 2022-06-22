import React from 'react';
import styled from 'styled-components';
import Avatar, { AvatarGroup } from '../../../components/Avatar';
import Card, { CardActions, CardBody, CardHeader } from '../../../components/bootstrap/Card';
import UserImage4 from '../../../assets/img/wanna/wanna4.png';
import UserImage4Webp from '../../../assets/img/wanna/wanna4.webp';
import Icon from '../../../components/icon/Icon';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Button from '../../../components/bootstrap/Button';

const USER = {
	id: 4,
	username: 'ryan',
	name: 'Ryan',
	surname: 'McGrath',
	position: 'Worker',
	src: UserImage4,
	srcSet: UserImage4Webp,
	isOnline: false,
	color: 'info',
};

const Time = styled.div`
	font-weight: 500;
	font-size: 12px;
	color: #6c757d;
	display: flex;
	align-items: center;
`;

const TaskTitle = styled.span`
	font-weight: 500;
	font-size: 16px;
	color: #000000;
`;

// eslint-disable-next-line react/prop-types
const TaskItem = ({ taskName, time }) => {
	// assign employee
	return (
		<Card style={{ borderTop: '1px solid #BFC6CD' }}>
			<CardHeader style={{ padding: '1rem' }} className='d-flex align-items-baseline'>
				<TaskTitle>{taskName}</TaskTitle>
				<CardActions>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button
								color='light'
								isLink
								hoverShadow='default'
								icon='MoreHoriz'
								size='lg'
								aria-label='More Actions'
								style={{ padding: 0 }}
							/>
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd>
							<DropdownItem>
								<Button icon='Send' tag='a' href='mailto:example@site.com'>
									Gửi
								</Button>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</CardActions>
			</CardHeader>
			<CardBody style={{ paddingTop: 0 }}>
				<div className='d-flex align-items-center justify-content-between'>
					<AvatarGroup>
						<Avatar
							srcSet={USER.srcSet}
							src={USER.src}
							userName={`${USER.name} ${USER.surname}`}
							color={USER.color}
						/>
						<Avatar
							srcSet={USER.srcSet}
							src={USER.src}
							userName={`${USER.name} ${USER.surname}`}
							color={USER.color}
						/>
					</AvatarGroup>
					<Time>
						<Icon size='lg' icon='Clock' style={{ marginRight: 5 }} />
						{time}
					</Time>
				</div>
			</CardBody>
		</Card>
	);
};

export default TaskItem;
