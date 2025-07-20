const mysql = require('mysql2/promise');

async function checkDatabaseSchema() {
  try {
    console.log('🔍 Checking Database Schema...\n');

    // Create connection
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // Sesuaikan dengan password MySQL Anda
      database: 'websidomulyo'
    });

    console.log('✅ Connected to database');

    // 1. Check table structure
    console.log('\n1. Checking users table structure...');
    const [columns] = await connection.execute('DESCRIBE users');
    
    console.log('Columns in users table:');
    columns.forEach(col => {
      console.log(`  - ${col.Field}: ${col.Type} ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'}`);
    });

    // 2. Check if profile_image column exists
    const profileImageColumn = columns.find(col => col.Field === 'profile_image');
    if (profileImageColumn) {
      console.log('\n✅ profile_image column exists');
      console.log('   Type:', profileImageColumn.Type);
      console.log('   Null:', profileImageColumn.Null);
      console.log('   Default:', profileImageColumn.Default);
    } else {
      console.log('\n❌ profile_image column does not exist');
      console.log('   Running migration...');
      
      // Run migration
      const migrationSQL = `
        ALTER TABLE users 
        ADD COLUMN profile_image VARCHAR(255) NULL 
        AFTER no_hp;
      `;
      
      await connection.execute(migrationSQL);
      console.log('✅ Migration completed');
      
      // Verify again
      const [newColumns] = await connection.execute('DESCRIBE users');
      const newProfileImageColumn = newColumns.find(col => col.Field === 'profile_image');
      if (newProfileImageColumn) {
        console.log('✅ profile_image column now exists');
      } else {
        console.log('❌ Migration failed');
      }
    }

    // 3. Check sample user data
    console.log('\n2. Checking sample user data...');
    const [users] = await connection.execute('SELECT id, username, nama, email, no_hp, profile_image, role FROM users LIMIT 3');
    
    console.log('Sample users:');
    users.forEach(user => {
      console.log(`  - ID: ${user.id}, Username: ${user.username}, Name: ${user.nama}`);
      console.log(`    Email: ${user.email}, Phone: ${user.no_hp || 'NULL'}, Image: ${user.profile_image || 'NULL'}`);
    });

    // 4. Test insert/update with profile_image
    console.log('\n3. Testing profile_image operations...');
    
    // Test update
    const testUpdateSQL = `
      UPDATE users 
      SET profile_image = 'https://example.com/test.jpg' 
      WHERE id = 1
    `;
    
    try {
      await connection.execute(testUpdateSQL);
      console.log('✅ Update with profile_image successful');
      
      // Verify update
      const [testUser] = await connection.execute('SELECT profile_image FROM users WHERE id = 1');
      console.log('   Updated profile_image:', testUser[0]?.profile_image);
      
      // Reset to null
      await connection.execute('UPDATE users SET profile_image = NULL WHERE id = 1');
      console.log('✅ Reset profile_image to NULL successful');
      
    } catch (error) {
      console.log('❌ Update with profile_image failed:', error.message);
    }

    await connection.end();
    console.log('\n🎉 Database schema check completed!');

  } catch (error) {
    console.error('❌ Database check failed:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Tips:');
      console.log('   - Pastikan MySQL berjalan');
      console.log('   - Periksa username dan password MySQL');
      console.log('   - Pastikan database websidomulyo ada');
    }
  }
}

// Run the check
checkDatabaseSchema(); 