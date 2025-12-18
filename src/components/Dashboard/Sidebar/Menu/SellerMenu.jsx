import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Create meal'
        address='add-plant'
      />
      <MenuItem icon={MdHomeWork} label='My Meals' address='my-inventory' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Order requests'
        address='manage-orders'
      />
    </>
  )
}

export default SellerMenu
