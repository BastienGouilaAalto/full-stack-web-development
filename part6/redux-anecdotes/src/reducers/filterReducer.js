const initialState = ''

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
        return action.data.filter
        default:
        return state
    }
}

export const filterChange = (filter) => {
    return {
        type: 'FILTER',
        data: { filter }
    }
}

export default filterReducer