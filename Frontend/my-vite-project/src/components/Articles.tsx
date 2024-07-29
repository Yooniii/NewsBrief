import './Articles.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';

function Articles() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [date, setDate] = useState('')
  const [img, setImg] = useState('')
  const [summary, setSummary] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/headlines/')
    .then(response => {
      const article = response.data.news[0];
      setTitle(article.title);
      setAuthor(article.author);
      setDate(article.date);
      setImg(article.image_url)
      // setSummary(article.summary);
    })
    .catch(error => {
      console.log(error)
    });
  }, []);


  return (
    <Fragment>
      <div className="article-container">
      <img className="article-img" src={img}></img>
      <div className="text">
        <h2 className="article-title">{title}</h2>
        <p className="article-info">{author} | {date}</p>
        <p className="summary">{summary} </p>
        <div className="btn-wrap">
          <button className="read-more-btn">Continue Reading</button>
        </div>
      </div>
    </div>
    <div className="divider"></div>
    </Fragment>
    
  )

}

export default Articles