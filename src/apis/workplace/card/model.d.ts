declare namespace API {
  interface ICard {
    id: string;
    question: string;
    answer: string;
    picture_url: string;
    set_favorite: boolean;
    success_count: number;
    failed_count: number;
    study_count: number;
    study_last_time: boolean;
    order_no: number;
    status: string;
    is_public: false;
    card_collection_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  }
  interface ICardUpdateParams {
    id: string;
    question: string;
    answer: string;
    set_favorite?: boolean;
  }
  interface ICardCreateParams {
    question: string;
    answer: string;
  }
  interface ICardDeleteParams {
    id: string;
  }
  interface ICardUpdateFavoriteParams {
    id: string;
    set_favorite: boolean;
  }
  type ICardUpdateDatas = CardRequestBody<ICardUpdateParams>;
  type ICardCreateDatas = CardRequestBody<ICardCreateParams>;
  type ICardDeleteDatas = CardRequestBody<ICardDeleteParams>;
  type ICardUpdateFavoriteDatas = CardRequestBody<ICardUpdateFavoriteParams>;
}
type CardRequestBody<T> = { cards: T[]; card_collection_id: string };
