import { LOCAL_STORAGE_ITEM } from '@/config/label'

export const LocalUserInfo: Record<string, string> = (function () {
  const userInfo = JSON.parse(
    JSON.stringify(localStorage.getItem(LOCAL_STORAGE_ITEM.userInfo) ?? '{}'),
  )

  return userInfo
})()
