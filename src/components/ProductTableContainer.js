import React from "react";
import { connect } from "react-redux";
import ProductTable from "./ProductTable";
import EditProductDialogContainer from "./EditProductDialogContainer";
import { ProductsCollection } from "../queries/products";
import { firestore } from "../firebase";
import { handleError } from "../utils";

class ProductTableContainer extends React.Component {
  state = {
    confirmDeleteOpen: false,
    confirmDeleteProductId: null,
    editProduct: false,
    editProductId: null
  };

  render() {
    const { profile } = this.props;
    if (profile.loading) {
      return <ProductTable isLoading={true} products={[]} />;
    }
    const { organization } = profile.data;

    return (
      <div>
        <EditProductDialogContainer
          open={this.state.editProduct}
          id={this.state.editProductId}
          onClose={() => this.setState({ editProduct: false })}
        />
        <ProductsCollection
          organizationRef={organization.ref}
          render={({ isLoading, data }) => {
            return (
              <ProductTable
                isLoading={isLoading}
                products={data}
                onEdit={id => {
                  this.setState({
                    editProduct: true,
                    editProductId: id
                  });
                }}
                onDelete={id => {
                  this.setState({
                    confirmDeleteOpen: true,
                    confirmDeleteProductId: id
                  });
                }}
                confirmDeleteOpen={this.state.confirmDeleteOpen}
                onConfirmDelete={() => {
                  firestore
                    .collection("products")
                    .doc(this.state.confirmDeleteProductId)
                    .update({ isDeleted: true })
                    .catch(handleError);

                  this.setState({
                    confirmDeleteOpen: false,
                    confirmDeleteProductId: null
                  });
                }}
                onCancelConfirmDelete={() => {
                  this.setState({
                    confirmDeleteOpen: false,
                    confirmDeleteProductId: null
                  });
                }}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default connect(state => ({
  profile: state.profile
}))(ProductTableContainer);
