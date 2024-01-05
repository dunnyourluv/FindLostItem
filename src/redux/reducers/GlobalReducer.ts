import { GlobalActionTypes, GlobalActions } from '../actions'

export type GlobalState = {
  posts: {
    count: number
  }
}

export const initialGlobalState: GlobalState = {
  posts: {
    count: 0,
  },
}

export const globalReducer = (
  state: GlobalState,
  action: GlobalActions
): GlobalState => {
  switch (action.type) {
    case GlobalActionTypes.COUNT_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          count: action.payload as number,
        },
      }
    default:
      return state
  }
}
