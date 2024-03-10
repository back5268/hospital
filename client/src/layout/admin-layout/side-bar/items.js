import { BiSolidBookContent } from 'react-icons/bi';
import { BiSolidDashboard } from 'react-icons/bi';
import { BiBell } from 'react-icons/bi';
import { BiSmile } from 'react-icons/bi';
import { BiUser } from 'react-icons/bi';
import { BiNews } from 'react-icons/bi';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { BiBookAlt } from 'react-icons/bi';
import { BiDevices } from 'react-icons/bi';

export const items = [
  { label: 'Dashboard', icon: BiSolidDashboard, route: '/' },
  { label: 'Quản lý người dùng', icon: BiUser, route: '/users' },
  { label: 'Quản lý khóa học', icon: BiBookAlt, route: '/courses' }
];
