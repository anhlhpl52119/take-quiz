declare namespace API {
  import type { ESessionQuestionType, ESessionStatus } from '../index';
  interface IStudyCard {
    id: string;
    card_id: string;
    test_session_id: string;
    question_type: ESessionQuestionType;
    questions: {
      question: string;
      definition_as_question: false;
    };
    answers: {
      answer_list: [string, string, string, string] | [boolean, boolean];
    };
    results: {
      result_list: [string];
      is_multiple_result: boolean;
      answered: boolean;
      user_answers: [string];
      success: boolean;
    };
    created_at: string;
    updated_at: string;
  }

  interface IStudyConfig {
    question_count: number;
    question_type: ESessionQuestionType; //TODO: undefine => both true false and Multiple
    definition_as_question: boolean;
  }
  interface IResultStudySessionCards {
    study_session: IStudySession;
    study_card: IStudyCard;
  }
  interface IStudySessionCards {
    study_session: IStudySession;
    study_cards: IStudyCard[];
  }
  interface IStudySession {
    id: string;
    card_collection_id: string;
    status: ESessionStatus;
    configs: IStudyConfig;
    order_no: null | number;
    created_at: string;
    updated_at: string;
  }
  interface IStudySetupParams {
    configs: IStudyConfig;
    card_collection_id: string;
  }

  interface IStudySessionList {
    id: string;
    card_collection_id: string;
    status: ESessionStatus;
    configs: IStudyConfig;
    order_no: null;
    results: any; //TODO: douple check null
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
