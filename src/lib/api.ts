import { promises as fs } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'src', 'posts')

async function getMarkdownsFiles() {
  return await fs.readdir(postsDirectory)
}

export async function getPost(slugOrFilename: string, fields: string[] = []) {
  const slug = slugOrFilename.replace(/\.md$/, '')
  const directory = join(postsDirectory, `${slug}.md`)
  const fileContents = await fs.readFile(directory, 'utf8')

  const { data, content } = matter(fileContents)

  const post = {
    content: '',
    slug: ''
  } as { content: string; slug: string; [key: string]: any }

  fields.forEach(field => {
    if (field === 'content') post[field] = content

    if (field === 'slug') post[field] = slug

    if (data[field]) post[field] = data[field]
  })

  return post
}

export async function getAllPosts(fields: string[] = []) {
  const slugs = await getMarkdownsFiles()

  const posts = await Promise.all(
    slugs.map(async slug => await getPost(slug, fields))
  )

  return posts
}
