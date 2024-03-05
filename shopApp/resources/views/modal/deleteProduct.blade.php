<div class="modal" id="deleteProductModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="deleteProductTitle" class="modal-title">¿Estas seguro de eliminar el producto?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Are you sure that you want to delete the product <span id="productName"></span>?</p> <!-- ID2 phoneName -->
      </div>
      <div class="modal-footer">
        <div class="alert alert-danger mt-3 visually-hidden" id="error" role="alert">
          Error al eliminar el producto.
        </div>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" id="btDeleteProduct" class="btn btn-primary">Delete</button>
      </div>
    </div>
  </div>
</div>
