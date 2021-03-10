import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stake, mangoStake, mangoStakeBnb } from 'utils/callHelpers'
import { useMasterchef, useMangoChef } from './useContract'

const useStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const useMangoStake = (mangoId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const mangoChefContract = useMangoChef(mangoId)

  const handleStake = useCallback(
    async (amount: string) => {
      if (mangoId === 0) {
        await stake(masterChefContract, 0, amount, account)
      } else if (isUsingBnb) {
        await mangoStakeBnb(mangoChefContract, amount, account)
      } else {
        await mangoStake(mangoChefContract, amount, account)
      }
      dispatch(updateUserStakedBalance(mangoId, account))
      dispatch(updateUserBalance(mangoId, account))
    },
    [account, dispatch, isUsingBnb, masterChefContract, mangoChefContract, mangoId],
  )

  return { onStake: handleStake }
}

export default useStake
