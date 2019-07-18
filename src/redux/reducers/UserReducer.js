import { SET_PAYMENT_TYPE, SET_PAYMENT_NAME, SET_PAYMENT_NUMBER, SET_PAYMENT_CVV, SET_PAYMENT_YEAR, SET_PAYMENT_MONTH, SET_AVAILABILITY, SET_JOB, ADD_APPLIED_JOB } from "./constants";

let defaultState = {
	paymentType: "",
	paymentMonth: "",
	paymentYear: "",
	fullName: "",
	cardNumber: "",
	cardCVV: "",
	selectedAvailability: 0,
	jobId: 0,
	appliedJobs: []
};

export default function UserReducer(state = defaultState, action) {
	console.log(action);
	switch (action.type) {
		case ADD_APPLIED_JOB:
			return {
				...state,
				appliedJobs: [
					...state.appliedJobs,
					action.appliedJob
				]
			};

		case SET_PAYMENT_TYPE:
			return {
				...state,
				paymentType: action.paymentType
			};

		case SET_PAYMENT_NAME:
			return {
				...state,
				fullName: action.fullName
			};

		case SET_PAYMENT_NUMBER:
			return {
				...state,
				cardNumber: action.cardNumber
			};

		case SET_PAYMENT_CVV:
			return {
				...state,
				cardCVV: action.cardCVV
			};

		case SET_PAYMENT_MONTH:
			return {
				...state,
				paymentMonth: action.paymentMonth
			};

		case SET_PAYMENT_YEAR:
			return {
				...state,
				paymentYear: action.paymentYear
			};

		case SET_AVAILABILITY:
			return {
				...state,
				selectedAvailability: action.selectedAvailability
			};

		case SET_JOB:
			return {
				...state,
				jobId: action.jobId
			};

		default:
			return state;
	}
}
