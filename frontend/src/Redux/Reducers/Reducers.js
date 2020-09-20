import * as types from "../Actions/actiontypes";

const Reducers = (state = {}, action) => {
  switch (action.type) {
    case types.BUCKETLIST:
      return Object.assign({}, state, {
        allBucketList: action.bucketList
      });
    default:
      return state;
  }
};

export default Reducers;
