declare namespace API {
  import { ECollectionStatus } from '@/apis/workplace';

  interface ICollectionCreateData {
    name: string;
    description: string;
  }
  interface ICollection {
    id: string;
    name: string;
    description: string;
    user_id: string;
    status: ECollectionStatus;
    created_at: string;
    updated_at: string;
  }
}
