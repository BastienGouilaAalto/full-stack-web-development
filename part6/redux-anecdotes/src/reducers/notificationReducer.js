import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    displayNotification: (state, action) => {
      return action.payload;
    },

    removeNotification: (state, action) => {
      return '';
    }
  },
})

const { displayNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(displayNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer
