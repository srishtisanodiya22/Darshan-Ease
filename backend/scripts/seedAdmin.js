const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connectDB = require('../config/db');
const Admin = require('../models/Admin');

const run = async () => {
  try {
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      console.error(
        'Please set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in backend .env before running this script.'
      );
      process.exit(1);
    }

    await connectDB();

    let admin = await Admin.findOne({ email: ADMIN_EMAIL });

    if (admin) {
      console.log('Admin already exists with this email. Updating name/password...');
      admin.name = ADMIN_NAME;
      admin.password = ADMIN_PASSWORD; // will be hashed by pre-save hook
      await admin.save();
    } else {
      admin = await Admin.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      });
      console.log('Admin created successfully.');
    }

    console.log('Admin credentials:');
    console.log(`  Email: ${ADMIN_EMAIL}`);
    console.log(`  Name : ${ADMIN_NAME}`);
    console.log('  Password: (as set in ADMIN_PASSWORD env var)');

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seed admin error:', err);
    process.exit(1);
  }
};

run();

