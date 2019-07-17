let defaultState = {
};

export default function UserReducer(state = defaultState, action) {
	switch (action.type) {
		case "SET_JOB":
			state.jobId = action.jobId;
			return state;
		default:
			return state;
	}
}
