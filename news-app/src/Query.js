import React,{ useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import image from './image.png';

export default function Query() {
    const [searchParams] = useSearchParams();
    var query = searchParams.get('q');

    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch(`https://newsdata.io/api/1/news?country=in&q=${query}&apiKey=pub_8708d3d6fb504ee7522ad3267f799ac13c6f`)
            .then(response => response.json())
            .then(response => setNews(response.results))
    }, [query])

    if(news.length>0){
        return (
            <div className='welcome container-fluid'>
                <div className='welcome-title'>News Corresponding to {query}</div>
                <div className='articles container'>
                    <div className='row'>
                        {news.map((article) =>
                            <div className='article col-md-6' key={article.title}>
                                <img src={image} className='article-img' alt="..."/><br/>
                                <div className='article-title'>
                                    <a
                                        href={article.link}
                                        className='article-link'
                                        target="blank">
                                        {article.title}
                                    </a>
                                </div><hr />
                                <p
                                    dangerouslySetInnerHTML={{ __html: article['description'] }}
                                    className="article-summary">
                                </p>
                                <div className='article-dateTime'>
                                    Published on {(article.pubDate.slice(0, 10))} at {article.pubDate.slice(11, 16)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className='welcome container-fluid'>
                <div className="welcome-title">No search results found for {query}</div>
                <div className="blank"></div>
            </div>
        )
    }
}
