// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'queries',
            title: 'Queries',
            type: 'item',
            url: '/queries',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        }
        // {
        //     id: 'createRequest',
        //     title: 'Dashboard',
        //     type: 'item',
        //     url: '/createRequest',
        //     icon: icons.DashboardOutlined,
        //     breadcrumbs: false
        // }
    ]
};

export default dashboard;
