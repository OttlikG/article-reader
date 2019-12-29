import React from 'react'
import './style.scss'

export declare interface ArticleViewProps {
	imgSrc?: string;
	author?: {
		imgSrc: string;
		name?: string;
	};
	articleHeading?: string;
	articleTime?: string;
	follow?: {
		facebook: {
			shareCount: number;
		};
		twitter: {
			shareCount: number;
		};
	};
	articleSummary?: string;
}

export default function ArticleView(props: ArticleViewProps) {
	return (
		<article className="article-view" data-testid='article-view'>
			<div className='article-heading'>
				<img src={props.imgSrc} alt={props.articleHeading} />
				<div className='heading-text'>
					<h1><span className='article-headline article-headline--highlight'>{props.articleHeading}</span></h1>
				</div>
			</div>
			<div className='article-details clearfix'>
				<div className='author-details'>
					<img className='author-profile' src={props.author?.imgSrc} alt={props.author?.name} />
					<div className='author-info'>
						<div className='author-name'>{props.author?.name}</div>
						<button className='btn primary-btn follow-author'>
							<span className='follow-btn'>Follow</span>
						</button>
					</div>
				</div>
				<div className='article-time-share'>
					<span className='article-time'>
						<span className='article-timestamp'>
							{props.articleTime}
							<i className='fas fa-clock'></i>
						</span>
					</span>
					<span className='article-share'>
						<span className='twitter'>
						<i className='fab fa-twitter'></i>{props.follow?.twitter.shareCount}
					</span>
					<span className='facebook'>
							<i className='fab fa-facebook'></i>{props.follow?.facebook.shareCount}
					</span>
					</span>
				</div>
			</div>
			<div className='article-content'>
				<p>{props.articleSummary}</p>
			</div>
		</article>
	);
}
