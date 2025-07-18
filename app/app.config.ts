export default defineAppConfig({
  global: {
    picture: {
      dark: '/avatar.jpeg',
      light: '/avatar.jpeg',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/oliver3109/30min',
    email: 'oliver@drivenbyinfinite.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    }
  },

  footer: {
    credits: `Copyright © 2023 - ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        icon: 'i-simple-icons-invision',
        to: 'https://www.linkedin.com/in/oliver3109/',
        target: '_blank',
        'aria-label': 'Linkedin'
      },
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/oliver3109',
        target: '_blank',
        'aria-label': 'GitHub'
      },
      {
        icon: 'i-simple-icons-processingfoundation',
        to: 'https://openprocessing.org/user/324595?view=sketches',
        target: '_blank',
        'aria-label': 'OpenProcessing'
      },
      {
        icon: 'i-simple-icons-x',
        to: 'https://x.com/oliver3109',
        target: '_blank',
        'aria-label': 'X'
      }
    ]
  }
})
