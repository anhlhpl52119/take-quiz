declare namespace API {
  import { ESessionQuestionType, ESessionStatus } from '@/apis/workplace';
  interface ITestCards {
    id: string;
    card_id: string;
    test_session_id: string;
    question_type: ESessionQuestionType;
    status: ESessionStatus;
    questions: {
      question: string;
      definition_as_question?: boolean;
    };
    answers: { answer_list: [string, string, string, string] };
    results: {
      result_list: [string];
      answered: boolean;
      is_multiple_result: boolean;
    };
    created_at: string;
    updated_at: string;
  }

  interface ITestCardAnswerResult {
    id: string;
    card_id: string;
    test_session_id: string;
    question_type: ESessionQuestionType;
    status: ESessionStatus;
    questions: {
      question: string;
      definition_as_question: boolean;
    };
    answers: {
      answer_list: [string, string, string, string];
    };
    results: {
      answered: boolean;
      result_list: [string];
      is_multiple_result: boolean;
      user_answers: [string];
      success: boolean;
    };
    created_at: string;
    updated_at: string;
  }

  interface ITestConfig {
    question_count: number;
    question_type: ESessionQuestionType; // TODO: undefine => both true false and Multiple
    definition_as_question: boolean;
    execution_time: number;
  }

  interface ITestSessionTestCards {
    test_session: ITestSession;
    test_cards: ITestCards[];
  }

  interface ITestSessionResults {
    results: {
      total_question: number;
      total_answer: 1;
      total_success_answer: 0;
    };
    status: ESessionStatus;
    id: string;
    card_collection_id: string;
    configs: {
      question_type: number;
      execution_time: number;
      question_count: number;
      definition_as_question: boolean;
    };
    order_no: null;
    created_at: string;
    updated_at: string;
    test_cards: ITestCardAnswerResult[];
  }

  interface ISubmitTestCardAnswer {
    test_card_id: string;
    user_answers: [string] | [boolean];
  }
  interface ITestSession {
    id: string;
    card_collection_id: string;
    status: ESessionStatus;
    configs: ITestConfig;
    results: ITestResult;
    order_no: null | number;
    created_at: string;
    updated_at: string;
  }

  interface ITestResult {
    total_question: number;
    total_answer: number;
    total_success_answer: number;
  }

  interface ITestSetupParams {
    configs: ITestConfig;
    card_collection_id: string;
  }

  interface ITestSessionList {
    id: string;
    card_collection_id: string;
    status: ESessionStatus;
    configs: {
      question_type: number;
      question_count: number;
      definition_as_question: boolean;
      execution_time: number;
    };
    order_no: null;
    results: ITestResult;
    created_at: string;
    updated_at: string;
    card_collection: {
      id: string;
      name: string;
      description: string;
      user_id: string;
      status: string;
    };
  }
}
