const productsSeedData = [
  {
    title: 'red prayer plant',
    description: `Colorful and bold with hints of red on two-toned leaves`,
    price: 3500,
    imgUrl: 'imgs/red-prayer-plant-stone.jpg',
    stock: 15,
    tag: 'bright light'
  },
  {
    title: 'ponytail palm',
    description: `Fun, distinct, and hardy. This plant is low-maintenance and adaptable.`,
    price: 6500,
    imgUrl: 'imgs/ponytail-palm-clay-1500x1819.jpg',
    stock: 40,
    tag: 'low light'
  },
  {
    title: 'calathea beauty star',
    description: `Sweet and unique, with striped leaves`,
    price: 3500,
    imgUrl: 'imgs/alathea-beauty-star-3-1140x1391-1.jpg',
    stock: 47,
    tag: 'medium light'
  },
  {
    title: 'philodendron heartleaf',
    description: `Unique and trailing with heart-shaped leaves.`,
    price: 2700,
    imgUrl: 'imgs/philodendron-green_featured_768x.jpg',
    stock: 12,
    tag: 'medium light'
  },
  {
    title: 'kimberly queen fern',
    description: `Graceful, soft, and timeless. This clean fern is low-maintenance.`,
    price: 6400,
    imgUrl: 'imgs/kimberly-queen-fern-slate-2-1140x1382.jpg',
    stock: 100,
    tag: 'medium light'
  },
  {
    title: 'dracaena limelight',
    description: `Full and bright, with wide, neon leaves.`,
    price: 14900,
    imgUrl: 'imgs/dracaena-limelight-indigo-1.jpg',
    stock: 49,
    tag: 'bright light'
  },
  {
    title: 'philodendron hope selloum',
    description: `Stunning, exotic, and vibrant, with large, serrated leaves.`,
    price: 14900,
    imgUrl: 'imgs/philodendron-hope-selloum-indigo-2-1.jpg',
    stock: 27,
    tag: 'bright light'
  },
  {
    title: 'dracaena giganta',
    description: `Large thick foliage bursts from the center cane of this bright statement plant.`,
    price: 15700,
    imgUrl: 'imgs/dracaena-giganta-indigo-839x1024.jpg',
    stock: 28,
    tag: 'low light'
  },
  {
    title: 'sansevieria sayuri',
    description: `Architectural and sturdy. This plant is easy to care for and highly adaptable to most conditions.`,
    price: 13700,
    imgUrl: 'imgs/sansevieria-sayuri_stone.jpg',
    stock: 83,
    tag: 'medium light'
  },
  {
    title: 'variegated ficus',
    description: `The Ficus Elastica Variegated is a spectacular indoor plant with thick, glossy leaves that have beautiful pink/red variegation that contrasts with green for a great focal piece for any home.`,
    price: 13500,
    imgUrl: 'imgs/variegated-ficus_charcoal.jpg',
    stock: 109,
    tag: 'medium light'
  },
  {
    title: 'peperomia ginny',
    description: `Cute and colorful, with white, pink, and green leaves.`,
    price: 3700,
    imgUrl: 'imgs/peperomia-ginny-slate.jpg',
    stock: 5,
    tag: 'bright light'
  },
  {
    title: 'arrowhead plant',
    description: `Distinct and fun with broad, arrow-shaped leaves.`,
    price: 4000,
    imgUrl: 'imgs/arrowhead-plant-charcoal.jpg',
    stock: 67,
    tag: 'bright light'
  },
  {
    title: 'calathea freddie',
    description: `Sweet and unique, with striped, wavy leaves.`,
    price: 4500,
    imgUrl: 'imgs/calathea-freddy-slate.jpg',
    stock: 87,
    tag: 'low light'
  },
  {
    title: 'bird of paradise',
    description: `Impressive and tropical with large, glossy leaves.`,
    price: 13900,
    imgUrl: 'imgs/bird-of-paradise.jpg',
    stock: 39,
    tag: 'low light'
  },
  {
    title: 'spider plant',
    description: `Fun and whimsical, with long, curved leaves.`,
    price: 3700,
    imgUrl: 'imgs/spider-plant-indigo-2.jpg',
    stock: 98,
    tag: 'bright light'
  },
  {
    title: 'stromanthe triostar',
    description: `Eye-catching, with large pink and green leaves.`,
    price: 15000,
    imgUrl: 'imgs/tromanthe-triostar-slate-2.jpg',
    stock: 734,
    tag: 'bright light'
  },
  {
    title: 'calathea rattlesnake',
    description: `Exotic and wavy with tri-colored leaves.`,
    price: 3500,
    imgUrl: 'imgs/rattlesnake-plant_stone.jpg',
    stock: 74,
    tag: 'medium light'
  },
  {
    title: 'alocasia polly',
    description: `Glossy dark leaves with silvery-green streaks.`,
    price: 6300,
    imgUrl: 'imgs/alocasia-polly_slate.jpg',
    stock: 235,
    tag: 'medium light'
  },
  {
    title: 'fern mahogany',
    description: `Fern with deep brown fronds that turn to green as they age.`,
    price: 7400,
    imgUrl: 'imgs/mahogany-fern-stone.jpg',
    stock: 99,
    tag: 'bright light'
  },
  {
    title: 'fern friends collection',
    description: `Three bright green ferns with distinct leaves`,
    price: 6500,
    imgUrl: 'imgs/fern-friends_terra-cotta.jpg',
    stock: 74,
    tag: 'low light'
  },
  {
    title: 'pink splash aglaonema',
    description: `Lush and colorful, with various shades of pink.`,
    price: 5500,
    imgUrl: 'imgs/pink-splash-aglaonema-slate.jpg',
    stock: 301,
    tag: 'low light'
  },
  {
    title: 'hedgehog aloe',
    description: `Unique and delightful succulent`,
    price: 2500,
    imgUrl: 'imgs/hedgehog-ale-stone-1.jpg',
    stock: 4,
    tag: 'bright light'
  },
  {
    title: 'tough stuff collection',
    description: `Three easy and adaptable plants`,
    price: 7500,
    imgUrl: 'imgs/tough-stuff_basalt.jpg',
    stock: 108,
    tag: 'low light'
  },
  {
    title: 'fur friendly collection',
    description: `Three playful pet-safe plants.`,
    price: 6500,
    imgUrl: 'imgs/fur-friendly_basalt-NEW.jpg',
    stock: 70,
    tag: 'medium light'
  },
  {
    title: 'yucca cane',
    description: `Architectural and very low maintenance.`,
    price: 19900,
    imgUrl: 'imgs/xl-yucca-cane_clay.jpg',
    stock: 100,
    tag: 'bright light'
  },

  {
    title: 'Oxalis',
    description: `Known as a false shamrock because of its trifoliate leaf shape, Oxalis do best in warm and sunny conditions.`,
    price: 3800,
    imgUrl: 'imgs/oxalis_featured_768x.jpg',
    stock: 60,
    tag: 'low light'
  },
  {
    title: 'Monstera Deliciosa',
    description: `Nicknamed the “swiss cheese plant,” the Monstera deliciosa is famous for its quirky natural leaf holes.`,
    price: 5600,
    imgUrl:
      'imgs/monstera_featured_fa0a668a-2106-406f-95e6-faef1bc10518_768x.jpg',
    stock: 30,
    tag: 'bright light'
  },
  {
    title: 'Snake Plant Laurentii',
    description: `The Snake Plant Laurentii is a succulent plant characterized by its upright swordlike leaves with vibrant yellow edges.`,
    price: 6200,
    imgUrl: 'imgs/snake-plant-laurentii_featured_768x.jpg',
    stock: 5,
    tag: 'bright light'
  },
  {
    title: 'Marble Queen',
    description: `The Pothos Marble and its quick growing vines full of variegated green and white leaves will make any space look more lush.`,
    price: 5600,
    imgUrl:
      'imgs/marble-queen_featured_20737549-ed4e-48a2-86ba-bdf4145c5117_768x.jpg',
    stock: 1,
    tag: 'low light'
  },
  {
    title: 'The Sunny Plant Set',
    description: `Both the succulents, our Haworthia and Echeveria, thrive in bright light and can survive weeks without water.`,
    price: 4300,
    imgUrl: 'imgs/the-sunny-sill-set_featured_768x.jpg',
    stock: 14,
    tag: 'bright light'
  },
  {
    title: 'Two Plant Set',
    description: `This handpotted duo is non-toxic and can share a space with your cat or dog.`,
    price: 6800,
    imgUrl: 'imgs/plant-parent-pair_featured_768x.jpg',
    stock: 2,
    tag: 'low light'
  },
  {
    title: 'Calathea Rattlesnake Small',
    description: `The Calathea Rattlesnake has long wavy green leaves with a pattern of deep green brushstrokes on top, resembling reptile skin, and a deep purple underside.`,
    price: 1900,
    imgUrl:
      'imgs/calathea-rattlesnake_featured_650a706a-b31b-48cf-ae25-289ddef895d5_768x.jpg',
    stock: 8,
    tag: 'bright light'
  },
  {
    title: 'Birds Nest Fern',
    description: `If you’re looking for the perfect tropical houseplant, look no further than the Bird’s Nest Fern. Known for its wavy ripple-edge fronds that grow out of a central rosette, this plant will add vibrant pop of green to any space.`,
    price: 3900,
    imgUrl: 'imgs/birds-nest-fern_featured_768x.jpg',
    stock: 10,
    tag: 'medium light'
  },
  {
    title: 'Green Philodendron',
    description: `Why is the Philodendron our most popular plant? From its heart-shaped vibrant green leaves, to its easy-going nature, to its quick-growing trailing vines – the Philodendron is the quintessential houseplant every budding plant parent needs.`,
    price: 3500,
    imgUrl: 'imgs/greenleaf-philodendron-5-1140x1391.jpg',
    stock: 3,
    tag: 'low light'
  },
  {
    title: 'ZZ Plant',
    description: `The ZZ Plant is characterized by its thick waxy green leaves. It is a great air purifying plant for beginners.`,
    price: 4400,
    imgUrl: 'imgs/zz-plant_variant_medium_hyde_cream_featured_768x.jpg',
    stock: 12,
    tag: 'medium light'
  },
  {
    title: 'Haworthia Zebra',
    description: `This quirky, compact succulent is marked by ridges with bright white stripes like a zebra.`,
    price: 2700,
    imgUrl:
      'imgs/haworthia-zebra_featured_b1839584-088d-4451-bb2f-b58cc5d3e3bd_768x.jpg',
    stock: 4,
    tag: 'bright light'
  },
  {
    title: 'Perperomia Obtusfolia',
    description: `The Peperomia Obtusfolia, or baby rubber plant, is characterized by its thick spoon-shaped green leaves.`,
    price: 3200,
    imgUrl: 'imgs/peperomia-obtusfolia-green_featured_768x.jpg',
    stock: 3,
    tag: 'bright light'
  },
  {
    title: 'Echeveria Lola',
    description: `The Echeveria is an iconic rosette-shaped succulent with drought tolerant fleshy green leaves.`,
    price: 1900,
    imgUrl: 'imgs/echeveria-lola_featured_768x.jpg',
    stock: 5,
    tag: 'bright light'
  },
  {
    title: 'Money Tree Plant',
    description: `The Money Tree is a popular houseplant because of its resilience, ease of growth, and fun braided trunk.`,
    price: 3900,
    imgUrl:
      'imgs/money-tree_featured_9dcad2fa-3bf0-4677-9553-6f5d3c188f64_768x.jpg',
    stock: 6,
    tag: 'medium light'
  },
  {
    title: 'Calathea Medallian',
    description: `The Calathea Medallion gets its name from the unique roundness of its leaves. They have a brilliant green pattern on top, and are a deep burgundy underneath.`,
    price: 6200,
    imgUrl: 'imgs/calathea-medallion_featured_768x.jpg',
    stock: 1,
    tag: 'low light'
  },
  {
    title: 'Echeveria Agavoides',
    description: `Our favorite plant gift to give – the charming Echeveria is known for its iconic rosette-shape, succulent nature, and pet-friendliness.`,
    price: 2600,
    imgUrl: 'imgs/echeveria-agavoides_featured_768x.jpg',
    stock: 2,
    tag: 'bright light'
  }
]

module.exports = productsSeedData
