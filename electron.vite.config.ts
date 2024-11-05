import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin({ removeBundleJS: false })]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {}
})
