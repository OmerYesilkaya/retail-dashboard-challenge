// NOTE(omer): This is needed because input values are used as strings but we are storing them as ints in our DB

type ConvertToFormData<T> = {
  [K in keyof T]: T[K] extends number ? string : T[K];
};
