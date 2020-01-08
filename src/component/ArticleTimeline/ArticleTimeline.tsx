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

const columnHeight = (columnSelector: string) => {
	return [...document.querySelectorAll(`.column-wrapper ${columnSelector} .masonry-cell`) as NodeListOf<HTMLElement>]
	.reduce((acc: number, cell: HTMLElement) => acc + cell.offsetHeight, 0)
}

const getHighestColumn = () => {
	const firstColumn = document.querySelector('.column-wrapper .first-column') as HTMLElement
	const secondColumn = document.querySelector('.column-wrapper .second-column') as HTMLElement
	const column = columnHeight('.first-column') > columnHeight('.second-column') ? firstColumn : secondColumn

	return column
}

const getLastCellOfHighestColumn = () => {
	return getHighestColumn().lastChild
}

function ArticleTimeline(props: ArticleTimelineProps) {
	const {
		timelineArticles,
		loadArticlesOnScroll
	} = props

	useEffect(() => {
		const roots = document.querySelectorAll('.masonry-root');
		const eventListeners: HTMLElement[] = []
		const observers = []
		window.globalObserver = []

		function installObserverOnLastArticle(root: HTMLElement) {
			const observer = new IntersectionObserver(([entry]) => {
				(entry.target as HTMLElement).style['backgroundColor'] = 'red'
				if (entry && entry.isIntersecting) {
					observer.disconnect()
					loadArticlesOnScroll()
				}
			}, {
				rootMargin: '300px'
			})
			window.globalObserver.push(observer)

			const lastCellToInstallObserver = getLastCellOfHighestColumn() as Element

			observer.observe(lastCellToInstallObserver)
			observers.push(observer)
		}

		if (roots.length) {
			for (let i = 0; i < roots.length; i++) {
				const layoutContainer = roots[i].querySelector('.masonry-root .column-wrapper') as HTMLElement
				layoutContainer.addEventListener('layoutTimelineFinished', () => installObserverOnLastArticle(roots[i] as HTMLElement))

				eventListeners.push(layoutContainer)
			}
		}

		return () => {
			eventListeners.forEach((container) => {
				(container as HTMLElement).removeEventListener('layoutTimelineFinished', () => installObserverOnLastArticle)
			})
		}
	}, [timelineArticles.length, loadArticlesOnScroll])

	useEffect(() => {
		const cellElements = document.querySelectorAll('.masonry-root .initial-cells .masonry-cell')
		
		const intervalId = setInterval(() => {
			const images = [...document.querySelectorAll('.masonry-cell .article-heading img')] as HTMLImageElement[]
			const readyToLayout = images.every((img: HTMLImageElement) => img.complete)

			if (readyToLayout) {
				layoutTimeline()
				clearInterval(intervalId)
			}
		})

		function layoutTimeline() {
			const layoutContainer = document.querySelector('.masonry-root .column-wrapper') as HTMLElement
			const firstColumnElement = document.querySelector('.masonry-root .first-column') as HTMLElement
			const secondColumnElement = document.querySelector('.masonry-root .second-column') as HTMLElement
			

			const firstColumn = [] as HTMLElement[]
			const secondColumn = [] as HTMLElement[]

			const firstColumnAccumulatedHeight = [...firstColumnElement.querySelectorAll('.masonry-cell') as NodeListOf<HTMLElement>].reduce((acc, cell) => acc + cell.offsetHeight, 0)
			const secondColumnAccumulatedHeight = [...secondColumnElement.querySelectorAll('.masonry-cell') as NodeListOf<HTMLElement>].reduce((acc, cell) => acc + cell.offsetHeight, 0)
			const firstColumnOffsetFromBottom = layoutContainer?.offsetHeight - firstColumnAccumulatedHeight
			const secondColumnOffsetFromBottom = layoutContainer?.offsetHeight - secondColumnAccumulatedHeight
			let firstColumnHeight = 0 - firstColumnOffsetFromBottom
			let secondColumnHeight = 0 - secondColumnOffsetFromBottom
	
			Array.prototype.map.call(cellElements, (cell: HTMLElement) => {
				let column
				if (firstColumnHeight <= secondColumnHeight) {
					firstColumnHeight += cell.offsetHeight
					column = firstColumn
				} else {
					secondColumnHeight += cell.offsetHeight
					column = secondColumn
				}
				column.push(cell)
			})

			firstColumn.forEach(cell => {
				const cells = firstColumnElement.querySelectorAll('.masonry-cell')
				if (cells.length) {
					cells[cells.length - 1].after(cell)
				} else {
					firstColumnElement?.appendChild(cell)
				}

			})

			secondColumn.forEach(cell => {
				const cells = secondColumnElement.querySelectorAll('.masonry-cell')
				if (cells.length) {
					cells[cells.length - 1].after(cell)
				} else {
					secondColumnElement?.appendChild(cell)
				}
			})
			
			setTimeout(() => {
				const event = new CustomEvent('layoutTimelineFinished')
				layoutContainer.dispatchEvent(event)
			}, 2000)
		}
	}, [timelineArticles.length])

	function handleImageError(error: SyntheticEvent<any>) {
		error.currentTarget.style.display = 'none'
		error.currentTarget.closest('article').classList.add('text-article')
	}

	function renderArticle(article: TimelineArticle, index: number) {
		return (
			<article className={cn('masonry-cell timeline-article', {
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
			<div className='col-xs-12 col-sm-6 initial-cells'>{timelineArticles.map(renderArticle)}</div>
			<div className='column-wrapper'>
				<div className='col-xs-12 col-sm-6 first-column'>
				</div>
				<div className='col-xs-12 col-sm-6 second-column'>
				</div>
			</div>
		</div>
	)
}

export default React.memo(ArticleTimeline)