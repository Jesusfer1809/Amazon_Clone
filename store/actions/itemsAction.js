import * as types from "../types";
import axios from "axios";

export const addItem = (product) => {
  return {
    type: "ADD_ITEM",
    payload: product,
  };
};

export const riseItemQty = (product) => {
  return {
    type: "RISE_QTY",
    payload: product,
  };
};

export const reduceItemQty = (product) => {
  return {
    type: "REDUCE_QTY",
    payload: product,
  };
};

export const removeItem = (product) => {
  return {
    type: "REMOVE_ITEM",
    payload: product,
  };
};
