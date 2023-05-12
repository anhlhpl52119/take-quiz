import { request } from '@/utils/request';
import { EReqMethod } from '@/enums/htttpEnum';

const STUDY_SESSION_URL = '/workplace/study_session';

export function getStudySessions(queryParans: any) {
  return request<API.PaginResponse<'study_sessions', API.IStudySessionList>>({
    url: `${STUDY_SESSION_URL}`,
    method: EReqMethod.GET,
    params: queryParans,
  });
}

export function gennerateStudySession(sessionSetupConfig: API.IStudySetupParams) {
  return request<API.IStudySessionCards>({
    url: STUDY_SESSION_URL,
    method: EReqMethod.POST,
    data: { study_session: sessionSetupConfig },
  });
}
export function takeStudySessionResult(studySessionId: string, cardId: string, userAnswer: string) {
  return request<API.IResultStudySessionCards>({
    url: `${STUDY_SESSION_URL}/${studySessionId}/study_card/${cardId}`,
    method: EReqMethod.PATCH,
    data: { study_card: { user_answers: [userAnswer] } },
  });
}

export function closeStudySession(studySessionId: string) {
  return request<API.IStudySessionCards>({
    url: `${STUDY_SESSION_URL}/${studySessionId}/close_study_session/`,
    method: EReqMethod.PUT,
  });
}
