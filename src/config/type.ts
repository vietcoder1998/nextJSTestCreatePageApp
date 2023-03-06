export type MenuItemType = [string, string[] | []] | []
export interface RouterDefination {
  menuList: MenuItemType[]
  openMenuList: boolean[]
}
