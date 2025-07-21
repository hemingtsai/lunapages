export interface PostListItem {
  title: string
  time: {
    year: number
    month: number
    day: number
  }
}

export interface PostWithDate extends PostListItem {
  date: string
}

export interface Post extends PostListItem {
  content: string
}
