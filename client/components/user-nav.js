import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export class UserNav extends Component {
  render() {
    console.log('PROPS', this.props.googleId)
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
                  {this.props.googleId ? null : (
                    <li>
                      <Link to="/changepassword">Change Password</Link>
                    </li>
                  )}
                  <li>
                    <Link to="/cart">View Cart</Link>
                  </li>
                  <li>
                    <Link to="/orders">View Orders</Link>
                  </li>
                </ul>
              </div>
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