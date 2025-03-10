import { useSelector } from "react-redux"
import { RootState } from "../utils/redux/store"

const Header = () => {
  const user = useSelector((state:RootState)=>state.user)
  
  
  return (
    <header className='flex lg:items-end items-start justify-between lg:flex-row flex-col gap-5 sm:mb-10 mb-5'>
          <div >
            <h2 className='text-dark-400 font-semibold text-dark-400 text-xl pb-2'>{`${user.firstName} ${user.lastName}`}</h2>
            <p className='text-slate-500 text-base'>Monitor all your users and books here </p>

        </div>
    </header>
  )
}

export default Header