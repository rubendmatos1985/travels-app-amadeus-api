export type Store = {
  title: string;
  recommendations: any;
};

export const initialState: Store = {
  title: "Hello World!",
  recommendations: {}
};
