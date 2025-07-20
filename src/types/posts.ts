export interface Post {
  title: string
  time: {
    year: number
    month: number
    day: number
  }
}

export interface PostWithDate extends Post {
  date: string
}
