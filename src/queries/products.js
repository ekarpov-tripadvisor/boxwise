import React from "react";
import { FirestoreCollection, FirestoreDocument } from "react-firestore";
import { firestore } from "../firebase";

export const ProductsCollection = ({ organizationRef, ...props }) => (
  <FirestoreCollection
    path="products"
    filter={[
      ["organization", "==", firestore.doc(organizationRef)],
      ["isDeleted", "==", false]
    ]}
    sort="category:asc,name:asc"
    {...props}
  />
);

export const Product = ({ id, ...props }) => {
  console.log(id);
  return <FirestoreDocument path={"products/" + id} {...props} />;
};
