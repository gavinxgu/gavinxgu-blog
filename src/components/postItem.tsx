import { Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import * as React from 'react'
import style from './postItem.module.scss'

export interface PostNode {
  node: {
    excerpt: string
    frontmatter: {
      date: string
      title: string
      cover: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
    }
    fields: {
      slug: string
    }
  }
}

export default (post: PostNode) => {
  const { node } = post
  const title = node.frontmatter.title || node.fields.slug
  return (
    <div className={`${style.postItem} shadow`} key={node.fields.slug}>
      <div className={style.postItemOverlay} />
      <h1
        style={{
          marginBottom: '0.25rem',
          marginTop: '0.25rem',
        }}
      >
        <Link to={node.fields.slug}>{title}</Link>
      </h1>
      {node.frontmatter.cover && (
        <Img
          className={style.postItemCover}
          // 必须写在这里才能absolute
          style={{ position: 'absolute' }}
          fluid={node.frontmatter.cover.childImageSharp.fluid}
        />
      )}
      <small>{node.frontmatter.date}</small>
      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </div>
  )
}
