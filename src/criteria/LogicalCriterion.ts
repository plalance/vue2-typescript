import {Criterion, CriterionTypeEnum} from "./Criteria";
import {TypeUtils} from "../utils/TypeUtils";

// -----------------------------------------------------------------------------------
/** LogicalCriterionOperator : can be AND or OR */
export enum LogicalCriterionOperator {
    AND = "AND",
    OR = "OR"
}

// -----------------------------------------------------------------------------------
/**
 * Handle logical criterion. A logical criterion is SimpleCriterion* + LogicalOperatorr
 */
export class LogicalCriterion {

	/** Class type */
	type : CriterionTypeEnum = CriterionTypeEnum.LOGICAL;

	/** First criterion */
	firstCriterion : Criterion;

	/** other criterion */
	otherCriterion : Criterion;

	/** Logical operator */
	operator : LogicalCriterionOperator;


	/**
	 * Constructor
	 * @param {} firstCriterion
	 * @param {LogicalCriterionOperator} operator
	 * @param {} otherCriterion
	 */
	constructor(firstCriterion : Criterion, operator : LogicalCriterionOperator, otherCriterion : Criterion){

		/** First criterion */
		this.firstCriterion = firstCriterion;

		/** other criterion */
		this.otherCriterion = otherCriterion;

		/** Logical operator */
		this.operator = operator;
	}

	/**
	 * Create a OR criterion expression
	 *
	 * @param firstCriterion
	 *            firstCriterion
	 * @param otherCriterion
	 *            otherCriterion
	 * @return LogicalCriterion
	 */
	static or = (firstCriterion : Criterion, otherCriterion : Criterion) : LogicalCriterion => {
		if (TypeUtils.isEmpty(firstCriterion) || TypeUtils.isEmpty(otherCriterion))
			return null;

		return new LogicalCriterion(firstCriterion, LogicalCriterionOperator.OR, otherCriterion);
	}

	/**
	 * Create a OR criterion expression
	 *
	 * @param firstCriterion
	 *            firstCriterion
	 * @param otherCriterion
	 *            otherCriterion
	 * @return LogicalCriterion
	 */
	static and = (firstCriterion : Criterion, otherCriterion : Criterion) : LogicalCriterion => {
		if (TypeUtils.isEmpty(firstCriterion) || TypeUtils.isEmpty(otherCriterion))
			return null;

		return new LogicalCriterion(firstCriterion, LogicalCriterionOperator.AND, otherCriterion);
	}
}
