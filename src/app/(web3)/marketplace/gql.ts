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

export const getMarketplaceTicketsListWithUser = `query MyQuery($id: String!) {
  listings(where: { state: LISTED }) {
    items {
      deadline
      price
      sellerId
      ticketId
    }
  }
  user(id: $id) {
    ticketsOwned {
      items {
        id
      }
    }
    address
  }
}`;

export const getTicketsFromAList = `query MyQuery($id_in: [String]) {
  tickets(where: { id_in: $id_in }) {
    items {
      seat
      ticketSerialNumberHash
      ownerId
      id
      event {
        eventDate
        name
      }
    }
  }
}`;
