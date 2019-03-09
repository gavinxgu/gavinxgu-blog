import { graphql, StaticQuery } from 'gatsby'
import * as React from 'react'
import './layout.scss'

import Header from './header'

const Layout: React.FunctionComponent = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main className="main">
          <div className="posts">{children}</div>
        </main>
      </>
    )}
  />
)

export default Layout
