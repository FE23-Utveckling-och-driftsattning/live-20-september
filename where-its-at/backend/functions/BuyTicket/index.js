const { sendResponse, sendError } = require('../../responses/index');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../../services/db');

// BODY som skickas från frontend
/**
 *  { eventId: string } vilket evenemang vill man köpa biljett till?
 */

// DATA MODELL för spara en biljett

/**
 * biljettnummer: string
 * eventId: string
 * verified: boolean
 */

async function createTicket(ticketNumber, eventId) {
  await db.put({
    TableName: 'where-its-tickets',
    Item: {
      ticketId: ticketNumber,
      eventId: eventId,
      verified: false,
    },
  });
}

async function getEvent(eventId) {
  const { Item } = await db.get({
    TableName: 'where-its-events',
    Key: {
      id: eventId,
    },
  });

  return Item;
}

exports.handler = async (event) => {
  const { eventId } = JSON.parse(event.body);

  const eventInfo = await getEvent(eventId);

  if (!eventInfo) sendError(400, 'No event found with that id');

  const ticketNumber = uuidv4();

  await createTicket(ticketNumber, eventId);

  return sendResponse({ ticketNumber, eventInfo });
};
