import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import ManageRequests from '../../../../pages/Dashboard/Admin/ManageRequests'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
       <MenuItem icon={FaUserCog} label='Manage Request' address='manage-request' />
     
    </>
  )
}

export default AdminMenu
