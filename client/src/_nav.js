import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilBell,
    cilCalculator,
    cilChartPie,
    cilPeople,
    cilHome,
    cilBook,
    cilNotes,
    cilCommentBubble,
    cilMoney,
    cilSpeedometer,
    cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

// Define all navigation items with permissions
const navItems = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
        permission: ['superadmin', 'admin', 'staff', 'employee'],
    },
    {
        component: CNavGroup,
        name: 'Employee Management',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        permission: ['superadmin', 'admin', 'staff', 'employee'],
        items: [
            {
                component: CNavItem,
                name: 'Employee',
                to: '/ui/EmployeeManagement',
                permission: ['superadmin', 'admin', 'staff', 'employee'],
            },
            {
                component: CNavItem,
                name: 'Access Control',
                to: '/ui/EmployeeManagemen/AccessControl',
                permission: ['superadmin', 'admin', 'staff', 'employee'],
            },
        ],
    },
    {
        component: CNavGroup,
        name: 'Learning Management',
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
        permission: ['superadmin', 'admin', 'staff'],
        items: [
            {
                component: CNavItem,
                name: 'LMS',
                to: '/ui/LearningManagement/index',
                permission: ['superadmin', 'admin'],
            },
            {
                component: CNavItem,
                name: 'Module',
                to: '/ui/LearningManagement/Modules/index',
                permission: ['superadmin', 'admin', 'staff'],
            },
        ],
    },
    {
        component: CNavGroup,
        name: 'Training Management',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        permission: ['superadmin', 'admin', 'staff'],
        items: [
            {
                component: CNavItem,
                name: 'Programs',
                to: '/ui/TrainingManagement/Programs',
                permission: ['superadmin', 'admin'],
            },
            {
                component: CNavItem,
                name: 'Schedule',
                to: '/ui/TrainingManagement/Schedule',
                permission: ['superadmin', 'admin', 'staff'],
            },
        ],
    },
    {
        component: CNavItem,
        name: 'Budget Management',
        to: '/ui/BudgetManagement',
        icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
        permission: ['superadmin', 'admin'],
    },
    {
        component: CNavItem,
        name: 'Evaluation And Feedback',
        to: '/ui/TrainingEngagement',
        icon: <CIcon icon={cilCommentBubble} customClassName="nav-icon" />,
        permission: ['superadmin', 'admin', 'staff', 'employee'],
    },
    {
        component: CNavTitle,
        name: 'Extras',
        permission: ['superadmin', 'admin'],
    },
    {
        component: CNavGroup,
        name: 'Pages',
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
        permission: ['superadmin', 'admin'],
        items: [
            {
                component: CNavItem,
                name: 'Login',
                to: '/login',
                permission: ['superadmin', 'admin', 'staff', 'employee'],
            },
            {
                component: CNavItem,
                name: 'Database',
                to: '/database',
                permission: ['superadmin'],
            },
            {
                component: CNavItem,
                name: 'Register',
                to: '/register',
                permission: ['superadmin'],
            },
            {
                component: CNavItem,
                name: 'Error 404',
                to: '/404',
                permission: ['superadmin', 'admin', 'staff', 'employee'],
            },
            {
                component: CNavItem,
                name: 'Error 500',
                to: '/500',
                permission: ['superadmin', 'admin', 'staff', 'employee'],
            },
        ],
    },
]

// Function to filter nav items based on user role
const _nav = (role) => {
    return navItems
        .filter((item) => item.permission.includes(role))
        .map((item) => ({
            ...item,
            items: item.items
                ? item.items.filter((subItem) => subItem.permission.includes(role))
                : undefined,
        }))
}

export default _nav
