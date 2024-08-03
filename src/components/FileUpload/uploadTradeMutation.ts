import { gql } from '@apollo/client';

const UPLOAD_TRADE = gql`
  mutation UploadTrade(
    $userId: ID!
    $stockSymbol: String!
    $tradeType: String!
    $quantity: Int!
    $price: Float!
    $tradeDate: String!
  ) {
    uploadTrade(
      userId: $userId
      stockSymbol: $stockSymbol
      tradeType: $tradeType
      quantity: $quantity
      price: $price
      tradeDate: $tradeDate
    ) {
      id
    }
  }
`;

export default UPLOAD_TRADE;
