// API_KEY 04cbabc1b5b4467aaf7bc0e1f1ac7c88

import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [article, setArticals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);


  const toCapitelize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(50);
    let parseData = await data.json();
    props.setProgress(70);
    setArticals(parseData.articles);
    setTotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${toCapitelize(props.category)} - News`;
    updateNews();

  }, [])

  const fetchMoreData = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=04cbabc1b5b4467aaf7bc0e1f1ac7c88&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticals(article.concat(parseData.articles));
    setTotalResults(parseData.totalResults)
    setLoading(false);

  };

  return (
    <>
      <h2 className="text-center " style={{ margin: '60px 0px 0px 0px' }}>NewsApp Top  {toCapitelize(props.category)}</h2>
      {loading && <Spinner />}
      {/* for infinite scroll  */}
      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {article.map((element) => {
              return <div className="col-md-3" key={element.publishedAt}>
                <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 50) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F966d050a-d276-447d-b79f-286722249e10.jpg?source=next-opengraph&fit=scale-down&width=900"} newsUlr={element.url ? element.url : ""} alt={element.title ? element.title.slice(0, 20) : ""} author={element.author ? element.author : ""} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* for infinite scroll end */}
    </>
  )
}


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News
