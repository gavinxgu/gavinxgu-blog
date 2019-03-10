import Disqus from 'disqus-react'
import { graphql, Link } from 'gatsby'
import moment from 'moment'
import * as React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import style from './blog-post.module.scss'

interface BlogPostTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        host: string
      }
    }
    markdownRemark: {
      id: string
      excerpt: string
      html: string
      fields: {
        slug: string
      }
      frontmatter: {
        id: string
        title: string
        date: string
      }
    }
  }
  pageContext: {
    previous: any
    next: any
  }
}

class BlogPostTemplate extends React.Component<BlogPostTemplateProps, {}> {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext

    const disqusShortname = 'blog-wxnbf0awco'

    const disqusConfig = {
      identifier: post.frontmatter.id,
      title: post.frontmatter.title,
      url: `//${this.props.data.site.siteMetadata.host}${post.fields.slug}`,
    }

    return (
      <Layout>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <div className={`${style.blogPost} shadow`}>
          <h1>{post.frontmatter.title}</h1>
          {/* <Disqus.CommentCount
            shortname={disqusShortname}
            config={disqusConfig}
          >
            Comments
          </Disqus.CommentCount> */}
          <p
            style={{
              display: 'block',
              marginBottom: '1rem',
              marginTop: '-rem',
            }}
          >
            {moment(post.frontmatter.date).format('YYYY年MM月DD日 HH:mm:ss')}
          </p>
          <div
            className={style.guxMarkdown}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <hr
            style={{
              marginBottom: '14px',
            }}
          />
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              listStyle: 'none',
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        host
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        id
        title
        date
      }
    }
  }
`
