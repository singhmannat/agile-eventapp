//const activityReducerDefaultState = [];
const ActivityReducer = (state = { activityname: "" }, action) => {
  switch (action.type) {
    case "ADD_ACTIVITY":
      return [...state, action.activityname];
    default:
      return state;
  }
};

export default ActivityReducer;
