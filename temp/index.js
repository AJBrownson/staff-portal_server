const { MongoClient } = require('mongodb');
const cron = require('node-cron');

// MongoDB connection string
const uri = 'mongodb+srv://<username>:<password>@<cluster-url>/';

// MongoDB database and collection names
const dailyDBName = 'Daily';
const staffCollectionName = 'Staff';
const archiveDBName = 'Archive';
const archivedStaffCollectionName = 'ArchivedStaff';

// Schedule the task to run at 12:00 AM daily
cron.schedule('0 0 0 * * *', async () => {
  try {
    // Connect to MongoDB Atlas
    const client = await MongoClient.connect(uri);
    const dailyDB = client.db(dailyDBName);
    const archiveDB = client.db(archiveDBName);

    // Get the documents from the Staff collection in Daily database
    const staffDocuments = await dailyDB.collection(staffCollectionName).find({}).toArray();

    // Insert the documents into the ArchivedStaff collection in Archive database
    await archiveDB.collection(archivedStaffCollectionName).insertMany(staffDocuments);

    // Delete the documents from the Staff collection in Daily database
    await dailyDB.collection(staffCollectionName).deleteMany({});

    // Close the MongoDB connection
    client.close();

    console.log('Data migration and deletion completed successfully.');
  } catch (error) {
    console.error('Error occurred during data migration and deletion:', error);
  }
});

// Start the cron job
cron.start();
