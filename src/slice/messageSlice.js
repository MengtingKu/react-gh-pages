import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
    name: 'message',
    initialState: [],
    reducers: {
        createMessage: (state, action) => {
            if (action.payload.success) {
                state.push({
                    id: action.payload.id,
                    icon: 'circle-check',
                    text: action.payload.message,
                    type: 'primary',
                });
            } else {
                state.push({
                    id: action.payload.id,
                    icon: 'circle-xmark',
                    text: Array.isArray(action.payload.message)
                        ? action.payload.message.join(', ')
                        : action.payload.message,
                    type: 'danger',
                });
            }
        },
        removeMessage: (state, action) => {
            const index = state.findIndex(item => item === action.payload);
            state.splice(index, 1);
        },
    },
});

export const createAsyncMessage = createAsyncThunk(
    'message/createAsyncMessage',
    async (payload, { dispatch, requestId }) => {
        dispatch(
            messageSlice.actions.createMessage({
                ...payload,
                id: requestId,
            })
        );
        setTimeout(() => {
            dispatch(messageSlice.actions.removeMessage(requestId));
        }, 2000);
    }
);

export const { createMessage } = messageSlice.actions;

export default messageSlice.reducer;
