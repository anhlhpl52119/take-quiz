export * from './card';
export * from './collection';
export * from './studySession';
export * from './testSession';

export enum ECollectionStatus {
  ACTIVE = 'active',
  DELETED = 'deleted',
}

export enum ESessionQuestionType {
  FourAnswer = 0,
  TrueFalseType = 1,
}
export enum ESessionStatus {
  Active = 'active',
  Close = 'close',
  Submited = 'submitted',
}
