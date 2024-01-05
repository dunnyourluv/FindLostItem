import { Action } from './Action'

export enum GlobalActionTypes {
  COUNT_POSTS,
}

export type GlobalActions = Action<GlobalActionTypes.COUNT_POSTS, number>

export const globalCountPosts = (payload: number): GlobalActions => ({
  type: GlobalActionTypes.COUNT_POSTS,
  payload,
})
