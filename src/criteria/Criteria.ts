// -----------------------------------------------------------------------------------
/** Criterion type  */
import {LogicalCriterion} from "./LogicalCriterion";
import {SimpleCriterion} from "./SimpleCriterion";
import {Order, OrderDirection} from "./Order";


// -----------------------------------------------------------------------------------
/** Define a Criterion */
export enum CriterionTypeEnum {
	SIMPLE = "simple",
	LOGICAL = "logical"
};

export type Criterion = LogicalCriterion | SimpleCriterion

// -----------------------------------------------------------------------------------
/**
 * Criteria object
 * @constructor
 */
export class Criteria {

	/** List criterions */
	listCriterion : Array<Criterion> = [];

	/** List order */
	listOrder : Array<Order> = [];

	/**
	 * Constructor
	 * @param {string} code
	 */
	constructor() {
	}


    // -----------------------------------------------------------------------------------

    /**
     * Remove criterion from column. Work only with a SimpleCriterion.
     *
     * @param column
     *            Column
     * @return Criterion removed
     */
    removeCriterion = (column : string) : Criterion => {
        var removedCriterion = null;

        for (var i = 0; i < this.listCriterion.length; i++) {
            var criterion = this.listCriterion[i];
            // Handle only simple criterion
            if (criterion.type == CriterionTypeEnum.SIMPLE) {
                if ((<SimpleCriterion>criterion).column == column) {
                    this.listCriterion.splice(i, 1);
                    removedCriterion = criterion;
                }
            }
        }

        return removedCriterion;
    }

    // -----------------------------------------------------------------------
    // Orders columns
    // -----------------------------------------------------------------------

    /**
     * Add column order DESC
     *
     * @param column
     *            column to sort
     */
    addOrderByDesc = (column : string) => {
        this.addOrder(column, OrderDirection.DESC);
    }

    /**
     * Add column order ASC
     *
     * @param column
     *            Column
     */
    addOrderByAsc = (column : string) => {
        this.addOrder(column, OrderDirection.ASC);
    }

    /**
     * Get order for a column. Return null if no order is set
     *
     * @param column
     *            column
     * @return Order
     */
    getOrder = (column : string) : Order => {
		for (var i = 0; i < this.listOrder.length; i++) {
			var order = this.listOrder[i];
			if (order.column == column) {
				return order;
			}
		}

        return null;
    }

    /**
     * Get number of ordered columns
     *
     * @return int
     */
    getOrderCount = () : number => {
        return this.listOrder.length;
    }

    /**
     * Remove order for column.
     *
     * @param column
     *            column
     * @return Order removed
     */
    removeOrder = (column : string) : Order => {

        for (var i = 0; i < this.listOrder.length; i++) {
            var order = this.listOrder[i];
            if (order.column == column) {
                this.listOrder.splice(i, 1);
                return order;
            }
        }

        return null;
    }

    /**
     * Remove all orders criterion
     *
     * @return List of removed orders
     */
    removeListOrder = () : Array<Order> => {
        var listRemovedOrder = this.listOrder;
        this.listOrder = [];

        return listRemovedOrder;
    }

    /**
     * Get number of criterion
     */
    getCriteriaCount = () : number => {
        return this.listCriterion.length;
    }

    // -----------------------------------------------------------------------
    // Usefull methods
    // -----------------------------------------------------------------------

    /**
     * Add a criterion
     *
     * @param criterion
     *            criterion
     * @return Criteria
     */
    add = (criterion) : Criteria => {
        if (criterion == undefined || criterion == null) {
            return this;
        }

        // Add criterion to list
        this.listCriterion.push(criterion);

        return this;
    }

    /**
     * Add order
     *
     * @param column
     *            column
     * @param orderDirection
     *            order direction
     * @return Criteria
     */
    addOrder = (column, orderDirection) : Criteria => {
        if (column == undefined) {
            return this;
        }

        // Add order to list
        this.listOrder.push(new Order(column, orderDirection));

        return this;
    }


};

