import { graphql, Link, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import * as React from 'react'
import style from './layout.module.scss'
import './layout.scss'

import Header from './header'

const Layout: React.FunctionComponent = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            latestUpate
          }
        }
        profileImage: file(relativePath: { eq: "profile.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        allSitePage(filter: { path: { regex: "/^/albums//" } }) {
          edges {
            node {
              path
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Header
          siteTitle={data.site.siteMetadata.title}
          latestUpate={data.site.siteMetadata.latestUpate}
        />
        <main className={style.main}>
          <div className={style.container}>
            <div className={style.profile}>
              <div className={style.profileContainer}>
                <Img
                  className={style.profileImage}
                  fluid={data.profileImage.childImageSharp.fluid}
                />
                <div className={style.profileContent}>
                  <div>
                    <div>{data.site.siteMetadata.title}</div>
                    <div>五道口吴亦凡</div>
                    <div>北三环迪丽热巴</div>
                  </div>
                </div>
              </div>
              <div className={style.albumContainer}>
                <h3>Albums</h3>
                {data.allSitePage.edges.map((edge: any) => (
                  <div key={edge.node.path}>
                    <Link to={edge.node.path}>
                      {edge.node.path.match(/^\/albums\/(.*)/)[1]}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className={style.posts}>{children}</div>
          </div>
        </main>
      </>
    )}
  />
)

export default Layout
