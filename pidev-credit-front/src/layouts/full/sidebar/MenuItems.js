import {
  IconAperture, IconTypography, IconLayoutDashboard,
} from '@tabler/icons';
import { uniqueId } from 'lodash';
import getUserRole from './getUserRole'; // Assurez-vous de corriger le chemin d'importation

const userRole = getUserRole();

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Proxmox',
  },
  {
    id: uniqueId(),
    title: 'Opportunities',
    icon: IconTypography,
    href: '/job',
  },
  {
    id: uniqueId(),
    title: 'Profile',
    icon: IconTypography,
    href: '/profile',
  },
  // Ajoutez les éléments suivants conditionnellement
  ...(userRole === 'admin' ? [
    {
      navlabel: true,
      subheader: 'Settings',
    },
    {
      id: uniqueId(),
      title: 'User Management',
      icon: IconAperture,
      href: '/userTable',
    },
    {
      id: uniqueId(),
      title: 'ENVIRONMENT',
      icon: IconAperture,
      href: '/settings',
    },
  ] : []),
  {
    navlabel: true,
    subheader: 'Ansible',
  },
  {
    id: uniqueId(),
    title: 'adminDashboard ',
    icon: IconAperture,
    href: '/adminDashboard',
  },
    {
      navlabel: true,
      subheader: 'Terraform',
    },
    {
      id: uniqueId(),
      title: 'Applicant Management',
      icon: IconAperture,
      href: '/applicant',
    },
  
];

export default Menuitems;
