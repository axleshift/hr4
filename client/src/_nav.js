import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilHome, cilNotes, cilBook, cilCommentBubble, cilMoney, cilStar } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

// Define navigation items with permissions
const navItems = [
    {
        name: 'Dashboard',
        to: '/dashboard',
        icon: cilHome,
        roles: ['superadmin', 'admin', 'staff', 'employee'],
    },
    {
        name: 'Employee Management',
        icon: cilNotes,
        roles: ['superadmin', 'admin', 'staff', 'employee'],
        items: [
            {
                name: 'Employee',
                to: '/ui/EmployeeManagement',
                roles: ['superadmin', 'admin', 'staff', 'employee'],
            },
            {
                name: 'Access Control',
                to: '/ui/EmployeeManagement/AccessControl',
                roles: ['superadmin', 'admin', 'staff', 'employee'],
            },
        ],
    },
    {
        name: 'Learning Management',
        icon: cilBook,
        roles: ['superadmin', 'admin', 'staff'],
        items: [
            {
                name: 'Programs',
                to: '/ui/LearningManagement/Programs',
                roles: ['superadmin', 'admin'],
            },
            { name: 'LMS', to: '/ui/LearningManagement/index', roles: ['superadmin', 'admin'] },
            {
                name: 'Module',
                to: '/ui/LearningManagement/Modules/index',
                roles: ['superadmin', 'admin', 'staff'],
            },
        ],
    },
    {
        name: 'Training Management',
        icon: cilNotes,
        roles: ['superadmin', 'admin', 'staff'],
        items: [
            {
                name: 'Schedule',
                to: '/ui/TrainingManagement/Schedule',
                roles: ['superadmin', 'admin', 'staff'],
            },
        ],
    },
    {
        name: 'Budget Management',
        to: '/ui/BudgetManagement',
        icon: cilMoney,
        roles: ['superadmin', 'admin'],
    },
    {
        name: 'Evaluation And Feedback',
        to: '/ui/TrainingEngagement',
        icon: cilCommentBubble,
        roles: ['superadmin', 'admin', 'staff', 'employee'],
    },
    { name: 'Extras', type: 'title', roles: ['superadmin', 'admin'] },
    {
        name: 'Pages',
        icon: cilStar,
        roles: ['superadmin', 'admin'],
        items: [
            { name: 'Login', to: '/login', roles: ['superadmin', 'admin', 'staff', 'employee'] },
            { name: 'Database', to: '/database', roles: ['superadmin'] },
            { name: 'Register', to: '/register', roles: ['superadmin'] },
            { name: 'Error 404', to: '/404', roles: ['superadmin', 'admin', 'staff', 'employee'] },
            { name: 'Error 500', to: '/500', roles: ['superadmin', 'admin', 'staff', 'employee'] },
        ],
    },
]

// Helper function to create navigation components
const createNavItem = (item) => {
    if (item.type === 'title') {
        return { component: CNavTitle, name: item.name }
    }
    if (item.items) {
        return {
            component: CNavGroup,
            name: item.name,
            icon: <CIcon icon={item.icon} customClassName="nav-icon" />,
            items: item.items.map(createNavItem),
        }
    }
    return {
        component: CNavItem,
        name: item.name,
        to: item.to,
        icon: item.icon ? <CIcon icon={item.icon} customClassName="nav-icon" /> : null,
    }
}

// Filter navigation items based on user role
const _nav = (role) => navItems.filter((item) => item.roles.includes(role)).map(createNavItem)

export default _nav
