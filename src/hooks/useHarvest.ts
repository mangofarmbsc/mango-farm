import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { mangohHarvest, mangohHarvestBnb, harvest } from 'utils/callHelpers'
import { useMasterchef, useMangoChef } from './useContract'

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChefContract, pid, account)]
    }, [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChefContract])

  return { onReward: handleHarvest }
}

export const useMangoHarvest = (juiceId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const mangoChefContract = useMangoChef(juiceId)
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    if (juiceId === 0) {
      await harvest(masterChefContract, 0, account)
    } else if (isUsingBnb) {
      await mangohHarvestBnb(mangoChefContract, account)
    } else {
      await mangohHarvest(mangoChefContract, account)
    }
    dispatch(updateUserPendingReward(juiceId, account))
    dispatch(updateUserBalance(juiceId, account))
  }, [account, dispatch, isUsingBnb, masterChefContract, mangoChefContract, juiceId])

  return { onReward: handleHarvest }
}
