import React from 'react';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPages } from '../../../menu';
import TaskBoard from './TaskBoard';
import taskMap from './data';
// eslint-disable-next-line react/prop-types
const DetailTaskDepartmentPage = () => {
	const data = taskMap;

	return (
		<PageWrapper title={demoPages.quanLyCongViec.subMenu.chiTietCongViecPhongBan.text}>
			<Page container='fluid'>
				<div className='row mt-2 mb-4'>
					<div className='col-12'>
						<div className='display-6 fw-bold py-3'>Công việc phòng ban chi tiết</div>
					</div>
				</div>
				<div className='row'>
					<TaskBoard boards={data} />
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DetailTaskDepartmentPage;