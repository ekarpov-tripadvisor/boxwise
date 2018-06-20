import React from "react";
import { connect } from "react-redux";
import ProductDialog from "./ProductDialog";
import { Product } from "../queries/products";
import firebase from "../firebase";
import { handleError } from "../utils";

const EditProductDialogContainer = ({ id, onClose, profile, ...props }) => (
  <Product
    id={id}
    render={({ isLoading, data }) =>
      !isLoading && (
        <ProductDialog
          title="Edit Product"
          values={data}
          onSubmit={values => {
            const firestore = firebase.firestore();
            firestore
              .collection("products")
              .doc(values.id)
              .set(values)
              .then(product => {
                onClose();
              })
              .catch(handleError); // TODO: actually handle the error
          }}
          onClose={onClose}
          {...props}
        />
      )
    }
  />
);

export default connect(state => ({
  profile: state.profile
}))(EditProductDialogContainer);
