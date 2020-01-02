import React, { useEffect, SyntheticEvent } from 'react'
import cn from 'classnames'
import './style.scss'

export declare interface TimelineArticle {
	updateTime: string,
	topInformationTag?: string,
	imgSrc: string,
	articleHeadline: string,
	articleBody: string
}

declare interface ArticleTimelineProps {
	timelineArticles: TimelineArticle[]
}

export default function ArticleTimeline(props: ArticleTimelineProps) {
	useEffect(() => {
		if (props.timelineArticles.length > 0) {
			const initArticleTimelineMasonry = require('./articleTimelineMasonry.js').default
			initArticleTimelineMasonry()
		}
	}, [props.timelineArticles])

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
			{props.timelineArticles.map(renderArticle)}
		</div>
	)
}