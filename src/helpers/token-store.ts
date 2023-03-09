import { TOKEN_KEY } from '@/config/const'
import { getAsString, removeAs, setAsString } from './local-storage'

export const getJwtToken = () => {
  return getAsString(TOKEN_KEY)
}

export const setJwtToken = (jwtToken: string) => {
  setAsString(TOKEN_KEY, jwtToken)
}

export const removeJwtToken = () => {
  removeAs(TOKEN_KEY)
}
