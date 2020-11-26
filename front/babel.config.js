module.exports = {
  devServer: {
    proxy: 'http://localhost:3000',
    host: 'localhost'
  },
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
