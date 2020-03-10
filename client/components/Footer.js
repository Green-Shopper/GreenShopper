import React from 'react'
import {Link} from 'react-router-dom'

export const Footer = () => {
  return (
    <div>
      <footer className="page-footer transparent">
        <div className="footer-copyright lime darken-3">
          <div className="container">
            Green Shopper &copy; 2020
            <a className="white-text right" href="#!">
              About Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
