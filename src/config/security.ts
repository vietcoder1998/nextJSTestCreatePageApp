import { LocalUserInfo } from '@/helpers/local-storage-handler'
import { DefaultMenuList, PND, RoleList, UserRoleType } from './init'
import { RouterDefination, MenuItemType } from './type'

// Route define and security with user role
export const RoleSecurityDefine: Record<string | RoleList, MenuItemType[]> = {
  [RoleList.user]: [
    [PND.dashboard, []],
  ],
  [RoleList.admin]: [
    [PND.dashboard, []],
  ],
  [RoleList.superAdmin]: [...DefaultMenuList],
}

// role and security define
export const UserRole: string | UserRoleType = LocalUserInfo.role ?? RoleList.superAdmin
export const RouterSecurityDefinWithRole: MenuItemType[] = RoleSecurityDefine[UserRole]

// define open menu list
export const OpenMenuList: boolean[] = (function () {
  return Object.keys(RouterSecurityDefinWithRole).map(() => false)
})()

// define for init router
export const routerDefination: RouterDefination = {
  // Note [ Name of menu, children list, icon defination ]
  menuList: RouterSecurityDefinWithRole,
  openMenuList: OpenMenuList,
}
