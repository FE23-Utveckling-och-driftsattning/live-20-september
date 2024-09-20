const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/db');

// BODY som skickas från frontend
/**
 *  { ticketNumber: string } vilket biljett vill du verifiera?
 */

/**
 * 1. Kolla om biljetten finns i databasen
 * 2. Om biljetten finns så kolla om verified är true isåfall skicka tillbaka, biljett redan verifierad
 * 3. Annars om verified är false så uppdatera verified till true
 */

async function getTicket(ticketNumber) {
  const { Item } = await db.get({
    TableName: 'where-its-tickets',
    Key: {
      ticketId: ticketNumber,
    },
  });

  return Item;
}

async function updateVerified(ticketNumber) {
  await db.update({
    TableName: 'where-its-tickets',
    Key: {
      ticketId: ticketNumber,
    },
    UpdateExpression: 'SET verified = :verified',
    ExpressionAttributeValues: {
      ':verified': true,
    },
  });
}

exports.handler = async (event) => {
  const { ticketNumber } = JSON.parse(event.body);

  const ticket = await getTicket(ticketNumber);

  if (!ticket) return sendError(400, 'Ticket not found');

  if (ticket.verified)
    return sendResponse({ message: 'Ticket already verified' });
  else {
    await updateVerified(ticketNumber);

    return sendResponse({ message: 'Ticket verified' });
  }
};
