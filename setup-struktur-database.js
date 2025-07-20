const mysql = require('mysql2/promise');

// Railway database configuration
const dbConfig = {
  host: 'containers-us-west-207.railway.app',
  port: 7874,
  user: 'root',
  password: 'password',
  database: 'railway'
};

async function setupStrukturDatabase() {
  let connection;
  
  try {
    console.log('🔧 Setting up Struktur Organisasi Database...\n');
    
    // Create connection
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to Railway database');
    
    // Create struktur_organisasi table
    console.log('\n1. Creating struktur_organisasi table...');
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS struktur_organisasi (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nama VARCHAR(100) NOT NULL,
        jabatan VARCHAR(100) NOT NULL,
        foto VARCHAR(255),
        tipe ENUM('kepala_desa', 'sekretaris', 'kaur', 'kasi', 'kasun') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await connection.execute(createTableSQL);
    console.log('✅ Table struktur_organisasi created successfully');
    
    // Check if table exists and has data
    console.log('\n2. Checking existing data...');
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM struktur_organisasi');
    console.log(`✅ Found ${rows[0].count} existing records`);
    
    // Insert sample data if table is empty
    if (rows[0].count === 0) {
      console.log('\n3. Inserting sample data...');
      const sampleData = [
        ['Aghis Pratama, S.Pd', 'Kepala Desa', null, 'kepala_desa'],
        ['Siti Nurhaliza', 'Sekretaris Desa', null, 'sekretaris'],
        ['Wahyu Nur H', 'Kaur TU & Umum', null, 'kaur'],
        ['Titin Juharnani', 'Kaur Keuangan', null, 'kaur'],
        ['Rachmad Irvan N.I', 'Kaur Perencanaan', null, 'kaur'],
        ['M. Agus Wahyudi Z', 'Kasi Pemerintahan', null, 'kasi'],
        ['Muhammad Rifai', 'Kasi Kesra', null, 'kasi'],
        ['Subur', 'Kasi Pelayanan', null, 'kasi'],
        ['M. Jamhuri', 'Kasun Bareng', null, 'kasun'],
        ['Fathul Mu\'in', 'Kasun Tebelo', null, 'kasun'],
        ['Eko Hendri S', 'Kasun Mangunrejo', null, 'kasun'],
        ['Saparu', 'Kasun Sumberkreco', null, 'kasun']
      ];
      
      const insertSQL = 'INSERT INTO struktur_organisasi (nama, jabatan, foto, tipe) VALUES ?';
      await connection.execute(insertSQL, [sampleData]);
      console.log('✅ Sample data inserted successfully');
    } else {
      console.log('✅ Table already has data, skipping sample data insertion');
    }
    
    // Verify data
    console.log('\n4. Verifying data...');
    const [allData] = await connection.execute('SELECT * FROM struktur_organisasi ORDER BY FIELD(tipe, "kepala_desa", "sekretaris", "kaur", "kasi", "kasun"), nama');
    
    console.log(`✅ Total records: ${allData.length}`);
    console.log('\n📋 Data summary:');
    
    const summary = {
      kepala_desa: 0,
      sekretaris: 0,
      kaur: 0,
      kasi: 0,
      kasun: 0
    };
    
    allData.forEach(item => {
      summary[item.tipe]++;
      console.log(`   ${item.nama} - ${item.jabatan} (${item.tipe})`);
    });
    
    console.log('\n📊 Summary by type:');
    Object.entries(summary).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });
    
    console.log('\n🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

// Run the setup
setupStrukturDatabase(); 