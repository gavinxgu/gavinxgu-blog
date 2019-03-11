import { Link } from 'gatsby'
import moment from 'moment'
import * as React from 'react'
import Image from '../components/image'
import './header.scss'

interface HeaderProps {
  siteTitle?: string
  latestUpate?: string
}

const Header: React.FunctionComponent<HeaderProps> = ({
  siteTitle,
  latestUpate,
}) => (
  <nav className="nav shadow">
    <div className="left-items">
      <div className="logo">
        <Image className="logo-icon" />
        <Link className="logo-text" to="/">
          {siteTitle}
        </Link>
      </div>
      <Link className="item" to="/tags">
        所有标签
      </Link>
      {/* <Link className="item" to="/tags/电影">
        电影
      </Link> */}
    </div>
    <div className="right-items">
      <div className="updated-time">
        {moment(latestUpate).format('YYYY.MM.DD')}
      </div>
    </div>
  </nav>
)

Header.defaultProps = {
  siteTitle: '',
}

export default Header
