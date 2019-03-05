export default {
  'internal video': {
    title: 'internal video, single url poster',
    src: 'http://techslides.com/demos/sample-videos/small.mp4',
    poster: 'https://picsum.photos/800/600/?image=24',
  },
  autoplay: {
    title: 'autoplay',
    src: 'http://techslides.com/demos/sample-videos/small.mp4',
    autoplay: true,
    controls: false,
    cover: 'cover',
    poster: {
      meta: {
        title: 'poster title',
      },
      images: {
        optimized: {
          standard: {
            200: 'https://picsum.photos/800/600/?image=25',
          },
          webp: {
            200: 'https://picsum.photos/800/600/?image=25',
          },
        },
        original: {
          url: 'https://picsum.photos/800/600/?image=25',
          sizes: {
            width: '200',
            height: '200',
          },
        },
      },
    },
  },
  'youtube-a': {
    title: 'youtube A',
    src: 'https://youtu.be/hc9pnlIbPjA',
    autoplay: false,
  },
  'youtube-b': {
    title: 'youtube B',
    src: 'https://www.youtube.com/v/hc9pnlIbPjA',
    autoplay: true,
  },
  'youtube-c': {
    title: 'youtube C',
    src: 'https://www.youtube.com/watch?v=hc9pnlIbPjA',
  },
  vimeo: {
    title: 'youtube C',
    src: 'https://vimeo.com/259411563',
  },
};
