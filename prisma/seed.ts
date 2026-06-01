import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const baseProductFields = {
    burnTime: '45-50 hours',
    ingredients: '100% natural soy wax, premium botanical oils, cotton wick.',
    howToUse: 'Trim wick to 5mm before every burn. Burn for 2-3 hours at a time.',
  };

  // Collections
  const floral = await prisma.collection.upsert({
    where: { slug: 'floral' },
    update: {},
    create: {
      name: 'Floral',
      slug: 'floral',
      description: 'Soft, delicate, and blooming with botanical notes.',
      image: '/images/floral_candle.png'
    },
  });

  const darkMoody = await prisma.collection.upsert({
    where: { slug: 'dark-moody' },
    update: {},
    create: {
      name: 'Dark & Moody',
      slug: 'dark-moody',
      description: 'Rich, complex, and deeply atmospheric.',
      image: '/images/dark_moody_candle.png'
    },
  });

  const freshClean = await prisma.collection.upsert({
    where: { slug: 'fresh-clean' },
    update: {},
    create: {
      name: 'Fresh & Clean',
      slug: 'fresh-clean',
      description: 'Crisp, airy, and revitalizing.',
      image: '/images/fresh_clean_candle.png'
    },
  });

  const warmCosy = await prisma.collection.upsert({
    where: { slug: 'warm-cosy' },
    update: {},
    create: {
      name: 'Warm & Cosy',
      slug: 'warm-cosy',
      description: 'Comforting, familiar, and inviting.',
      image: '/images/warm_cosy_candle.png'
    },
  });

  // Products
  await prisma.product.upsert({
    where: { slug: 'velvet-noir' },
    update: {},
    create: {
      name: 'Velvet Noir',
      slug: 'velvet-noir',
      description: 'A deeply intoxicating blend of black plum, dark patchouli, and vanilla absolute. Perfect for late nights and intimate gatherings.',
      scent: 'Black Plum, Patchouli, Vanilla',
      price: 45,
      images: ['/images/dark_moody_candle.png'],
      size: ['100ml', '200ml', '300ml'],
      featured: true,
      bestseller: true,
      collectionId: darkMoody.id,
      ...baseProductFields
    },
  });

  await prisma.product.upsert({
    where: { slug: 'wild-peony' },
    update: {},
    create: {
      name: 'Wild Peony',
      slug: 'wild-peony',
      description: 'The essence of a spring garden in full bloom. Delicate peony petals mingled with wild rose and a touch of green stem.',
      scent: 'Peony, Wild Rose, Green Stem',
      price: 42,
      images: ['/images/floral_candle.png'],
      size: ['200ml'],
      featured: true,
      isNew: true,
      collectionId: floral.id,
      ...baseProductFields
    },
  });

  await prisma.product.upsert({
    where: { slug: 'coastal-sage' },
    update: {},
    create: {
      name: 'Coastal Sage',
      slug: 'coastal-sage',
      description: 'Like a breath of fresh ocean air. Sea salt, crushed sage, and driftwood combine for a revitalizing experience.',
      scent: 'Sea Salt, Sage, Driftwood',
      price: 38,
      comparePrice: 45,
      images: ['/images/fresh_clean_candle.png'],
      size: ['200ml'],
      featured: true,
      bestseller: true,
      collectionId: freshClean.id,
      ...baseProductFields
    },
  });

  await prisma.product.upsert({
    where: { slug: 'cashmere-woods' },
    update: {},
    create: {
      name: 'Cashmere Woods',
      slug: 'cashmere-woods',
      description: 'Wrap yourself in the warmth of toasted sandalwood, amber, and soft musk. The ultimate comfort candle.',
      scent: 'Sandalwood, Amber, Musk',
      price: 48,
      images: ['/images/warm_cosy_candle.png'],
      size: ['200ml', '300ml'],
      featured: true,
      collectionId: warmCosy.id,
      ...baseProductFields
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
