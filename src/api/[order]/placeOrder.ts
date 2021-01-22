import { EHandler, Handler } from '../../utils/types';
import { v4 as UUID } from 'uuid';
import { validate as UUIDValidate } from 'uuid';
import { model } from '../../model';
import { body, inspectBuilder } from '../../utils/inspect';

/**
 * :: STEP 1
 * validating fields
 */

const inspector = inspectBuilder(
	body('customerId').exists().withMessage('Customer ID is required'),
	body('orderDate').exists().withMessage('Order Date is required'),
	body('orderItems').exists().withMessage('Order Items are required'),
	body('orderTotal').exists().withMessage('Order Total is required')
);

/**
 * :: STEP 2
 * Placing An Order
 * @param req body
 *      customerId
 *      orderDate
 *      orderItems
 * @param res
 *  message
 */

const addOrderDetails: Handler = async (req, res) => {
	const { r } = res;

	const customerId = req.body.customerId;
	if (!UUIDValidate(customerId)) {
		r.status
			.BAD_REQ()
			.message('Invalid Customer ID')
			.data({
				customerId
			})
			.send();
		return;
	}

	// Setup Data

	const orderData = {
		orderId: UUID(),
		customerId,
		orderStatus: model.order.status.PLACED,
		orderDate: req.body.orderDate
	};

	const orderItemsData = req.body.orderItems;

	//Add order id to all order items

	for (let item of orderItemsData) {
		item.orderId = orderData.orderId;
	}

	const invoiceData = {
		invoiceId: UUID(),
		orderId: orderData.orderId,
		invoiceDate: orderData.orderDate,
		invoiceTotal: req.body.orderTotal
	};

	// Sync model to database
    const error = await model.order.order.createOrderDataEntry(orderData, orderItemsData, invoiceData);
    
	
	if (error === model.ERR.NO_ERROR) {
		r.status
			.OK()
			.message('Success')
			.data({
				order: { order: orderData, orderItems: orderItemsData },
				invoice: invoiceData
			})
			.send();
		return;
	}

	r.prebuild.ISE().send();
};

/**
 * Request Handler Chain
 */
export default [ inspector, addOrderDetails as EHandler ];
