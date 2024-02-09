// import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class Newsitem extends Component {

       

  render() {


     let {title , description , imageurl , newsurl , author , date , source} = this.props ;


    return (

      <div className = "my-3">
                  <div className="card" >

                    <div>
                  <span className="badge rounded-pill bg-danger"  >{source}
                      </span>

                      </div>
                        <img src={imageurl ? imageurl : "https://en.chessbase.com/post/spassky-plays-the-king-s-gambit"} className="card-img-top" alt="..."/>
                        <div className="card-body">
                       <h5 className="card-title">{title}... </h5>
                          <p className="card-text">{description}...</p>
                          <p className="card-text"><small className="text-body-secondary">By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
                          <a rel = "noreferrer" href={newsurl} target = "_blank" className="btn btn-outline-success " disabled>Read more...</a>
                        </div>
                  </div>
      </div>
    )
  }
}

export default Newsitem