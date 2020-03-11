import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export class UserNav extends Component {
  render() {
    return (
      <div>
        <div className="col s12 l3">
          <div className="card grey-text text-darken-2">
            {/* account side nav start */}
            <div className="card-content">
              <span className="card-title center">Account Settings</span>
              <div>
                <ul>
                  <li>
                    <Link to="/user">Edit Profile</Link>
                  </li>
                  <li>
                    <Link to="/shoppingcart">View Cart</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                </ul>
              </div>
              {this.props.isAdmin ? (
                <div>
                  <span className="card-title center">Admin</span>
                  <ul>
                    <li>
                      <Link to="/users">View All Users</Link>
                    </li>
                    <li>
                      <Link to="/addproduct">Add Products</Link>
                    </li>
                    <li>
                      <Link to="/products">Edit Products</Link>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
            {/* account side nav end */}
            <div className="card-action center">
              <Link to="/products" className="btn waves-effect waves-light">
                Start Shopping
                <i className="material-icons right">loyalty</i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
