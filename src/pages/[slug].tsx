import { getAllPosts, getPost } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'

export default function Page({ post }) {
  return (
    <div
      style={{
        margin: 'auto',
        maxWidth: '600px',
        fontFamily: 'sans-serif'
      }}
    >
      <h1>{post.title}</h1>
      <p>
        {post.author} · {post.date}
      </p>

      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const post = getPost(params.slug, [
    'title',
    'date',
    'author',
    'slug',
    'content'
  ])

  post.content = await markdownToHtml(post.content)
  post.date = new Date(post.date).toLocaleDateString()

  return {
    props: { post }
  }
}

export function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug
        }
      }
    }),
    fallback: false
  }
}
