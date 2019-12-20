import React from 'react'
import ArticleView from '../component/ArticleView/ArticleView'
import ArticleTimeline from '../component/ArticleTimeline/ArticleTimeline'

const temporaryProps = {
	imgSrc:
		"https://images.unsplash.com/photo-1575958951189-3442159fbadd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
	author: {
		imgSrc:
			"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
		name: "César Rincón",
		authorPageUrl: "#"
	},
	articleHeading:
		"Volcano tourism in the spotlight after New Zealand eruption",
	articleTime: new Date().toLocaleString(),
	follow: {
		facebook: {
			shareLink: "",
			shareCount: 12
		},
		twitter: {
			shareLink: "",
			shareCount: 3
		}
	},
	articleSummary: `The deadly eruption of a New Zealand volcano has drawn a spotlight
		on how active volcanoes draw crowds of tourism each year. With so many active
		volcanoes on the planet, tourists are seeking out thrills on mountains from Japan to DR Congo.`
};

export default function App() {
	return (
		<div className='article-page container'>
			<div className='row'>
				<div className='col-xs-12 col-md-8 article-column'>
					<ArticleView {...temporaryProps} />
					<ArticleTimeline />
				</div>
			</div>
		</div>
	)
}
