import React from 'react';
import workCountData from '../../../common/data/workCountData';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPages } from '../../../menu';
import WorkProgressTable from '../quanlycongviec/WorkProgressTable';

// eslint-disable-next-line react/prop-types
const RenderWorkCount = ({ id, label, number, status }) => {
	const _status =
		(status === 1 && 'success') ||
		(status === 2 && 'warning') ||
		(status === 3 && 'danger') ||
		(status === 4 && 'info');
	return (
		<div className='col-xl-3 col-md-6 col-sm-12'>
			<Card key={id} className={`pt-1 pb-1 bg-l10-${_status}`}>
				<CardBody>
					<div className='row g-3 align-items-center'>
						<div className='col d-flex align-items-center'>
							<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
								<div>
									<div className='fw-bold fs-6 mb-0'>{`${label}: ${number}`}</div>
								</div>
							</div>
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

const DauViecPage = () => {
	return (
		<PageWrapper title={demoPages.quanLyCongViec.subMenu.dauViec.text}>
			<Page container='fluid'>
				<div className='row'>
					{workCountData.map((item) => (
						// eslint-disable-next-line react/jsx-props-no-spreading
						<RenderWorkCount key={item.id} {...item} />
					))}
				</div>
				<div className='row h-100'>
					<div className='col-12'>
						<WorkProgressTable isFluid />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DauViecPage;
