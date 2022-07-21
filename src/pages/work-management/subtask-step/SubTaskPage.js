import React, { useState } from 'react';
import COLORS from '../../../common/data/enumColors';
import USERS from '../../../common/data/userDummyData';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPages } from '../../../menu';
import Slide2 from '../../../assets/img/wanna/slide/scene-2.png';
import Slide4 from '../../../assets/img/wanna/slide/scene-4.png';
import Slide6 from '../../../assets/img/wanna/slide/scene-6.png';
import TAGS from '../../../common/data/boardTagsData';
import Board from '../../../components/Board/Board';

const SubTaskPage = () => {
	// const params = useParams();  // taskid, id
	const data = [
		{
			id: 'lane1',
			title: 'Backlog',
			color: COLORS.DARK.name,
			icon: 'RateReview',
			cards: [
				{
					id: 'Card1',
					title: 'Mail App',
					subtitle: 'Facit Themes',
					description: 'Mail application and screens will be added',
					label: '7 day left',
					user: USERS.JOHN,
					img: Slide2,
					tags: [TAGS.critical, TAGS.design, TAGS.code],
					tasks: [
						{ id: 1, text: 'Page UI & UX design', status: true },
						{ id: 2, text: 'HTML & SCSS coding', status: true },
						{ id: 3, text: 'React Components to do', status: false },
					],
					attachments: [
						{ id: 1, path: 'somefile.txt', file: 'TXT' },
						{ id: 2, path: 'somefile.txt', file: 'WORD' },
						{ id: 3, path: 'somefile.txt', file: 'PSD' },
					],
				},
				{
					id: 'Card2',
					title: 'Invoice',
					subtitle: 'Facit Themes',
					description: 'Invoice preview and new creation screens will be added',
					user: USERS.ELLA,
					label: '5 day left',
					tags: [TAGS.revise, TAGS.design],
					tasks: [
						{ id: 1, text: 'Lorem ipsum dolor', status: true },
						{ id: 2, text: 'Sit amet.', status: false },
					],
				},
			],
		},
		{
			id: 'lane2',
			title: 'To Do',
			color: COLORS.INFO.name,
			icon: 'DoneOutline',
			cards: [
				{
					id: 'Card3',
					title: 'Landing Page Update',
					subtitle: 'Omtanke Team',
					description: 'Will be redesigned',
					label: '5 day left',
					user: USERS.GRACE,
					tags: [TAGS.design, TAGS.code],
					tasks: [
						{ id: 1, text: 'Draft drawings will be made', status: true },
						{ id: 2, text: 'Page will be updated', status: false },
						{ id: 3, text: 'Will be sent for review.', status: false },
					],
					attachments: [{ id: 2, path: 'somefile.txt', file: 'WORD' }],
				},
				{
					id: 'Card4',
					title: 'Write Blog',
					subtitle: 'Facit Themes',
					description: 'Explain why it should be chosen',
					label: '7 day left',
					user: USERS.JOHN,
					img: Slide4,
					tags: [TAGS.design],
					tasks: [{ id: 1, text: 'Lorem ipsum dolor', status: true }],
					attachments: [{ id: 1, path: 'somefile.txt', file: 'TXT' }],
				},
			],
		},
		{
			id: 'lane3',
			title: 'Pending',
			color: COLORS.INFO.name,
			icon: 'PendingActions',
			cards: [],
		},
		{
			id: 'lane4',
			title: 'Run',
			color: COLORS.INFO.name,
			icon: 'DirectionsRun',
			cards: [
				{
					id: 'Card5',
					title: 'Bug Fix',
					subtitle: 'Facit Themes',
					description: 'Minor bugs will be fixed',
					label: '5 day left',
					user: USERS.GRACE,
					tags: [TAGS.review, TAGS.design, TAGS.code],
					tasks: [
						{ id: 1, text: 'Lorem ipsum dolor', status: true },
						{ id: 2, text: 'Sit amet.', status: false },
						{ id: 3, text: 'Aliquam quis varius turpis.', status: false },
					],
					attachments: [
						{ id: 1, path: 'somefile.txt', file: 'TXT' },
						{ id: 2, path: 'somefile.txt', file: 'WORD' },
						{ id: 3, path: 'somefile.txt', file: 'PSD' },
					],
				},
			],
		},
		{
			id: 'lane5',
			title: 'Done',
			color: COLORS.SUCCESS.name,
			icon: 'Verified',
			cards: [
				{
					id: 'Card6',
					title: 'Project App',
					subtitle: 'Facit Themes',
					description: 'Project tracking screen will be added',
					label: '1 day ago',
					user: USERS.JOHN,
					img: Slide6,
					tags: [TAGS.critical, TAGS.design],
					tasks: [
						{ id: 1, text: 'Lorem ipsum dolor', status: true },
						{ id: 2, text: 'Sit amet.', status: false },
						{ id: 3, text: 'Aliquam quis varius turpis.', status: false },
					],
					attachments: [
						{ id: 1, path: 'somefile.txt', file: 'TXT' },
						{ id: 2, path: 'somefile.txt', file: 'WORD' },
						{ id: 3, path: 'somefile.txt', file: 'PSD' },
					],
				},
			],
		},
	];
	const [boardData, setBoardData] = useState(data);

	return (
		<PageWrapper title={demoPages.quanLyCongViec.subMenu.danhSach.text}>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<div className='display-6 fw-bold py-3'>Chi tiết công việc</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-12'>
						<Board data={boardData} setData={setBoardData} />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default SubTaskPage;
