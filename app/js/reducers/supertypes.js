import deepFreeze from 'deep-freeze';

const initialState = {
    knownTypes: new Set(),
    yes: {},
    no: {}
};

const mergeObjects = (from, to) => {
    const result = {
        ...to
    };
    for (const key of Object.keys(from)) {
        result[key] = new Set([
            ...from[key],
            ...(to[key] || [])
        ]);
    }
    return result;
};

const reducer = (state = initialState, action) => {
    deepFreeze(state);
    switch (action.type) {
    case 'MEMOIZE_SUBTYPE': {
        const newState = {
            ...state,
            yes: mergeObjects(action.results.yes, state.yes),
            no: mergeObjects(action.results.no, state.no)
        };
        return newState;
    }
    case 'FOUND_TYPES': {
        const newState = {
            ...state,
            knownTypes: new Set([
                ...state.knownTypes,
                ...action.typeList
            ])
        };
        return newState;
    }
    default: return state;
    }
};

export default reducer;