import { usePriceMangoBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalMango = getBalanceNumber(totalRewards)
  const mangoPriceBusd = usePriceMangoBusd()

  return totalMango * mangoPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
