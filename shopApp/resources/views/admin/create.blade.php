@extends('admin.main')
@section('content')
<div class="col-lg-12">
    <div class="row gy-3">
        <form action="{{ url('product') }}" method="post" enctype="multipart/form-data">
            @csrf
            <h3 class="mb-12 billing-heading">Create Product</h3>


            <!-- Campo 1: Name -->
            <div class="col-lg-12">
                <label class="form-label text-sm text-uppercase" for="name">Name</label>
                <input class="form-control form-control-lg" type="text" id="nameProduct" placeholder="Name" name="name" value="{{ old('name') }}">
            </div>

            <!-- Campo 2: Category -->
            <div class="col-lg-6 form-group">
                <label class="form-label text-sm text-uppercase" for="idcategory">Category</label>
                <select class="idcategory form-control form-control-lg rounded-0" data-customclass="form-control form-control-lg rounded-0" name="idcategory" required>
                    <option value="" disabled selected>Select the category</option>
                    @foreach ($categories as $cat)
                        <option value="{{ $cat->id }}">{{ $cat->name }}</option>
                    @endforeach
                </select>
            </div>

            <!-- Campo 3: Price -->
            <div class="col-lg-6">
                <label class="form-label text-sm text-uppercase" for="price">Price</label>
                <input class="form-control form-control-lg" type="number" id="priceProduct" placeholder="1.0"
                    step="0.01" min="0" max="100000000"  name="price" value="{{ old('price') }}">
            </div>

            <!-- Campo 4: Description -->
            <div class="col-lg-6">
                <label class="form-label text-sm text-uppercase" for="description">Description</label>
                <input class="form-control form-control-lg" type="text" id="descriptionProduct"
                    placeholder="Description" name="description" value="{{ old('description') }}">
            </div>

            <!-- Campo 5: Thumbnail -->
            <div class="col-lg-6">
                <label class="form-label text-sm text-uppercase" for="file">Thumbnail</label>
                <input class="form-control form-control-lg" type="file" id="file" name="file" value="{{ old('file') }}">
            </div>

<!-- Campo 6: Specifications -->
            <div class="col-lg-12">
                <label class="form-label text-sm text-uppercase" for="lastName">Specifications</label>
                <div class="row gy-3" id="specifications-container">
                    <!-- Especificación 1 -->
                    <div class="col-lg-6">
                        <input class="form-control form-control-lg" type="text" placeholder="Name" name="spec_name[]" value="{{ old('spec_name[]') }}">
                    </div>
                    <div class="col-lg-6">
                        <input class="form-control form-control-lg" type="text" placeholder="Data" name="spec_data[]" value="{{ old('spec_data[]') }}">
                    </div>
                </div>
                <div class="row gy-3" id="add-spec-row">
                    <div class="col-lg-12 text-end">
                        <button type="button" class="btn btn-info" id="add-spec">Add Specification</button>
                    </div>
                </div>
            </div>

            <!-- Botón: Place order -->
            <div class="col-lg-12 form-group">
                <button type="submit" class="btn btn-success">Create</button>
            </div>
        </form>
    </div>
</div>
<script>
document.addEventListener("DOMContentLoaded", function() {
    var specificationsContainer = document.getElementById('specifications-container');
    var addSpecButton = document.getElementById('add-spec');
    var addSpecRow = document.getElementById('add-spec-row');

    addSpecButton.addEventListener('click', function() {
        var lastRow = specificationsContainer.lastElementChild;

        // Verificar si la fila anterior está completamente rellenada
        var inputs = lastRow.querySelectorAll('input');
        var isRowFilled = Array.from(inputs).every(function(input) {
            return input.value.trim() !== '';
        });

        if (isRowFilled) {
            var newRow = document.createElement('div');
            newRow.className = 'row gy-3';

            var col1 = document.createElement('div');
            col1.className = 'col-lg-6';
            var input1 = document.createElement('input');
            input1.className = 'form-control form-control-lg';
            input1.type = 'text';
            input1.placeholder = 'Name';
            input1.name = 'spec_name[]';
            col1.appendChild(input1);

            var col2 = document.createElement('div');
            col2.className = 'col-lg-6';
            var input2 = document.createElement('input');
            input2.className = 'form-control form-control-lg';
            input2.type = 'text';
            input2.placeholder = 'Data';
            input2.name = 'spec_data[]';
            col2.appendChild(input2);

            newRow.appendChild(col1);
            newRow.appendChild(col2);

            specificationsContainer.appendChild(newRow);
        }
    });
});
</script>
@endsection