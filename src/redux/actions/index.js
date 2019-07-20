import {
	SET_PAYMENT_TYPE,
	SET_PAYMENT_NAME, 
	SET_PAYMENT_NUMBER, 
	SET_PAYMENT_CVV, 
	SET_PAYMENT_MONTH, 
	SET_PAYMENT_YEAR, 
	SET_AVAILABILITY, 
	SET_JOB, 
	ADD_APPLIED_JOB
} from "../reducers/constants";

// Tout les fonctions dans ce fichier sont des fonctions
// d'aide pour faire des modification à l'état de Redux

/**
 * Sauvegarde le type de paiement
 * 
 * @param {String} paymentType Soit paypal, credit ou debit
 */
const setPaymentType = paymentType => {
	return {
		type: SET_PAYMENT_TYPE,
		paymentType,
	};
};

/**
 * Sauvegarde le nom de la personne pour le paiment
 * 
 * @param {String} fullName Nom au complet de la personne
 */
const setPaymentName = fullName => {
	return {
		type: SET_PAYMENT_NAME,
		fullName,
	};
};

/**
 * Sauvegarde le numéro de carte du paiement
 * 
 * @param {Number} cardNumber Le numéro de la carte de débit ou de crédit
 */
const setPaymentNumber = cardNumber => {
	return {
		type: SET_PAYMENT_NUMBER,
		cardNumber,
	};
};

/**
 * Sauvegarde le code CVV du paiement
 * 
 * @param {Number} cardCVV Le code CVV de la carte de crédit
 */
const setPaymentCVV = cardCVV => {
	return {
		type: SET_PAYMENT_CVV,
		cardCVV,
	};
};

/**
 * Sauvegarde le mois d'expiration de la carte de paiement
 * 
 * @param {Number} paymentMonth Le mois en chiffre (M)
 */
const setPaymentMonth = paymentMonth => {
	return {
		type: SET_PAYMENT_MONTH,
		paymentMonth,
	};
};

/**
 * Sauvegarde l'année d'expiration de la carte de paiement
 * 
 * @param {Number} paymentYear L'année en chiffre (YYYY)
 */
const setPaymentYear = paymentYear => {
	return {
		type: SET_PAYMENT_YEAR,
		paymentYear,
	};
};

/**
 * Sauvegarde le index de disponibilité
 * 
 * @param {Number} selectedAvailability L'index de la disponibilité dans le tableau
 */
const setAvailability = selectedAvailability => {
	return {
		type: SET_AVAILABILITY,
		selectedAvailability,
	};
};

/**
 * Sauvegarde le id de l'emploi en cours d'être sélectionné
 * 
 * @param {Number} jobId Le id de l'emploi
 */
const setJob = jobId => {
	return {
		type: SET_JOB,
		jobId,
	};
};

/**
 * Ajoute un emploi que l'utilisateur a appliqué
 * 
 * @param {Object} appliedJob Objet contenant, le id de l'emploi et l'index de la disponibilité
 */
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