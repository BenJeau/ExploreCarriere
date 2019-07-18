import { SET_PAYMENT_TYPE, SET_PAYMENT_NAME, SET_PAYMENT_NUMBER, SET_PAYMENT_CVV, SET_PAYMENT_YEAR, SET_PAYMENT_MONTH, SET_AVAILABILITY } from "./constants";

let defaultState = {
	paymentType: "",
	paymentMonth: "",
	paymentYear: "",
	fullName: "",
	cardNumber: "",
	cardCVV: "",
	selectedAvailability: 0
};

export default function UserReducer(state = defaultState, action) {
	switch (action.type) {
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

		default:
			return state;
	}
}
