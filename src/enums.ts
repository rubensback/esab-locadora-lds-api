/* eslint-disable no-unused-vars */

export enum MovieTypes {
  VHS = '1',
  DVD = '2',
  BLUE_RAY = '3',
}

export enum MovieStatus {
  AVAILABLE = '1',
  RENTED = '2',
  LOST = '3',
}

export type MovieTypesOptions =
  | MovieTypes.VHS
  | MovieTypes.DVD
  | MovieTypes.BLUE_RAY

export type MovieStatusOptions =
  | MovieStatus.AVAILABLE
  | MovieStatus.RENTED
  | MovieStatus.LOST
