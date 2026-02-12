export interface ResponseType {
  success: boolean;
  message?: string;
  data?: any;
  error?: any[];
  status: number;
}
