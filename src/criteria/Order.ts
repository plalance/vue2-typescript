// -----------------------------------------------------------------------------------
/** Order direction */
export enum OrderDirection {
    ASC = "ASC",
    DESC = "DESC"
}

// -----------------------------------------------------------------------------------
/**
 * Order
 * @param column column
 * @param orderDirection
 * @constructor
 */
export class Order {

	/** Managed column (String : column name)*/
	column : string;

	/** Order direction */
	orderDirection = OrderDirection.ASC;

	/**
	 * Constructor
	 * @param column
	 * @param orderDirection
	 */
	constructor(column : string, orderDirection? : OrderDirection){
		this.column = column;

		/** Order direction */
		if (orderDirection == undefined)
			this.orderDirection = OrderDirection.ASC;
		else
			this.orderDirection = orderDirection;
	}
}
