import type { Post } from '@/types/posts'

export function formatDate(time: Post['time']) {
  const { year, month, day } = time
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}
