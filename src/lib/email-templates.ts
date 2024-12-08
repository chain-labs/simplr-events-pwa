export interface SellerEmailData {
  sellerName: string;
  buyerName: string;
  tokenId: string;
  orderNumber: string;
  buyerEmailId: string;
  sellerEmailId: string;
  devconEmail: string;
  expiryHours: number;
}

// src/lib/email-templates.ts
export const getSellerEmailTemplate = ({
  sellerName,
  buyerName,
  tokenId,
  orderNumber,
  buyerEmailId,
  sellerEmailId,
  devconEmail,
  expiryHours,
}: SellerEmailData) => {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
          }
          .header {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 5px;
              margin-bottom: 20px;
          }
          .content {
              background-color: #ffffff;
              padding: 20px;
          }
          .email-template {
              background-color: #f8f9fa;
              padding: 15px;
              border-left: 3px solid #007bff;
              margin: 20px 0;
          }
          .important-notes {
              background-color: #fff3cd;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
          }
          .next-steps {
              background-color: #e8f4f8;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
          }
          .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #dee2e6;
              font-size: 0.9em;
          }
          ul {
              padding-left: 20px;
          }
          .highlight {
              color: #007bff;
          }
          .warning {
              color: #dc3545;
          }
      </style>
  </head>
  <body>
      <div class="header">
          <h2>Your Ticket Has Been Sold - Action Required for Transfer</h2>
      </div>
      
      <div class="content">
          <p>Dear ${sellerName},</p>
          
          <p>Great news! Your Taipei Blockchain Week ticket (Token ID: <span class="highlight">${tokenId}</span>) has been successfully sold on our platform. The buyer (<span class="highlight">${buyerEmailId}</span>) is eagerly waiting to receive the ticket.</p>
          
          <p>To complete this transaction and receive your payment, please follow these steps:</p>
          
          <p>1. Send an email to <span class="highlight">${buyerEmailId}</span> with the following message:</p>
          
          <div class="email-template">
              Hey ${buyerName},<br><br>
              To claim your ticket, please go to <a href="https://app.moongate.id/e/taipei-blockchain-week-2024/checkout/326c01f3-fcae-4381-b8b1-3c1080c643e4?utm_source=discover&eventId=taipei-blockchain-week-2024" target="_blank" rel="noreferrer">this link</a>.<br><br>
              Paste this redeem code in the "Redeem Code" field to claim your ticket:<br>
              <<-enter redeem code here->><br><br>

              Thanks for buying the ticket. Enjoy the event!<br><br>
          </div>
          
          <div class="important-notes">
              <strong>Important Notes:</strong>
              <ul>
                  <li>Make sure to send redeem code for the correct ticket.</li>
                  <li>Keep all the ticket details and order numbers handy in any case.</li>
              </ul>
          </div>
          
          <div class="next-steps">
              <strong>Next Steps:</strong>
              <ol>
                  <li>Once the buyer redeems the ticket, they will then mark the order as finalized in our system</li>
                  <li>Upon confirmation, your payment will be processed and sent to your registered account</li>
                  <li>If they don't mark the order as finalized even after redeeming the ticket, please dispute the transaction on this <a href="https://taipei.simplrhq.com/ticket/ticket-0x7D41caDC4Ad09Af751BdA042ca78EE1d1F282CBD-3" target="_blank" rel="noreferrer">link</a></li>
              </ol>
          </div>
          
          <p>If you have any questions or need assistance with the transfer process, please don't hesitate to contact our team  <span><a href="https://t.me/+oXNaYmx7iwY3NjU1" target="_blank">Telegram</a></span>).</p>
          
          <div class="footer">
              <p>Best regards,<br>Simplr Events Team</p>
              
              <p class="warning">Note: This transaction must be completed within ${expiryHours} hours to avoid any delays or cancellations.</p>
          </div>
      </div>
  </body>
  </html>
    `;

  // Also include a text version for email clients that don't support HTML
  const text = `Dear ${sellerName},
  
  Great news! Your Devcon ticket (Token ID: ${tokenId}) has been successfully sold on our platform. The buyer (${buyerEmailId}) is eagerly waiting to receive the ticket.
  
  To complete this transaction and receive your payment, please follow these steps:
  
  1. Send an email to ${devconEmail} with the following message:
  
  Hey Devcon team,
  
  I won't be able to able to attend the conference and I would like to transfer the tickets to my acquaintance with whom I was introduced to by Simplr Events team. Find details below:
  
  Ticket owner email ID: ${sellerEmailId}
  New Ticket Owner email ID: ${buyerEmailId}
  Order number: *${orderNumber}*
  
  Thanks for understanding the situation.
  
  Important Notes:
  - Make sure to include your original ticket order number in the email
  - The transfer must be initiated from your registered email address
  - Keep all the ticket details and order numbers handy
  
  Next Steps:
  1. Once Devcon processes your transfer request, the ticket will be transferred to the buyer
  2. The buyer will then mark the order as finalized in our system
  3. Upon confirmation, your payment will be processed and sent to your registered account
  
  If you have any questions or need assistance with the transfer process, please don't hesitate to contact our team (telegram: https://t.me/+oXNaYmx7iwY3NjU1).
  
  Best regards,
  Simplr Events Team
  
  Note: This transaction must be completed within ${expiryHours} hours to avoid any delays or cancellations.`;

  return {
    subject: "Your Ticket Has Been Sold - Action Required for Transfer",
    html,
    text,
  };
};
