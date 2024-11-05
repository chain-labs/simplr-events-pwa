export const getListings = `query MyQuery {
  listings {
    items {
      deadline
      eventId
      price
      state
      sellerId
      seller {
        address
      }
      ticketId
      event {
        eventDate
        name
      }
    }
  }
}`;

export const getOwnedTickets = `query MyQuery($id: String!) {
  user(id: $id) {
    ticketsOwned {
      items {
        id
        event {
          name
          eventDate
        }
        owner {
          address
        }
      }
    }
    address
  }
}`;
