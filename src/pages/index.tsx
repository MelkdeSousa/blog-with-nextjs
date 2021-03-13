import Link from 'next/link'
import { getAllPosts } from '../lib/api'

export default ({ posts }) => {
  return (
    <div>
      <h1>Welcome to my Blog!</h1>

      <p>Listagem de posts:</p>
      {posts.map(post => (
        <p>
          <Link href={`/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </p>
      ))}
    </div>
  )
}

export function getStaticProps() {
  const posts = getAllPosts(['title', 'date', 'slug'])

  return {
    props: { posts }
  }
}
