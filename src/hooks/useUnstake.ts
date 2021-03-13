import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
} from 'state/actions'
import { unstake, mangoUnstake, mangoEmegencyUnstake } from 'utils/callHelpers'
import { useMasterchef, useMangoChef } from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

const JUICEIDS = [5, 6, 3, 1, 22, 23]

export const useMangoUnstake = (mangoId) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const mangoChefContract = useMangoChef(mangoId)
  const isOldMango = JUICEIDS.includes(mangoId)

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (mangoId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account)
        console.info(txHash)
      } else if (isOldMango) {
        const txHash = await mangoEmegencyUnstake(mangoChefContract, amount, account)
        console.info(txHash)
      } else {
        const txHash = await mangoUnstake(mangoChefContract, amount, account)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(mangoId, account))
      dispatch(updateUserBalance(mangoId, account))
      dispatch(updateUserPendingReward(mangoId, account))
    },
    [account, dispatch, isOldMango, masterChefContract, mangoChefContract, mangoId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
