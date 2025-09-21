import { NitroModules } from 'react-native-nitro-modules';
import type { NitroUserAgent } from './NitroUserAgent.nitro';

const NitroUserAgentHybridObject =
  NitroModules.createHybridObject<NitroUserAgent>('NitroUserAgent');

export function multiply(a: number, b: number): number {
  return NitroUserAgentHybridObject.multiply(a, b);
}
