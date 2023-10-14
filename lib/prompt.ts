interface CryptoData {
  contract_address: string
  name: string
  symbol: string
  asset_platform_id: string
  coingecko_rank: number
  coingecko_score: number
  community_score: number
  liquidity_score: number
  market_data: {
    price_change_percentage_14d: any
    price_change_percentage_7d: any
    atl_date: any
    price_change_percentage_1y: any
    price_change_percentage_1y_in_currency: any
    low_24h: any
    price_change_24h_in_currency: any
    high_24h: any
    price_change_percentage_7d_in_currency: any
    price_change_percentage_1h_in_currency: any
    fully_diluted_valuation: any
    current_price: any
    atl: any
    ath: {
      usd: number
    }
    ath_change_percentage: {
      usd: number
    }
    ath_date: {
      usd: string // You might need to change the type to a more appropriate date type
    }
    // Define other properties here
  }
  watchlist_portfolio_users: number
  categories: string[]
  // Define other properties here
}
export async function prompt(data: CryptoData): Promise<any> {
  return `
  Please provide insights on the following cryptocurrency token:
  
  Name: ${data.name} (${data.symbol})
  - Asset Platform ID: ${data.asset_platform_id}
  - CoinGecko Rank: ${data.coingecko_rank}
  - CoinGecko Score: ${data.coingecko_score}
  - Community Score: ${data.community_score}
  - Liquidity Score: ${data.liquidity_score}
  - All-Time High (USD): ${data.market_data.ath.usd}
  - Change in All-Time High (USD): ${data.market_data.ath_change_percentage.usd}%
  - Date of All-Time High (USD): ${data.market_data.ath_date.usd}
  - All-Time Low (USD): ${data.market_data.atl.usd}
  - Current Price (USD): ${data.market_data.current_price.usd}
  - Date of All-Time Low (USD): ${data.market_data.atl_date.usd}
  - Fully Diluted Valuation (USD): ${data.market_data.fully_diluted_valuation.usd}
  - High in the Last 24 Hours (USD): ${data.market_data.high_24h.usd}
  - Low in the Last 24 Hours (USD): ${data.market_data.low_24h.usd}
  - Price Change in the Last 24 Hours (USD): ${data.market_data.price_change_24h_in_currency.usd}
  - Price Change in the Last 1 Hour (USD): ${data.market_data.price_change_percentage_1h_in_currency.usd}%
  - Price Change in the Last 1 Year: ${data.market_data.price_change_percentage_1y}%
  - Price Change in the Last 1 Year (USD): ${data.market_data.price_change_percentage_1y_in_currency.usd}%
  - Price Change in the Last 7 Days: ${data.market_data.price_change_percentage_7d}%
  - Price Change in the Last 7 Days (USD): ${data.market_data.price_change_percentage_7d_in_currency.usd}%
  - Price Change in the Last 14 Days: ${data.market_data.price_change_percentage_14d}%
  - Watchlist Portfolio Users: ${data.watchlist_portfolio_users}
  - Categories: ${data.categories}
  
  Please provide your insights regarding the token's performance and potential based on the above information.
  `
}
