import React, { Component } from 'react'

// export class NewsItem extends Component {
  
  // render() {
    const NewsItem = (props)=> {
    // let {title,description,imageUrl,newsUlr,alt,author,date,source} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "17rem"}}>
          <div className="source">
           <span className="badge rounded-pill bg-danger">{props.source}</span>
          </div>
          <img src={props.imageUrl} className="card-img-top" alt={props.alt} style={{height: "162px"}} />
          <div className="card-body">
            <h5 className="card-title">{props.title} </h5>
            <p className="card-text">{props.description}</p>
            <p className="text-danger">By {props.author} on {new Date(props.date).toGMTString()}</p>
            <a href={props.newsUlr} rel="noreferrer" target="_blank" className="btn btn-dark btn-sm">View More</a>
          </div>
        </div>
      </div>
    ) 
  }
  // }
// }

export default NewsItem
