import * as types from "../types";
import axios from "axios";

export const addItem = (item) => {
  return {
    type: "ADD_ITEM",
    payload: item,
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
