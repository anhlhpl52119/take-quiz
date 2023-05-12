import { request } from '@/utils/request';
import { EReqMethod } from '@/enums/htttpEnum';

const TEST_SESSION_URL = '/workplace/test_session';

export function getTestSessions(queryParans: any) {
  return request<API.PaginResponse<'test_sessions', API.ITestSessionList>>({
    url: `${TEST_SESSION_URL}`,
    method: EReqMethod.GET,
    params: queryParans,
  });
}

export function gennerateTestSession(testConfig: API.ITestSetupParams) {
  return request<API.ITestSessionTestCards>({
    url: TEST_SESSION_URL,
    method: EReqMethod.POST,
    data: { test_session: testConfig },
  });
}

export function takeCardTestResult(testSessionId: string, testConfig: API.ISubmitTestCardAnswer) {
  return request<API.ITestCardAnswerResult>({
    url: `${TEST_SESSION_URL}/${testSessionId}/test_card/${testConfig.test_card_id}`,
    method: EReqMethod.PATCH,
    data: { test_session: testConfig.user_answers },
  });
}

export function submitTestSession(testSessionId: string, userAnswers: API.ISubmitTestCardAnswer[]) {
  return request<API.ITestSessionResults>({
    url: `${TEST_SESSION_URL}/${testSessionId}/submit_test/`,
    method: EReqMethod.PUT,
    data: { test_result: { test_cards: userAnswers } },
  });
}
