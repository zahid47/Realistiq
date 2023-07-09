// https://www.youtube.com/shorts/2lCCKiWGlC0
type Visualize<T> = {
  [k in keyof T]: T[k];
} & {};
