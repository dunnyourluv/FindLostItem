import { Button } from '@/components/Elements'
import { Menu } from '@/components/Menu'
import { Images } from '@/constants'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserIcon,
} from '@heroicons/react/20/solid'
import {
  ChevronDownIcon,
  HashtagIcon,
  HomeIcon,
  LockClosedIcon,
  MagnifyingGlassCircleIcon,
  MapPinIcon,
  PresentationChartBarIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { ComponentPropsWithoutRef, Fragment, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import SearchInput from './SearchInput'
import { User } from '@/components/User'
import { useAuth, useCountPendingPosts } from '@/hooks'
import { AuthApi, PostApi } from '@/api'

type Props = ComponentPropsWithoutRef<'nav'> & {}

type NavMenuItemProps = {
  to?: string
  children?: React.ReactNode
  icon?: React.ReactNode
  type?: 'link' | 'button'
  className?: string
  onClick?: () => void
}

const NavMenuItem = ({
  to = '',
  children,
  icon,
  type = 'link',
  className,
  onClick,
}: NavMenuItemProps) => {
  if (type === 'button')
    return (
      <Menu.Item
        className={twMerge('flex items-center', className)}
        onClick={onClick}
      >
        <div className="">{icon}</div>
        <span
          className={twMerge(
            'ml-2 font-semibold text-sm transition-all hover:text-primary'
          )}
        >
          {children}
        </span>
      </Menu.Item>
    )

  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Menu.Item className="flex items-center">
          <div className={twMerge(isActive && 'text-primary')}>{icon}</div>
          <span
            className={twMerge(
              'ml-2 font-semibold text-sm transition-all hover:text-primary',
              isActive && 'text-primary'
            )}
          >
            {children}
          </span>
        </Menu.Item>
      )}
    </NavLink>
  )
}

const Navbar = ({ className, ...props }: Props) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [countPendingPosts, setCountPendingPosts] = useCountPendingPosts()
  const { user } = useAuth()

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const toggleSearchInput = () => {
    setShowSearch(!showSearch)
  }

  const handleLogout = () => {
    AuthApi.removeFromLocal()
    window.location.reload()
  }

  useEffect(() => {
    if (user?.isAdmin) {
      PostApi.countPending().then((res) => {
        if (res) {
          setCountPendingPosts(res.count)
        }
      })
    }
  }, [user])

  return (
    <nav
      className={twMerge('h-[60px] bg-black flex items-center px-2', className)}
      {...props}
    >
      <div className="left flex items-center">
        <div className="relative cursor-pointer" onClick={toggleMenu}>
          <Bars3Icon className="text-white" height={26} />
          {countPendingPosts > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 text-sm text-center text-white bg-red-500 rounded-full">
              {countPendingPosts}
            </span>
          )}
        </div>
        <Link to="/" className="block ml-2">
          <img src={Images.LOGO} alt="logo" width={40} />
        </Link>
      </div>
      <div className="ml-auto flex">
        <Link to="/profile">
          <UserIcon className="text-white cursor-pointer" height={26} />
        </Link>

        <MagnifyingGlassIcon
          className="text-white cursor-pointer ml-2"
          height={26}
          onClick={toggleSearchInput}
        />
      </div>
      {/* Menu */}
      <Transition show={showMenu} as={Fragment}>
        <Dialog as="div" onClose={toggleMenu} className="z-[100]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 z-[100]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 transition-all transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="ease-in duration-200 transition-all"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="w-2/3 max-w-md h-full">
                <Menu className="w-full h-full bg-white">
                  <Disclosure>
                    <Menu.Item className="flex items-center">
                      {user && (
                        <Disclosure.Button className="flex justify-center items-center">
                          <User
                            src={user.avatar}
                            alt={user.email}
                            name={user.username}
                          />
                          <ChevronDownIcon height={14} />
                        </Disclosure.Button>
                      )}
                      <Bars3Icon
                        className="cursor-pointer ml-auto"
                        height={26}
                        onClick={toggleMenu}
                      />
                    </Menu.Item>
                    {user && (
                      <div className="">
                        <Transition
                          enter="transition duration-300 ease-out"
                          enterFrom="h-0 opacity-0"
                          enterTo="h-full opacity-100"
                          leave="transition duration-300 ease-out"
                          leaveFrom="h-full opacity-100"
                          leaveTo="h-0 opacity-0"
                        >
                          <Disclosure.Panel>
                            <NavMenuItem
                              to="/profile"
                              icon={<UsersIcon height={24} />}
                            >
                              Thông tin cá nhân
                            </NavMenuItem>
                            <NavMenuItem
                              type="button"
                              icon={<LockClosedIcon height={24} />}
                              className="cursor-pointer"
                              onClick={handleLogout}
                            >
                              Đăng xuất
                            </NavMenuItem>
                          </Disclosure.Panel>
                        </Transition>
                      </div>
                    )}
                  </Disclosure>
                  <NavMenuItem to="/" icon={<HomeIcon height={24} />}>
                    Trang Chủ
                  </NavMenuItem>
                  <NavMenuItem
                    to="/search"
                    icon={<MagnifyingGlassCircleIcon height={24} />}
                  >
                    Tìm kiếm
                  </NavMenuItem>
                  {user?.isAdmin && (
                    <NavMenuItem
                      to="/manager-posts"
                      icon={<PresentationChartBarIcon height={24} />}
                    >
                      Phê duyệt bài đăng{' '}
                      {countPendingPosts > 0 && (
                        <span className="bg-red-500 inline-block rounded-full h-5 w-5 text-center text-white">
                          {countPendingPosts}
                        </span>
                      )}
                    </NavMenuItem>
                  )}
                  {user?.isAdmin && (
                    <NavMenuItem
                      to="/manager-topics"
                      icon={<HashtagIcon height={24} />}
                    >
                      Quản lý chủ đề
                    </NavMenuItem>
                  )}
                  {user?.isAdmin && (
                    <NavMenuItem
                      to="/manager-users"
                      icon={<UsersIcon height={24} />}
                    >
                      Quản lý người dùng
                    </NavMenuItem>
                  )}
                  <Link to="/upload-post">
                    <Button className="w-full text-sm" shape="square">
                      <MapPinIcon className="" height={24} width={24} />
                      <span className="ml-2">Đăng tin</span>
                    </Button>
                  </Link>
                </Menu>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Search modal */}
      <Transition show={showSearch} as={Fragment}>
        <Dialog as="div" onClose={toggleSearchInput}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 z-[100]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 transition-all transform"
              enterFrom="-translate-y-full"
              enterTo="translate-y-0"
              leave="ease-in duration-200 transition-all"
              leaveFrom="translate-y-0"
              leaveTo="-translate-y-full"
            >
              <Dialog.Panel>
                <div className="">
                  <SearchInput
                    onClose={toggleSearchInput}
                    className="bg-white"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </nav>
  )
}

export default Navbar
