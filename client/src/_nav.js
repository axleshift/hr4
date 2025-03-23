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

const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
        badge: {
            color: 'info',
        },
    },
    {
        component: CNavGroup,
        name: 'Learning Management',
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'LMS',
                to: '/ui/LearningManagement/index',
            },
            {
                component: CNavItem,
                name: 'Module',
                to: '/ui/LearningManagement/Modules/index',
            },
        ],
    },
    {
        component: CNavGroup,
        name: 'Training Management',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Programs',
                to: '/ui/TrainingManagement/Programs',
            },
            {
                component: CNavItem,
                name: 'Schedule',
                to: '/ui/TrainingManagement/Schedule',
            },
        ],
    },
    {
        component: CNavItem,
        name: 'Talent Management',
        to: '/ui/TalentManagement',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
        badge: {
            color: 'info',
        },
    },
    {
        component: CNavItem,
        name: 'Budget Management',
        to: '/ui/BudgetManagement',
        icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    },
    {
        component: CNavGroup,
        name: 'Employee Management',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Employee',
                to: '/ui/EmployeeManagement',
            },
        ],
    },
    {
        component: CNavItem,
        name: 'Evaluation And Feedback',
        to: '/ui/TrainingEngagement',
        icon: <CIcon icon={cilCommentBubble} customClassName="nav-icon" />,
    },
    //{
    //    component: CNavItem,
    //    name: 'Widgets',
    //    to: '/widgets',
    //    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    //    badge: {
    //        color: 'info',
    //        text: 'NEW',
    //    },
    //},
    {
        component: CNavTitle,
        name: 'Extras',
    },
    {
        component: CNavGroup,
        name: 'Pages',
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Login',
                to: '/login',
            },
            {
                component: CNavItem,
                name: 'Database',
                to: '/database',
            },
            {
                component: CNavItem,
                name: 'Register',
                to: '/register',
            },
            {
                component: CNavItem,
                name: 'Error 404',
                to: '/404',
            },
            {
                component: CNavItem,
                name: 'Error 500',
                to: '/500',
            },
        ],
    },
]

export default _nav
