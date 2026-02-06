import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 清空现有数据（仅开发环境）
  if (process.env.NODE_ENV !== 'production') {
    console.log('Cleaning existing data...');
    await prisma.product.deleteMany();
    console.log('✓ Cleared existing products');
  }

  // 插入产品数据
  console.log('Creating products...');

  const products = await Promise.all([
    prisma.product.create({
      data: {
        id: 'single-shaft',
        name: 'Single Shaft Shredder Blades',
        description: 'High-performance single shaft shredder blades for industrial recycling applications. Our single shaft shredders are designed for processing various materials with exceptional efficiency.',
        category: 'single-shaft',
        image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80',
        specs: JSON.stringify({
          dimensions: '200mm x 50mm x 10mm',
          material: 'D2 Tool Steel',
          hardness: 'HRC 58-60',
          weight: '1.5kg',
        }),
        features: JSON.stringify([
          'High wear resistance',
          'Superior cutting performance',
          'Long service life',
          'Customizable dimensions',
          'Precision ground cutting edges',
          'Heat treated for maximum durability',
        ]),
        applications: JSON.stringify([
          'Plastic recycling',
          'Rubber processing',
          'Paper shredding',
          'Wood waste processing',
          'Electronic waste recycling',
        ]),
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        id: 'metal',
        name: 'Metal Shredder Blades',
        description: 'Heavy-duty metal recycling blades engineered for extreme durability. Designed to process ferrous and non-ferrous metals with consistent performance.',
        category: 'metal',
        image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80',
        specs: JSON.stringify({
          dimensions: '250mm x 60mm x 15mm',
          material: 'H13 Tool Steel',
          hardness: 'HRC 56-58',
          weight: '2.8kg',
        }),
        features: JSON.stringify([
          'Extreme impact resistance',
          'High temperature resistance',
          'Corrosion resistant coating',
          'Reinforced cutting edges',
          'Extended blade life',
          'Optimized blade geometry',
        ]),
        applications: JSON.stringify([
          'Scrap metal recycling',
          'Aluminum processing',
          'Copper wire shredding',
          'Steel drum shredding',
          'Automotive parts recycling',
        ]),
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        id: 'plastic',
        name: 'Plastic Shredder Blades',
        description: 'Specialized plastic recycling blades optimized for processing various plastic materials. Features precision cutting edges for clean, consistent shredding.',
        category: 'plastic',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80',
        specs: JSON.stringify({
          dimensions: '180mm x 45mm x 8mm',
          material: 'SKD11 Tool Steel',
          hardness: 'HRC 60-62',
          weight: '1.2kg',
        }),
        features: JSON.stringify([
          'Sharp cutting edges',
          'Low friction coating',
          'Minimal heat generation',
          'Easy to maintain',
          'Precise dimensional tolerances',
          'Chemical resistant',
        ]),
        applications: JSON.stringify([
          'PET bottle recycling',
          'HDPE pipe shredding',
          'PP container processing',
          'PVC material recycling',
          'Mixed plastic waste',
        ]),
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ Seeded ${products.length} products`);

  // 显示创建的产品信息
  products.forEach((product) => {
    console.log(`   - ${product.name} (ID: ${product.id})`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
