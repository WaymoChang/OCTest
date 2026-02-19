import { NavLink } from 'react-router-dom'

const links = [
  ['/', 'Home'],
  ['/blog', 'Blog'],
  ['/about', 'About'],
  ['/changelog', 'Changelog'],
  ['/contact', 'Contact'],
  ['/analytics', 'Analytics'],
]

export default function Nav() {
  return (
    <nav className="nav">
      {links.map(([to, label]) => (
        <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
