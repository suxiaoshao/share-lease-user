export interface State {
  name: string;
  total: number;
  leftBarState: boolean;
  postList: object[];
}

export const state: State = {
  name: '',
  total: 0,
  leftBarState: false,
  postList: [],
};
