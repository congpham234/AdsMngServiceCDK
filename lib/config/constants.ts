import { Stage } from './types';

export const SERVICE_NAME = 'GoPalBackend';


// Map definition with correct syntax
export const ALLOW_ORIGIN_STAGE_MAP = new Map<Stage, string[]>([
  [Stage.ALPHA, ['http://localhost:3000', 'https://d2v9cv67ztousb.cloudfront.net']],
]);
