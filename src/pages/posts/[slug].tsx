import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { getAllPosts, getPost } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'

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

export const getStaticProps: GetStaticProps = async ({
  params
}: GetStaticPropsContext) => {
  const post = await getPost(params.slug as string, [
    'title',
    'date',
    'author',
    'slug',
    'content'
  ])

  const content = await markdownToHtml(post.content)
  const [month, day, year] = new Date(post.date).toLocaleDateString().split('/')

  return {
    props: {
      post: {
        ...post,
        content,
        date: `${day}/${month}/${year}`
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts(['slug'])

  return {
    paths: posts.map(post => ({
      params: {
        slug: post.slug
      }
    })),
    fallback: false
  }
}
