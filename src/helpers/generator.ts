import { pathNameDefine } from '@/config/init'

export function generatePathRoute(name?: string): string {
  const newName = name ? name.replace('&', 'and').replace(' ', '-').toLocaleLowerCase() : ''
  switch (name) {
    case pathNameDefine.graphAndTable:
      return 'production/graph-search'
    case pathNameDefine.crop:
      return 'crops'
    case pathNameDefine.sensor:
      return 'sensor-cleaning'
    default:
      return newName
  }
}

export type FullRouter = [string, string[]]

export function generateFullRoute(uiMenuList: [string, string[]][]): FullRouter[] {
  const fullPath: FullRouter[] = uiMenuList.map(([name, menuList]) => {
    const parentPath: string = [generatePathRoute(name)].join('/')
    const childrenPath: string[] =
      menuList && menuList.length > 0
        ? menuList.map((menuItem: string) => [parentPath, generatePathRoute(menuItem)].join('/'))
        : []

    return [parentPath, childrenPath]
  })

  return fullPath
}
