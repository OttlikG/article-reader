import React, { useState, useEffect, useContext } from 'react'
import ArticleView from '../../component/ArticleView/ArticleView'
import ArticleTimeline, { TimelineArticle } from '../../component/ArticleTimeline/ArticleTimeline'
import {
	transformMainArticle,
	transformTimelineArticles
} from './selector'

export default function App() {
	const [mainArticle, setMainArticle] = useState({})
	const [timelineArticles, setTimelineArticles] = useState([] as TimelineArticle[])

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const query = `country=us&apiKey=${process.env.REACT_APP_NEWS_API}`
				const response = await fetch(`https://newsapi.org/v2/top-headlines?${query}`)
				const data = await response.json()

				const transformedMainArticle = transformMainArticle(data.articles[0])
				const transformedTimelineArticles = transformTimelineArticles(data.articles.slice(1))

				setMainArticle(transformedMainArticle)
				setTimelineArticles(transformedTimelineArticles)
			} catch (error) {
				console.error(error)
				return []
			}
		}

		fetchArticles()
	}, [])

	return (
		<div className='article-page container'>
			<div className='row'>
				<div className='col-xs-12 col-md-8 article-column'>
					<a href='https://newsapi.org'>Powered by NewsAPI.org</a>
					<ArticleView {...mainArticle} />
					{!!timelineArticles.length && <ArticleTimeline timelineArticles={timelineArticles} />}
				</div>
			</div>
		</div>
	)
}
