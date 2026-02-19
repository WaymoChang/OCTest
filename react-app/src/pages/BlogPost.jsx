import { useParams, Link } from 'react-router-dom'
import { posts } from '../data/posts'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) return <section className="card"><h2>未找到文章</h2><Link to="/blog">返回列表</Link></section>

  return (
    <section className="card">
      <h1>{post.title}</h1>
      <p className="meta">{post.date} · {post.author}</p>
      {post.content.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </section>
  )
}
