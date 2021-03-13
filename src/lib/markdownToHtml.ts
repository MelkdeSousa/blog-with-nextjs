import remark from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js'

export default async (markdown: string) => {
  const result = await remark()
    .use(highlight, {
      include: [
        'css',
        'html',
        'javascript',
        'markdown',
        'json',
        'bash',
        'typescript',
        'sql'
      ]
    })
    .use(html)
    .process(markdown)

  return result.toString()
}
