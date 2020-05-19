module.exports = {
  vue: {
    js: [
      {
        path:
          "https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.runtime.min.js",
        external: {
          packageName: "vue",
          variableName: "Vue",
        },
      },
    ],
    css: [],
  },

  react: {
    js: [
      {
        path:
          "https://cdn.bootcdn.net/ajax/libs/react/16.13.1/umd/react.production.min.js",
        external: {
          packageName: "react",
          variableName: "React",
        },
      },

      {
        path:
          "https://cdn.bootcdn.net/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js",
        external: {
          packageName: "react-dom",
          variableName: "ReactDOM",
        },
      },
    ],
    css: [],
  },
};
