const markdownStyle = {
  h1: [
    'text-5xl',
    'font-black',
    'tracking-tight',
    'mb-8',
    'mt-12',
    'text-gray-900',
    'dark:text-white',
  ],
  h2: [
    'text-4xl',
    'font-bold',
    'tracking-tight',
    'mb-6',
    'mt-10',
    'text-gray-800',
    'dark:text-gray-100',
    'border-b',
    'pb-1',
    'border-gray-200',
    'dark:border-gray-700',
  ],
  h3: ['text-2xl', 'font-semibold', 'mb-4', 'mt-8', 'text-gray-700', 'dark:text-gray-200'],
  h4: ['text-xl', 'font-medium', 'mb-3', 'mt-6', 'text-gray-600', 'dark:text-gray-300'],

  p: ['text-lg', 'leading-relaxed', 'text-gray-700', 'dark:text-gray-200', 'mb-6', 'tracking-wide'],

  a: [
    'text-gray-700',
    'hover:text-teal-500',
    'underline',
    'transition-colors',
    'duration-200',
    'font-medium',
    'decoration-dotted',
    'break-words',
    'dark:text-gray-200',
  ],

  ul: ['list-disc', 'pl-6', 'space-y-2', 'text-gray-700', 'dark:text-gray-200', 'mb-2'],
  ol: ['list-decimal', 'pl-6', 'space-y-2', 'text-gray-700', 'dark:text-gray-200', 'mb-2'],
  li: ['leading-relaxed', 'tracking-normal'],

  code: [
    'bg-gray-100',
    'dark:bg-gray-800',
    'text-pink-600',
    'dark:text-pink-400',
    'px-2',
    'py-1',
    'rounded-md',
    'font-mono',
    'text-sm',
    'inline-block',
  ],

  pre: [
    'bg-gray-900',
    'dark:bg-black',
    'text-white',
    'p-5',
    'rounded-xl',
    'overflow-x-auto',
    'text-sm',
    'leading-relaxed',
    'my-6',
    'shadow-lg',
    'border',
    'border-gray-800',
    'dark:border-gray-700',
  ],

  blockquote: [
    'border-l-4',
    'pl-5',
    'italic',
    'my-6',
    'text-gray-700',
    'dark:text-gray-300',
    'border-blue-400',
    'dark:border-blue-500',
    'bg-blue-50',
    'dark:bg-blue-950',
    'py-3',
    'px-4',
    'rounded-lg',
  ],

  table: [
    'table-auto',
    'border',
    'border-collapse',
    'w-full',
    'text-sm',
    'text-left',
    'my-8',
    'rounded-lg',
    'overflow-hidden',
    'shadow',
    'border-gray-200',
    'dark:border-gray-700',
  ],
  th: [
    'bg-gray-100',
    'dark:bg-gray-700',
    'text-gray-800',
    'dark:text-white',
    'border',
    'px-4',
    'py-3',
    'font-semibold',
  ],
  td: [
    'border',
    'px-4',
    'py-2',
    'text-gray-700',
    'dark:text-gray-300',
    'bg-white',
    'dark:bg-gray-900',
  ],
}

export default markdownStyle
export type MarkdownStyle = typeof markdownStyle
export type MarkdownStyleKeys = keyof MarkdownStyle
export type MarkdownStyleValues = MarkdownStyle[MarkdownStyleKeys]
export type MarkdownStyleArray = MarkdownStyleValues[]
export type MarkdownStyleObject = Record<MarkdownStyleKeys, MarkdownStyleValues[]>
export type MarkdownStyleClassName = string | MarkdownStyleArray | MarkdownStyleObject
