import { User } from "src/app/shared/user.model";

export interface State {
  user: User,
  authError: string,
  loading: boolean,
}
