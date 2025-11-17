// Populate queries for Strapi API

export const POP_TESTIMONIALS = {
  fields: ['quote', 'authorName'],
};

export const POP_FAQ = {
  fields: ['question', 'answer'],
};

export const POP_HOME = {
  populate: {
    sections: {
      on: {
        'home.hero': {
          fields: ['title', 'subtitle', 'sub_subtitle', 'description', 'primaryButtonLabel', 'primaryButtonUrl', 'secondaryButtonLabel', 'secondaryButtonUrl'],
          populate: {
            backgroundImage: {
              fields: ['url', 'alternativeText'],
            },
          },
        },
        'home.why-choose-us': {
          populate: {
            why_choose_uses: {
              fields: ['title', 'content', 'imagePosition', 'buttonText', 'buttonUrl'],
              populate: {
                image: {
                  fields: ['url', 'alternativeText'],
                },
              },
            },
          },
        },
        'home.featured-campers': {
          fields: ['sectionTitle', 'sectionDescription', 'seeCampersLabel', 'seeCampersUrl'],
          populate: {
            machines: {
              fields: ['name', 'slug', 'type', 'overview'],
              populate: {
                cardPhoto: {
                  fields: ['url', 'alternativeText'],
                },
              },
            },
          },
        },
        'home.testimonials': {
          fields: ['sectionTitle', 'sectionDescription'],
          populate: {
            testimonials: {
              fields: ['quote', 'authorName'],
            },
          },
        },
        'home.faq-list': {
          fields: ['sectionTitle', 'sectionDescription', 'seeFAQsLabel', 'seeFAQsUrl'],
          populate: {
            faqs: {
              fields: ['question', 'answer'],
            },
          },
        },
      },
    },
  },
};
