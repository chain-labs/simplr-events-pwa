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

export const GetUserBought = `query GetUserBought($userId: String!) {
  escrows(where: {buyerId: $userId}) {
    items {
      buyerId
      sellerId
      event {
        name
        eventDate
      }
      ticket {
        id
        seat
        ticketSerialNumberHash
        tokenMetadata
        tokenURI
        listings {
          items {
            price
            deadline
          }
        }
      }
      isDisputed
      isResolved
      fundsLocked
    }
  }
}`;

export const GetUserSold = `query GetUserSold($userId: String!) {
  escrows(where: {sellerId: $userId}) {
    items {
      buyerId
      sellerId
      event {
        name
        eventDate
      }
      ticket {
        id
        seat
        ticketSerialNumberHash
        tokenMetadata
        tokenURI
        listings {
          items {
            price
            deadline
          }
        }
      }
      isDisputed
      isResolved
      fundsLocked
    }
  }
}`;
