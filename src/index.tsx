import { NitroModules } from 'react-native-nitro-modules'
import type { NitroUserAgent } from './specs/NitroUserAgent.nitro'

const nitroUserAgent = NitroModules.createHybridObject<NitroUserAgent>('NitroUserAgent')

export const getUserAgent = nitroUserAgent.getUserAgent
