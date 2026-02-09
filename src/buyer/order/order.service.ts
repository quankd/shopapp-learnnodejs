import { OrderModel } from "@shopapp-learnnodejs/common";
import {Order} from './order.model'
import { createOrderDto } from "../dtos/order.dto";

export class OrderService{
    constructor(public orderModel: OrderModel){}

    async createOrder(createOrderDtio: createOrderDto){
        const order =  new this.orderModel({
            user: createOrderDtio.userId,
            totalAmount: createOrderDtio.totalAmount,
            chargeId: createOrderDtio.chargeId
        })
        return await order.save()
    }
}

export const orderService = new OrderService(Order)