/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import poolsConfig from 'config/constants/pools'
import { fetchPoolsBlockLimits, fetchPoolsTotalStatking } from './fetchPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchPoolsUser'
import { PoolsState, Pool } from '../types'

const initialState: PoolsState = { data: [...poolsConfig] }

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.mangoId === pool.mangoId)
        return { ...pool, ...livePoolData }
      })
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.mangoId === pool.mangoId)
        return { ...pool, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, mangoId } = action.payload
      const index = state.data.findIndex((p) => p.mangoId === mangoId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData } = PoolsSlice.actions

// Thunks
export const fetchPoolsPublicDataAsync = () => async (dispatch) => {
  const blockLimits = await fetchPoolsBlockLimits()
  const totalStakings = await fetchPoolsTotalStatking()

  const liveData = poolsConfig.map((pool) => {
    const blockLimit = blockLimits.find((entry) => entry.mangoId === pool.mangoId)
    const totalStaking = totalStakings.find((entry) => entry.mangoId === pool.mangoId)
    return {
      ...blockLimit,
      ...totalStaking,
    }
  })

  dispatch(setPoolsPublicData(liveData))
}

export const fetchPoolsUserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  const stakingTokenBalances = await fetchUserBalances(account)
  const stakedBalances = await fetchUserStakeBalances(account)
  const pendingRewards = await fetchUserPendingRewards(account)

  const userData = poolsConfig.map((pool) => ({
    mangoId: pool.mangoId,
    allowance: allowances[pool.mangoId],
    stakingTokenBalance: stakingTokenBalances[pool.mangoId],
    stakedBalance: stakedBalances[pool.mangoId],
    pendingReward: pendingRewards[pool.mangoId],
  }))

  dispatch(setPoolsUserData(userData))
}

export const updateUserAllowance = (mangoId: string, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  dispatch(updatePoolsUserData({ mangoId, field: 'allowance', value: allowances[mangoId] }))
}

export const updateUserBalance = (mangoId: string, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account)
  dispatch(updatePoolsUserData({ mangoId, field: 'stakingTokenBalance', value: tokenBalances[mangoId] }))
}

export const updateUserStakedBalance = (mangoId: string, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  dispatch(updatePoolsUserData({ mangoId, field: 'stakedBalance', value: stakedBalances[mangoId] }))
}

export const updateUserPendingReward = (mangoId: string, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  dispatch(updatePoolsUserData({ mangoId, field: 'pendingReward', value: pendingRewards[mangoId] }))
}

export default PoolsSlice.reducer
