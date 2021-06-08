import {
  loginPath,
  chatPath,
  chatByIdPath,
  signUpPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/chats': chatPath,
  '/chats/{id}': chatByIdPath
}
