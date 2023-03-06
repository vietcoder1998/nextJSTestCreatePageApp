import { generatePathRoute } from '@/helpers/generator'
import { MenuItemType } from './type'

export const pathNameDefine = {
  dashboard: 'DashBoard',
  graph: 'Graph',
  production: 'Production',
  manual: 'Manual Input',
  sensor: 'Sensors',
  setting: 'Settings',
  logout: 'LogOut',
  feeding: 'Feeding',
  biomass: 'Biomass',
  waterEchange: 'Water exchange',
  waterQuality: 'Water quality',
  sensorCleaning: 'Sensor Cleaning',
  crop: 'Crop',
  classification: 'Classifications',
  threshold: 'Thresholds',
  device: 'Devices',
  user: 'user',
  productMaster: 'Products master',
  notification: 'Notification',
  pond: 'Pond',
  graphAndTable: 'Graph & Tables',
  sofc: 'SOFC',
  meansureItem: 'Measurement Items',
  sensors: 'Sensor Cleaning',
  login: 'Login',
  admin: 'v1',
  slugde: 'Sludge',
}

export enum RoleList {
  user = '10',
  admin = '20',
  superAdmin = '30',
}

export type UserRoleType = RoleList.user | RoleList.admin | RoleList.superAdmin | string

export const pathNameDefineKey = (function () {
  return Object.keys(pathNameDefine)
})()

export const pathKeyType = [...pathNameDefineKey] as const
export type PathKeytype = (typeof pathKeyType)[number]

// define reference path in href
export const pathNameReferenceDefine = (function (): Record<PathKeytype, string> {
  return Object.fromEntries(
    Object.entries(pathNameDefine).map(([key, name]) => {
      const newValue = generatePathRoute(name)

      return [key, newValue]
    }),
  )
})()

export const PND = pathNameDefine
export const PNRD = pathNameReferenceDefine

export const DefaultMenuList: MenuItemType[] = [
  [PND.dashboard, []],
  [PND.graphAndTable, []],
  [PND.manual, []],
  [
    PND.production,
    [
      PND.dashboard,
      PND.crop,
      PND.biomass,
      PND.slugde,
      PND.sensor,
      PND.waterEchange,
      PND.waterQuality,
    ],
  ],
  [PND.sensors, [PND.threshold, PND.device]],
  [
    PND.setting,
    [PND.classification, PND.pond, PND.meansureItem, PND.productMaster, PND.user, PND.notification],
  ],
  [PND.logout, []],
]
