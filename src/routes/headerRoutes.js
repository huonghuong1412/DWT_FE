import React from 'react';
import { dashboardMenu, demoPages, layoutMenu } from '../menu';
import DashboardHeader from '../pages/common/Headers/DashboardHeader';
import DefaultHeader from '../pages/common/Headers/DefaultHeader';
import CommonHeader from '../pages/common/Headers/CommonHeader';

const headers = [
	{ path: layoutMenu.pageLayout.subMenu.onlySubheader.path, element: null, exact: true },
	{ path: layoutMenu.pageLayout.subMenu.onlyContent.path, element: null, exact: true },
	{ path: dashboardMenu.dashboard.path, element: <DashboardHeader />, exact: true },
	// quan ly muc tieu
	{
		path: demoPages.quanLyCongViec.subMenu.mission.path,
		element: <CommonHeader />,
		exact: true,
	},
	// chi tiet muc tieu
	{
		path: `quan-ly-cong-viec/muc-tieu/1`,
		element: <CommonHeader />,
		exact: true,
	},
	// quan ly cong viec
	{
		path: demoPages.quanLyCongViec.subMenu.congViec.path,
		element: <CommonHeader />,
		exact: true,
	},

	// danh sach cong viec
	{
		path: demoPages.quanLyCongViec.subMenu.danhSach.path,
		element: <CommonHeader />,
		exact: true,
	},

	// quan ly dau viec
	{
		path: demoPages.quanLyCongViec.subMenu.dauViec.path,
		element: <CommonHeader />,
		exact: true,
	},

	// công việc phòng ban chi tiết - danh sách dạng bảng
	{
		path: demoPages.quanLyCongViec.subMenu.danhSachCongViecPhongBan.path,
		element: <CommonHeader />,
		exact: true,
	},

	// công việc phòng ban chi tiết - danh sách chi tiết dạng cột
	{
		path: demoPages.quanLyCongViec.subMenu.chiTietCongViecPhongBan.path,
		element: <CommonHeader />,
		exact: true,
	},

	// công việc phòng ban chi tiết - cấu hình
	{
		path: demoPages.quanLyCongViec.subMenu.cauHinh.path,
		element: <CommonHeader />,
		exact: true,
	},
	// công việc phòng ban chi tiết - báo cáo
	{
		path: demoPages.quanLyCongViec.subMenu.baoCao.path,
		element: <CommonHeader />,
		exact: true,
	},
	{
		path: `*`,
		element: <DefaultHeader />,
	},
];

export default headers;
