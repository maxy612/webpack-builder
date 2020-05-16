module.exports = {
  cacheBusting: true,
  transformAssetUrls: {
    video: ["src", "poster"],
    source: "src",
    img: "src",
    image: "xlink:href",
  },
};
