module.exports = {
    // devServer: {
    //     proxy: process.env.VUE_APP_LEDGER_URL
    // },

    publicPath: process.env.NODE_ENV === 'production'
    ? '/nucarbit_dist/'
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
  },

    transpileDependencies: [
      'vuetify'
    ]
}
