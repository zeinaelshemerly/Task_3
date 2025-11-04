import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    // Get the database name
    const dbName = mongoose.connection.db.databaseName;
    console.log('📊 Database name:', dbName);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📁 Collections:');
    collections.forEach(col => console.log(`  - ${col.name}`));
    
    // Count perks
    const perksCount = await mongoose.connection.db.collection('perks').countDocuments();
    console.log(`\n🎯 Total perks in database: ${perksCount}`);
    
    // Show sample perks
    const samplePerks = await mongoose.connection.db.collection('perks').find().limit(5).toArray();
    console.log('\n📝 Sample perks:');
    samplePerks.forEach(perk => {
      console.log(`  - ${perk.title} (${perk.merchant || 'no merchant'})`);
    });
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDatabase();
