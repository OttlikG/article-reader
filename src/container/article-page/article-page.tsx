import React, { useState, useEffect, useMemo, useCallback } from "react";
import { subDays } from 'date-fns'
import ArticleView from "../../component/ArticleView/ArticleView";
import ArticleTimeline from "../../component/ArticleTimeline/ArticleTimeline";
import { transformMainArticle, transformTimelineArticles, ArticleFromResponse } from "./selector";
import parseQueryParams from '../../utils/parse-query-params'

function usePagination(
	hostname: string
) {
	const [articles, setArticles] = useState([] as ArticleFromResponse[]);
	const [windowCount, setWindowCount] = useState(1);
	const [requestError, setRequestError] = useState()
	const fromDate = useMemo(() => subDays(new Date(), 1), [])
	
	const queryString = parseQueryParams({
		from: subDays(fromDate, windowCount - 1).toISOString(),
		sources: 'cnn',
		page: String(windowCount)
	})

	useEffect(() => {
		const fetchArticle = async (url: string) => {
			try {
				let data = await fetch(url, {
					headers: {
						Authorization: `Bearer ${process.env.REACT_APP_NEWS_API}`
					}
				});
				
				if (data.status === 200) {
					const { articles } = await data.json();

					setArticles(a => a.concat(articles));
				}

				if (data.status >= 400 && data.status < 500) {
					setRequestError(data.status)
				}
			} catch (error) {
				console.log(error)
			}
		};

		const url = `${hostname}?${queryString}`
		fetchArticle(url);
	}, [hostname, queryString, windowCount]);

	return {
		articles,
		requestError,
		setWindowCount
	};
}

export default function App() {
	const { articles, setWindowCount, requestError }: { articles: ArticleFromResponse[], setWindowCount: Function, requestError: number } = usePagination(`https://newsapi.org/v2/everything/`)
	const mainArticle = transformMainArticle(articles[0])

	const uniqueArticles = articles.filter((article, index, self) => {
		return self.findIndex(a => a.title === article.title) === index
	})

	const timelineArticles = transformTimelineArticles(uniqueArticles)

	const loadArticlesOnScroll = useCallback(() => {
		!requestError && setWindowCount((windowCount: number) => windowCount + 1)
	}, [requestError, setWindowCount])

	return (
		<div className="article-page container">
			<div className="row">
				<div className="col-xs-12 col-md-8 article-column">
					<a href="https://newsapi.org">Powered by NewsAPI.org</a>
					<ArticleView {...mainArticle} />
					{!!timelineArticles.length && (
						<ArticleTimeline timelineArticles={timelineArticles} loadArticlesOnScroll={loadArticlesOnScroll} />
					)}
					<button onClick={loadArticlesOnScroll}>Load more</button>
				</div>
			</div>
		</div>
	);
}
