const mongoose = require('mongoose');
const cron = require('node-cron');
require('dotenv').config();


const cronJob = async () => {

// MongoDB database and collection names
const dailyDBName = 'test';
const staffCollectionName = 'Staff';
const archiveDBName = 'Archive';
const archivedStaffCollectionName = 'ArchivedStaff';

// Schedule the task to run at 9:00 AM daily
cron.schedule('49 21 * * *', async () => {
  try {
    // Connect to MongoDB Atlas
    const client = await mongoose.connect(process.env.CONNECTION_URI)
    const dailyDB = mongoose.connection.client.db(dailyDBName);
    const archiveDB = mongoose.connection.client.db(archiveDBName);

    // Get the documents from the Staff collection in Daily database
    const staffDocuments = await dailyDB.collection(staffCollectionName).find({}).toArray();

    if (staffDocuments.length > 0) {
      // Insert the documents into the ArchivedStaff collection in Archive database
      await archiveDB.collection(archivedStaffCollectionName).insertMany(staffDocuments);

      // Delete the documents from the Staff collection in Daily database
      await dailyDB.collection(staffCollectionName).deleteMany({});
    } else {
      console.log('No documents found in the Staff collection. Skipping migration and deletion.');
    }

    // Delete the documents from the Staff collection in Daily database
    await dailyDB.collection(staffCollectionName).deleteMany({});

    // Close the MongoDB connection
    await mongoose.disconnect();

    console.log('Data migration and deletion completed successfully.');
  } catch (error) {
    console.error('Error occurred during data migration and deletion:', error);
  }
});

};

module.exports = cronJob;