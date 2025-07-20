declare module 'markdown-it-class' {
  import type MarkdownIt from 'markdown-it'

  type ClassMap = Record<string, string[] | string>

  function markdownItClass(md: MarkdownIt, map: ClassMap): void
  function markdownItClass(map: ClassMap): (md: MarkdownIt) => void

  export = markdownItClass
}
