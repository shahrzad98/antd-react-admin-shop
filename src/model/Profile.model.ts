import { User } from '@src/core/Authentication/model';

export interface UserProfile {
  email: string;
  birth_date?: string;
  people: {
    first_name: string;
    last_name: string;
  };
}

export interface ChangePasswordContext {
  password: string;
  current_password: string;
  password_confirmation: string;
}

export interface UserDocuments {
  user: User;
  link: string;
  number: string;
  file_id: number;
  user_id: number;
  order_id: number;
  created_by: User;
  order_type: string;
  updated_at: string;
  created_at: string;
  created_by_id: null;
  document_type_id: number;
  created_by_fullname: string;
  documentType: UserDocumentType;
}

export interface UserDocumentType {
  id: number;
  name: string;
}
