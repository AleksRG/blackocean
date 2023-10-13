'use client'
import React, { useState, useEffect } from 'react'

interface NFTMetadata {
  [x: string]: string | undefined
  image: string
}

export function Metadata({ token }: { token: string }) {
  const apiKey = process.env.CG_API_KEY
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null)
  // Build the API endpoint URL
  const endpointUrl = `https://api.coingecko.com/api/v3/coins/${token}/contract/${token}`
  useEffect(() => {
    fetch(endpointUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // Authorization: `Bearer ${apiKey}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        setMetadata(data)
        console.log(data)
        console.log(`
        Symbol : ${data.symbol} /n
        Name : ${data.name}
        Asset platform id : ${data.asset_platform_id}
        Coingeco rank: ${data.coingecko_rank}
        Coingeco score: ${data.coingecko_score}
        Community score: ${data.community_score}
        Liquidit score: ${data.liquidity_score}
        Market data ATH USD: ${data.market_data.ath.usd}
        Market data ATH change percentage USD: ${data.market_data.ath_change_percentage.usd}
        Market data ATH date USD: ${data.market_data.ath_date.usd}
        Market data ATL USD: ${data.market_data.atl.usd}
        Market data current price USD: ${data.market_data.current_price.usd}
        Market data ATL date USD: ${data.market_data.atl_date.usd}
        Market data fully diluted valuation USD: ${data.market_data.fully_diluted_valuation.usd}
        Market data high 24h USD: ${data.market_data.high_24h.usd}
        Market data low 24h USD: ${data.market_data.low_24h.usd}
        Market data price change 24h in USD: ${data.market_data.price_change_24h_in_currency.usd}
        Market data price change percentage 1h in USD: ${data.market_data.price_change_percentage_1h_in_currency.usd}
        Market data price change percentage 1y: ${data.market_data.price_change_percentage_1y}
        Market data price change percentage 1y in USD: ${data.market_data.price_change_percentage_1y_in_currency.usd}
        Market data price change percentage 7d: ${data.market_data.price_change_percentage_7d}
        Market data price change percentage 7d in USD: ${data.market_data.price_change_percentage_7d_in_currency.usd}
        Market data price change percentage 14d: ${data.market_data.price_change_percentage_14d}
        Watchlist portfolio users: ${data.watchlist_portfolio_users}
        Project is on these categories: ${data.categories}
`)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [])

  return <div className="mt-10"></div>
}
