import prisma from "../utils/database";
import { Request, Response } from "express";

export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({});

    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      return res
        .status(404)
        .send({ message: `Product with id ${id} not found` });
    }

    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
      },
    });

    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        price,
      },
    });
    res.send(updatedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};