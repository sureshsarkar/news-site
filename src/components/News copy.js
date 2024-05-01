// API_KEY 04cbabc1b5b4467aaf7bc0e1f1ac7c88

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  toCapitelize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.toCapitelize(this.props.category)} - News`;
  }

  async updateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(10);
    this.setState({ loading: true });
    this.props.setProgress(20);
    let data = await fetch(url);
    this.props.setProgress(50);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handelPrevClick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }

  handelNextClick = async () => {
    this.setState({ page: this.state.page + 1 })
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })

    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=04cbabc1b5b4467aaf7bc0e1f1ac7c88&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
    });
  };



  render() {
    return (
      <>
        <h2 className="text-center">NewsApp Top  {this.toCapitelize(this.props.category)}</h2>

        {/* for infinite scroll  */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-3" key={element.publishedAt}>
                  <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 50) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F966d050a-d276-447d-b79f-286722249e10.jpg?source=next-opengraph&fit=scale-down&width=900"} newsUlr={element.url ? element.url : ""} alt={element.title ? element.title.slice(0, 20) : ""} author={element.author ? element.author : ""} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* for infinite scroll end */}

        {/* <div className="container">
          <div className="d-flex justify-content-between mb-3">
            <button type="button" className="btn btn-dark" onClick={this.handelPrevClick} disabled={this.state.page <= 1}> &larr; Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handelNextClick}>Next &rarr;</button>
          </div>
        </div> */}
      </>
    )
  }
}

export default News
