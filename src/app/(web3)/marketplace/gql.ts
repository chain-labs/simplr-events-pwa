export const getMarketplaceTicketsListWithUser = `query MyQuery {
  listings(where: { state: LISTED }) {
    items {
      deadline
      price
      sellerId
      ticketId
      ticket {
        event {
          name
          eventDate
        }
        seat
        ticketSerialNumberHash
        tokenMetadata
        ownerId
        id
      }
    }
  }
}`;

export const getSoldTicketsQuery = `query GetSoldTickets {
  listings(where: { state: PURCHASED }) {
    items {
      deadline
      price
      sellerId
      ticketId
      ticket {
        event {
          name
          eventDate
        }
        seat
        ticketSerialNumberHash
        tokenMetadata
        ownerId
        id
      }
    }
  }
}`;
