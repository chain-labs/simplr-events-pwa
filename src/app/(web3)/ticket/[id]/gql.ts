export const GetTicketDetailsQuery = `
    query GetTicketDetailsQuery($ticketId: String!) {
        ticket(id: $ticketId) {
            seat
            ticketSerialNumberHash
            event {
                name
                eventDate
            }
            tokenMetadata
        }
        listings(where: { ticketId: $ticketId }) {
            items {
                price
                deadline
                state
                buyerId
                sellerId
            }
        }
    }
`;

export const GetEscrowDetails = `
    query GetTicketDetailsQuery($id: String!) {
        escrow(id: $id) {
            fundsLocked
            isDisputed
            isResolved
            ticketId
            id
            sellerId
            buyerId
        }
    }
`;
