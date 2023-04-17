import Order from "../models/Order.js";
import nodemailer from "nodemailer";

export const createOrder = async (req, res, next) => {
  try {
    const newOrder = new Order({ userId: req.userId, ...req.body });
    const cartItems = newOrder.cartItems.map(
      (cart) =>
        `<tr>
      <td style="border: 1px solid;">${cart.name}</td>
      <td style="border: 1px solid;" ><img style="width:100px;" src=${
        cart.image
      } alt=${cart.name}></td>
      
      <td style="border: 1px solid;">${cart.price.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      })}</td>
      <td style="border: 1px solid;text-align: center">${cart.quantity}</td>
      <td style="border: 1px solid;">${(
        cart.quantity * cart.price
      ).toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      })} </tr>`
    );

    await newOrder.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: newOrder.email,
      subject: "Thông tin đơn đặt hàng",
      html: ` <h1>Xin Chào ${newOrder.name}\n\n</h1>
      <p>phone:${newOrder.phone}\n</p>
      <p>Address:${newOrder.address}\n</p>
      <p>Ngày đặt hàng:${newOrder.createdAt}\n</p>
      <table style="border: 1px solid;">
      <tr>
        <th style="border: 1px solid;">Tên sản phẩm</th>
        <th style="border: 1px solid;">Hình ảnh</th>
        <th style="border: 1px solid;">Giá</th>
        <th style="border: 1px solid;">Số lượng</th>
        <th style="border: 1px solid;">Thành tiền</th>
      </tr>
      ${cartItems}
      </table>
    <h1>Tổng Thanh Toán ${newOrder.totalBill} VND</h1>
    <h1>Cám Ơn Bạn</h1>
          `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
    res.status(200).send("success");
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
export const getAdminOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

export const getDetailedHistory = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    res.status(200).send(order);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order.userId !== req.userId)
      return next(createError(403, "You can delete only your order!"));

    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted!");
  } catch (err) {
    next(err);
  }
};
