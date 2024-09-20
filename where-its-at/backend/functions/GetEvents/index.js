const { sendResponse } = require('../../responses/index');
const { db } = require('../../services/db');

async function getEvents() {
  const { Items } = await db.scan({
    TableName: 'where-its-events',
  });

  return Items;
}

exports.handler = async (event) => {
  const events = await getEvents();

  return sendResponse(events);
};
