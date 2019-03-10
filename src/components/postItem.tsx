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
      tags: string[]
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

export default ({ post }: { post: PostNode }) => {
  const { node } = post
  const title = node.frontmatter.title || node.fields.slug
  return (
    <div
      className={`${style.postItem} shadow`}
      onClick={() => {
        location.href = node.fields.slug
      }}
    >
      <div className={style.postItemInfo}>
        <small>
          {node.frontmatter.date} ·
          {node.frontmatter.tags.map(tag => (
            <Link
              to={`/tags/${tag}`}
              onClick={e => {
                e.stopPropagation()
              }}
              key={tag}
            >
              {' '}
              {tag}
            </Link>
          ))}
        </small>
        <h2
          style={{
            marginBottom: '0.25rem',
            marginTop: '0.25rem',
          }}
        >
          <Link
            to={node.fields.slug}
            onClick={e => {
              e.stopPropagation()
            }}
          >
            {title}
          </Link>
        </h2>
        <small
          className={style.postItemExcerpt}
          dangerouslySetInnerHTML={{ __html: node.excerpt }}
        />
      </div>
      <div>
        {node.frontmatter.cover && (
          <Img
            className={style.postItemCover}
            // 必须写在这里才能absolute
            // style={{ position: 'absolute' }}
            fluid={node.frontmatter.cover.childImageSharp.fluid}
          />
        )}
      </div>
    </div>
  )
}
