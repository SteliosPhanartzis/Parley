import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    serverId: null,
    serverName: null,
    channelId: null,
    channelName: null,
    membersList: []
  },
  reducers: {
    setServerInfo: (state, action) => {
      state.serverId = action.payload.serverId;
      state.serverName = action.payload.serverName;
      state.channelId = null;
      state.channelName = null;
    },
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
    setMembersList: (state, action) => {
      state.membersList += action.payload.membersList;
    }
  },
});

export const { setServerInfo, setChannelInfo, setMembersList} = appSlice.actions;

export const selectServerId = state => state.app.serverId;
export const selectServerName = state => state.app.serverName;
export const selectChannelId = state => state.app.channelId;
export const selectChannelName = state => state.app.channelName;
export const selectMembersList = state => state.app.membersList;

export default appSlice.reducer;
