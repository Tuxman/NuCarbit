module.exports = {
    configureWebpack: {
			module: {
				rules: [
					{
						enforce: 'pre',
						test: /\.js$/,
						exclude: /node_modules/,
						loader: 'eslint-loader',
					},
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: 'babel-loader',
					},
				],
			},
			transformAssetUrls: {
				// video: ['src', 'poster'],
				// source: 'src',
				// img: 'src',
				// image: 'xlink:href',
				'b-img': 'src',
				'b-img-lazy': ['src', 'blank-src'],
				'b-card': 'img-src',
				'b-card-img': 'src',
				'b-card-img-lazy': ['src', 'blank-src'],
				'b-carousel-slide': 'img-src',
				'b-embed': 'src'
			}
  }
}