import { format, formatDistanceToNow } from 'date-fns'
import { TimelineArticle } from '../../component/ArticleTimeline/ArticleTimeline'

export declare interface ArticleFromResponse {
	source: {
		id: string,
		name: string,
	},
	author: string,
	title: string,
	description: string,
	url: string,
	urlToImage: string,
	publishedAt: string,
	content: string
}

export interface TransformedMainArticle {
	imgSrc: string,
	author: {
		imgSrc: string,
		name: string
	},
	articleHeading: string,
	articleTime: string,
	articleSummary: string,
	follow: {
		twitter: {
			shareCount: number
		},
		facebook: {
			shareCount: number
		}
	}
}

export const transformMainArticle = (article: ArticleFromResponse): TransformedMainArticle => {
	return {
		imgSrc: article?.urlToImage,
		author: {
			imgSrc: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80',
			name: article?.author,
		},
		articleHeading: article?.title,
		articleTime: article?.publishedAt && format(new Date(article.publishedAt), 'y-M-d H:mm'),
		articleSummary: article?.description,
		follow: {
			twitter: {
				shareCount: 3,
			},
			facebook: {
				shareCount: 16
			}
		}
	}
}

export const transformTimelineArticles = (articles: ArticleFromResponse[]): TimelineArticle[] => {
	return articles.map(article => {
		return {
			updateTime: formatDistanceToNow(new Date(article.publishedAt)),
			topInformationTag: article.source.name,
			imgSrc: article.urlToImage,
			articleHeadline: article.title,
			articleBody: article.description,
			unixTime: new Date(article.publishedAt).getTime()
		}
	}).sort((a, b) => {
		if (a.unixTime > b.unixTime) return -1
		if (a.unixTime < b.unixTime) return 1
		
		return 0
	})
}