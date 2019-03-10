import { graphql, Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import * as React from 'react'
import Image from '../components/image'
import Layout from '../components/layout'
import PostItem, { PostNode } from '../components/postItem'
import SEO from '../components/seo'
import './index.scss'

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string
      }
    }
    allMarkdownRemark: {
      edges: PostNode[]
      group: Array<{ fieldValue: string; totalCount: number }>
    }
  }
}

class IndexPage extends React.Component<IndexPageProps, {}> {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout>
        <SEO
          title="所有博文"
          keywords={['blog', 'gatsby', 'javascript', 'react']}
        />
        {posts.map(post => PostItem(post))}
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY年MM月DD日")
            tags
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 786) {
                  src
                  srcSet
                  sizes
                  aspectRatio
                }
              }
            }
          }
        }
      }
    }
  }
`