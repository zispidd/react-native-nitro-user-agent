import { NitroModules } from 'react-native-nitro-modules'
import type { NitroUserAgent } from './specs/NitroUserAgent.nitro'

export const nitroUserAgent = NitroModules.createHybridObject<NitroUserAgent>('NitroUserAgent')

export const getUserAgent = nitroUserAgent.getUserAgent
