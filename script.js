function selectTheme(themeId, button) {
    document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.remove('selected');
    });

    document.querySelectorAll('.apply-btn').forEach(btn => {
        btn.classList.remove('btn-applied');
        btn.textContent = 'Apply';
    });

    document.getElementById(themeId).classList.add('selected');

    button.classList.add('btn-applied');
    button.textContent = 'Applied';
}

$(document).ready(function () {
    $('#skuCheckbox').change(function () {
        $('#skuCode').prop('disabled', !this.checked);
    });

    $('#nextButton').click(function () {
        const productName = $('#productName').val();
        const productDescription = $('#productDescription').val();
        const listPrice = parseFloat($('#listPrice').val()) || 0;
        const discountPercentage = parseFloat($('#discountPercentage').val()) || 0;
        const shippingCharges = parseFloat($('#shippingCharges').val()) || 0;

        const discountedPrice = listPrice - (listPrice * discountPercentage / 100);
        const finalPrice = discountedPrice + shippingCharges;

        $('#previewTitle').text(productName || 'Product title');
        $('#previewDescription').text(productDescription || 'Product description goes here.');

        let strikeThroughPrice = `<del>RS ${listPrice.toFixed(2)}</del>`;
        $('#originalPrice').html(strikeThroughPrice);
        $('#discountedPrice').text(`RS ${discountedPrice.toFixed(2)}`);
        $('#finalPrice').text(`Final Price (incl. shipping): RS ${finalPrice.toFixed(2)}`);

        const imageFile = $('#productImage')[0].files[0];
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#previewImage').attr('src', e.target.result);
            };
            reader.readAsDataURL(imageFile);
        } else {
            $('#previewImage').attr('src', 'https://via.placeholder.com/150');
        }
    });

    $('#productName, #productDescription, #listPrice, #discountPercentage, #shippingCharges').on('input', function () {
        $('#nextButton').click();
    });

    $('#productImage').on('change', function () {
        $('#nextButton').click();
    });
});
