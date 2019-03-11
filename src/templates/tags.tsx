import PropTypes from 'prop-types'
import React from 'react'
import Layout from '../components/layout'
import PostItem, { PostNode } from '../components/postItem'
import SEO from '../components/seo'

interface TagsTemplateProps {
  data: {
    allMarkdownRemark: {
      totalCount: number
      edges: PostNode[]
    }
  }
  pageContext: {
    tag: string
  }
}
// Components
import { graphql } from 'gatsby'

const Tags: React.FunctionComponent<TagsTemplateProps> = ({
  pageContext,
  data,
}) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `标签为"${tag}"，有${totalCount}篇文章`

  return (
    <Layout>
      <SEO title={tag} description={tag} />
      <div>
        <h2>{tagHeader}</h2>
        {edges.map(post => (
          <PostItem post={post} key={post.node.fields.slug} />
        ))}
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] }, published: { ne: false } }
      }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 100)
          fields {
            slug
          }
          frontmatter {
            date
            title
            tags
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
