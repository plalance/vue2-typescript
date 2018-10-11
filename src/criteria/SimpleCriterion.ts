import {CriterionTypeEnum} from "./Criteria";
import {CriterionOperator} from "./CriterionOperator";
import {TypeUtils} from "../utils/TypeUtils";

// -----------------------------------------------------------------------------------

/**
 * Simple Criterion
 */
export class SimpleCriterion {

    /** Class type */
    type = CriterionTypeEnum.SIMPLE;

    /** Managed columns */
    column : string;

    /** Operator */
    operator : CriterionOperator;

    /** values */
    listValues : Array<any> = [];

    /** Ignore case ? */
    ignoreCase = false;

    /** Negate criterion */
    negate = false;


	/**
	 * Constructor
	 * @param column
	 * @param operator
	 * @param values
	 */
    constructor(column : string, operator : CriterionOperator, values? : any){
		this.column = column;
		this.operator = operator;

    	// Set values
		if (Array.isArray(values))
			this.listValues = values;

		else if (values != undefined)
			this.listValues.push(values);
	}


    /**
     * Set ignoreCase
     *
     * @param ignoreCase
     *            the ignoreCase to set
     */
    public setIgnoreCase = (ignoreCase) : SimpleCriterion =>  {
        this.ignoreCase = ignoreCase;
        return this;
    }

    /**
     * @param negate
     *            the negate to set
     */
    public setNegate = (negate) : SimpleCriterion => {
        this.negate = negate;
        return this;
    }

    /**
     * @param values
     *            the values to set
     */
    public setValues = (values) : SimpleCriterion => {
        this.listValues = values;
        return this;
    }

	// -----------------------------------------------------------------------
	// Methods used to create criterion
	// -----------------------------------------------------------------------

	/**
	 * Add an equals condition on a column
	 *
	 * @param column
	 *            managed column
	 * @param values
	 *            values
	 * @return SimpleCriterion
	 */
	static addEquals = (column : string, values : any)  : SimpleCriterion =>  {
		if (TypeUtils.isEmpty(values))
			return null;
		return new SimpleCriterion(column, CriterionOperator.EQUALS, values);
	}

	/**
	 * Add a greater (strictly) condition on a column
	 *
	 * @param column
	 *            managed column
	 * @param values
	 *            values
	 * @return SimpleCriterion
	 */
	static addGreater = (column : string, values : any) : SimpleCriterion =>  {
		if (TypeUtils.isEmpty(values))
			return null;
		return new SimpleCriterion(column, CriterionOperator.GREATER, values);
	}

	/**
	 * Add a greater or equal condition on a column
	 *
	 * @param column
	 *            managed column
	 * @param values
	 *            values
	 * @return SimpleCriterion
	 */
	static addGreaterEquals = (column : string, values : any) : SimpleCriterion =>  {
		if (TypeUtils.isEmpty(values))
			return null;
		return new SimpleCriterion(column, CriterionOperator.GREATER_EQUALS, values);
	}

	/**
	 * Add a less (strictly) condition on a column
	 *
	 * @param column
	 *            managed column
	 * @param values
	 *            values
	 * @return SimpleCriterion
	 */
	static addLess = (column : string, values : any) : SimpleCriterion =>  {
		if (TypeUtils.isEmpty(values))
			return null;
		return new SimpleCriterion(column, CriterionOperator.LESS, values);
	}

	/**
	 * Add a less or equals condition on a column
	 *
	 * @param column
	 *            managed column
	 * @param values
	 *            values
	 * @return SimpleCriterion
	 */
	static addLessEquals = (column : string, values : any) : SimpleCriterion =>  {
		if (TypeUtils.isEmpty(values))
			return null;
		return new SimpleCriterion(column, CriterionOperator.LESS_EQUALS, values);
	}

	/**
	 * Add a "different off" (not equal) condition on a column
	 *
	 * @param column
	 *            managed column
	 * @param values
	 *            values
	 * @return SimpleCriterion
	 */
	static addNotEquals = (column : string, values : any) : SimpleCriterion =>  {
		if (TypeUtils.isEmpty(values))
			return null;
		var notEqualsCriterion = SimpleCriterion.addEquals(column, values);
		return notEqualsCriterion.setNegate(true);
	}

	/**
	 * Add a "like" condition on a column. The jocker char is '%'
	 *
	 * @param column
	 *            managed column
	 * @param values
	 *            values
	 * @return SimpleCriterion
	 */
	static addLike = (column : string, values : any) : SimpleCriterion =>  {
		if (TypeUtils.isEmpty(values))
			return null;
		return new SimpleCriterion(column, CriterionOperator.LIKE, values);
	}

	/**
	 * Add a "ilike" condition on a column. The jocker char is '%'
	 *
	 * @param column
	 *            managed column
	 * @param values
	 *            values
	 * @return SimpleCriterion
	 */
	static addLikeIgnoreCase = (column : string, values : any) : SimpleCriterion =>  {
		if (TypeUtils.isEmpty(values))
			return null;
		return SimpleCriterion.addLike(column, values).setIgnoreCase(true);
	}

	/**
	 * Add a "in" condition on a column
	 *
	 * @param column
	 *            managed column
	 * @param values
	 *            values
	 * @return SimpleCriterion
	 */
	static addIn = (column : string, values : any) : SimpleCriterion =>  {
		if (TypeUtils.isEmpty(values))
			return null;
		return new SimpleCriterion(column, CriterionOperator.IN, values);
	}

	/**
	 * Add a "not in" condition on a column
	 *
	 * @param column
	 *            managed column
	 * @param values
	 *            values
	 * @return SimpleCriterion
	 */
	static addNotIn = (column : string, values : any) : SimpleCriterion =>  {
		if (TypeUtils.isEmpty(values))
			return null;

		var criterion = SimpleCriterion.addIn(column, values);
		return criterion.setNegate(true);
	}

	/**
	 * Add a "is null" condition on a column
	 *
	 * @param column
	 *            managed column
	 * @return SimpleCriterion
	 */
	static addIsNull = (column : string) : SimpleCriterion =>  {
		return new SimpleCriterion(column, CriterionOperator.IS_NULL);
	}

	/**
	 * Add a "is not null" condition on a column
	 *
	 * @param column
	 *            managed column
	 * @return SimpleCriterion
	 */
	static addIsNotNull = (column : string) : SimpleCriterion =>  {
		var criterion = SimpleCriterion.addIsNull(column);
		return criterion.setNegate(true);
	}

};

