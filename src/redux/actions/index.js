import { SET_PAYMENT_TYPE, SET_PAYMENT_NAME, SET_PAYMENT_NUMBER, SET_PAYMENT_CVV, SET_PAYMENT_MONTH, SET_PAYMENT_YEAR, SET_AVAILABILITY, SET_JOB, ADD_APPLIED_JOB } from "../reducers/constants";

const setPaymentType = paymentType => {
	return {
		type: SET_PAYMENT_TYPE,
		paymentType,
	};
};

const setPaymentName = fullName => {
	return {
		type: SET_PAYMENT_NAME,
		fullName,
	};
};

const setPaymentNumber = cardNumber => {
	return {
		type: SET_PAYMENT_NUMBER,
		cardNumber,
	};
};

const setPaymentCVV = cardCVV => {
	return {
		type: SET_PAYMENT_CVV,
		cardCVV,
	};
};

const setPaymentMonth = paymentMonth => {
	return {
		type: SET_PAYMENT_MONTH,
		paymentMonth,
	};
};

const setPaymentYear = paymentYear => {
	return {
		type: SET_PAYMENT_YEAR,
		paymentYear,
	};
};

const setAvailability = selectedAvailability => {
	return {
		type: SET_AVAILABILITY,
		selectedAvailability,
	};
};

const setJob = jobId => {
	return {
		type: SET_JOB,
		jobId,
	};
};

const addAppliedJob = appliedJob => {
	return {
		type: ADD_APPLIED_JOB,
		appliedJob,
	};
};

export {
	setPaymentType,
	setPaymentName,
	setPaymentCVV,
	setPaymentMonth,
	setPaymentYear,
	setPaymentNumber,
	setAvailability,
	setJob,
	addAppliedJob,
}