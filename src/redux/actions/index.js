import {
} from "../reducers/constants";

export const setJob = jobId => {
	return {
		type: "SET_JOB",
		jobId,
	};
};