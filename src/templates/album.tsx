import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import style from './album.module.scss'

interface AlbumsTemplateProps {
  pageContext: {
    urls: string[]
    album: string
  }
}

const Albums: React.FunctionComponent<AlbumsTemplateProps> = ({
  pageContext,
}) => {
  const { urls, album } = pageContext

  return (
    <Layout>
      <SEO title={album} description={album} />
      <div className={style.container}>
        {urls.map(url => (
          <img
            className={style.image}
            src={`http:${url.replace(/\+/g, '%2B')}/w_1000`}
            alt=""
            key={url}
          />
        ))}
      </div>
    </Layout>
  )
}

export default Albums
