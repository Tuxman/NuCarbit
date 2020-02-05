module.exports = {
		publicPath: process.env.NODE_ENV === 'production'
		? '/o_beer_dist/'
		: '/',
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
			}
  }
}