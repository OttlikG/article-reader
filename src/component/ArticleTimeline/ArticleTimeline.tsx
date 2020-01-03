import React, { useEffect, SyntheticEvent } from 'react'
import cn from 'classnames'
import './style.scss'

export declare interface TimelineArticle {
	updateTime: string,
	topInformationTag?: string,
	imgSrc: string,
	articleHeadline: string,
	articleBody: string,
}

declare interface ArticleTimelineProps {
	timelineArticles: TimelineArticle[],
	loadArticlesOnScroll(): void
}

function ArticleTimeline(props: ArticleTimelineProps) {
	debugger
	const {
		timelineArticles,
		loadArticlesOnScroll
	} = props

	debugger

	useEffect(() => {
		const initArticleTimelineMasonry = require('./articleTimelineMasonry.js').default
		initArticleTimelineMasonry()
	}, [timelineArticles])

	useEffect(() => {
		const roots = document.querySelectorAll('.masonry-root');
		const observers = [] as IntersectionObserver[]

		if (roots.length) {
			for (let i = 0; i < roots.length; i++) {
				const observer = new IntersectionObserver(([entry]) => {
					debugger
					(entry.target as HTMLElement).style['backgroundColor'] = 'red'
					if (entry && entry.isIntersecting) {
						debugger
						observer.disconnect()
						loadArticlesOnScroll()
					}
				})

				debugger

				const cells = roots[i].querySelectorAll('.masonry-cell')
				const lastItem = cells[cells.length - 1] as Element

				observer.observe(lastItem)
			}
		}
	}, [timelineArticles.length])

	function handleImageError(error: SyntheticEvent<any>) {
		error.currentTarget.style.display = 'none'
		error.currentTarget.closest('article').classList.add('text-article')
	}

	function renderArticle(article: TimelineArticle, index: number) {
		return (
			<article className={cn('col-xs-12 col-sm-6 masonry-cell timeline-article', {
				'text-article': !article.imgSrc
			})} key={article.articleHeadline} data-testid={`timeline-article-${index}`}>
				<div className='article-wrapper'>
					<h1 className='timeline-article-top-information'>
						<div className='top-information-wrapper'>
							<span className='update-time'>{article.updateTime}</span>
							<span className='line'></span>
							<span className='timeline-tag'>
								<span className='timeline-tag-content'>{article.topInformationTag}</span>
							</span>
						</div>
					</h1>
					<div className='recent-article'>
						<div className='article-heading'>
							{article.imgSrc && <img onError={handleImageError} className='article-heading-image' src={article.imgSrc} alt={article.articleHeadline} />}
							<div className='heading-text'>
								<h1><span data-testid='article-headline' className='article-headline article-headline--highlight'>{article.articleHeadline}</span></h1>
							</div>
						</div>
						<div className='recent-article-body'>
							<p>{article.articleBody}</p>
						</div>
					</div>
				</div>
			</article>
		)
	}


	return (
		<div className='row article-timeline masonry-root'>
			{timelineArticles.map(renderArticle)}
		</div>
	)
}

export default React.memo(ArticleTimeline)