export const GetUserListings = `query MyQuery($sellerId: String!) {
  listings(where: {state: LISTED, sellerId: $sellerId}) {
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
