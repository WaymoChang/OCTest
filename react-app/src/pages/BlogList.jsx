import { Link } from 'react-router-dom'
import { posts } from '../data/posts'

export default function BlogList() {
  return (
    <section className="grid">
      {posts.map((p) => (
        <article className="card" key={p.slug}>
          <h2>{p.title}</h2>
          <p className="meta">{p.date} · {p.author}</p>
          <p>{p.excerpt}</p>
          <Link className="btn" to={`/blog/${p.slug}`}>阅读详情</Link>
        </article>
      ))}
    </section>
  )
}
