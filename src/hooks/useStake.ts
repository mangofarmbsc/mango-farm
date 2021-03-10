import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stake, juiceStake, juiceStakeBnb } from 'utils/callHelpers'
import { useMasterchef, useJuiceChef } from './useContract'

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

export const useJuiceStake = (juiceId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const juiceChefContract = useJuiceChef(juiceId)

  const handleStake = useCallback(
    async (amount: string) => {
      if (juiceId === 0) {
        await stake(masterChefContract, 0, amount, account)
      } else if (isUsingBnb) {
        await juiceStakeBnb(juiceChefContract, amount, account)
      } else {
        await juiceStake(juiceChefContract, amount, account)
      }
      dispatch(updateUserStakedBalance(juiceId, account))
      dispatch(updateUserBalance(juiceId, account))
    },
    [account, dispatch, isUsingBnb, masterChefContract, juiceChefContract, juiceId],
  )

  return { onStake: handleStake }
}

export default useStake
