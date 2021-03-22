
export const SET_DATA = '[NHL] NHL_SET_DATA';
export const SINGLE_DATA = '[NHL] NHL_SINGLE_DATA';

export function setData(payload) {
    return dispatch => dispatch({ type: SET_DATA, payload });
}

export function getSingleData(payload) {
    return (dispatch, getState) => {
        const { data = [] } = getState()?.nhl || {};

        const { id: selectedDataId = '' } = payload || {};
        if (data?.length) {
            const [selectedData] = data?.filter(_data => _data?.id === selectedDataId);
            return selectedData;
        }
    }
}