// Populate queries for Strapi API

export const POP_TESTIMONIALS = {
  fields: ['quote', 'authorName'],
};

export const POP_FAQ = {
  fields: ['question', 'answer'],
};

export const POP_SITE_SETTINGS = {
  fields: ['siteTitle', 'tagline', 'contactEmail', 'contactPhone', 'contactAddress', 'bankName', 'bankNumber', 'defaultPickupTime', 'defaultReturnTime'],
  populate: {
    logo: {
      fields: ['url', 'alternativeText'],
    },
    secondaryLogo: {
      fields: ['url', 'alternativeText'],
    },
    navbarLinks: {
      fields: ['label', 'url'],
    },
    socialLinks: {
      fields: ['label', 'url'],
    },
    footerLinks: {
      fields: ['label', 'url'],
    },
  },
};

export const POP_FAQ_PAGE = {
  fields: ['pageTitle', 'pageDescription', 'contactTitle', 'contactDescription'],
  populate: {
    pageImage: {
      fields: ['url', 'alternativeText'],
    },
  },
};

export const POP_FLEET_PAGE = {
  fields: ['pageTitle', 'pageDescription', 'header', 'description', 'freeHeader', 'freeDescription', 'funHeader', 'funDescription'],
  populate: {
    pageImage: {
      fields: ['url', 'alternativeText'],
    },
    freeImage: {
      fields: ['url', 'alternativeText'],
    },
    funImage: {
      fields: ['url', 'alternativeText'],
    },
  },
};

export const POP_MACHINES = {
  fields: ['name', 'heroName', 'heroDescription', 'slug', 'type', 'overview', 'fleetOverview', 'basePricePerDay', 'serviceFee', 'depositFee', 'minRentalDays', 'isActive'],
  populate: {
    cardPhoto: {
      fields: ['url', 'alternativeText'],
    },
    specifications: {
      fields: ['label', 'value', 'icon'],
    },
    gallery: {
      fields: ['url', 'alternativeText'],
    },
    features: {
      populate: {
        image: {
          fields: ['url', 'alternativeText'],
        },
      },
    },
  },
};

export const POP_RATE_PAGE = {
  fields: ['pageTitle', 'pageDescription', 'bookingDetails'],
  populate: {
    pageImage: {
      fields: ['url', 'alternativeText'],
    },
    includedDetails: {
      populate: {
        includedItems: {
          fields: ['itemHeader', 'itemDescription'],
        },
      },
    },
    extraPaidItemsDetails: {
      populate: {
        paidItems: {
          fields: ['itemHeader', 'itemDescription', 'itemPrice', 'priceInterval'],
        },
      },
    },
  },
};

export const POP_CONTACT_PAGE = {
  fields: ['pageTitle', 'pageDescription', 'pageOverview'],
  populate: {
    pageImage: {
      fields: ['url', 'alternativeText'],
    },
  },
};

export const POP_PARKING_PAGE = {
  fields: ['pageTitle', 'pageDescription', 'pageOverview'],
  populate: {
    pageImage: {
      fields: ['url', 'alternativeText'],
    },
  },
};

export const POP_PARTNERSHIP_PAGE = {
  fields: ['pageTitle', 'pageDescription', 'pageOverview'],
  populate: {
    pageImage: {
      fields: ['url', 'alternativeText'],
    },
  },
};

export const POP_HOME = {
  populate: {
    sections: {
      on: {
        'home.hero': {
          fields: ['freeHeader', 'freeDescription', 'funHeader', 'funDescription'],
          populate: {
            freeImage: {
              fields: ['url', 'alternativeText'],
            },
            funImage: {
              fields: ['url', 'alternativeText'],
            },
          },
        },
        'home.why-choose-us': {
          fields: ['sectionTitleFree', 'sectionDescriptionFree', 'sectionTitleFun', 'sectionDescriptionFun'],
          populate: {
            why_choose_uses: {
              fields: ['title', 'content', 'imagePosition', 'buttonText', 'buttonUrl', 'displayFor'],
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
        'home.featured-machines': {
          fields: ['sectionTitle', 'sectionDescription', 'seeMachinesLabel', 'seeMachinesUrl'],
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
        'home.book-now': {
          fields: ['sectionTitle', 'sectionDescription', 'buttonLabel', 'buttonUrl'],
          populate: {
            sectionImage: {
              fields: ['url', 'alternativeText'],
            },
          },
        },
      },
    },
  },
};
