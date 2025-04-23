// Pursoria Main JavaScript

// Handle flash messages with smooth animations
document.addEventListener('DOMContentLoaded', function() {
    // Flash messages fade out
    const flashMessages = document.querySelectorAll('.flash-message');
    
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.classList.add('opacity-0');
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 5000);
    });

    // Initialize cart quantity controls
    initQuantityControls();
    
    // Initialize color pickers
    initColorPickers();
    
    // Initialize product image preview
    initProductImagePreview();
});

// Initialize quantity controls for cart items
function initQuantityControls() {
    const quantityControls = document.querySelectorAll('.quantity-control');
    
    quantityControls.forEach(control => {
        const decreaseBtn = control.closest('div').querySelector('.decrease');
        const increaseBtn = control.closest('div').querySelector('.increase');
        const quantityInput = control.closest('div').querySelector('.quantity-input');
        
        if (decreaseBtn && increaseBtn && quantityInput) {
            decreaseBtn.addEventListener('click', () => {
                let value = parseInt(quantityInput.value);
                if (value > 1) {
                    quantityInput.value = value - 1;
                    updateCartItem(quantityInput.dataset.itemId, value - 1);
                }
            });
            
            increaseBtn.addEventListener('click', () => {
                let value = parseInt(quantityInput.value);
                quantityInput.value = value + 1;
                updateCartItem(quantityInput.dataset.itemId, value + 1);
            });
            
            // Prevent manual input of invalid values
            quantityInput.addEventListener('change', () => {
                let value = parseInt(quantityInput.value);
                if (isNaN(value) || value < 1) {
                    quantityInput.value = 1;
                    value = 1;
                }
                updateCartItem(quantityInput.dataset.itemId, value);
            });
        }
    });
}

// Initialize color pickers for admin product creation
function initColorPickers() {
    const colorInputs = document.querySelectorAll('input[type="color"]');
    colorInputs.forEach(input => {
        const targetInput = document.getElementById(input.id.replace('-picker', ''));
        if (targetInput) {
            // Set initial color picker value based on text input
            if (targetInput.value) {
                input.value = targetInput.value;
            }
            
            // Update text input when color picker changes
            input.addEventListener('input', () => {
                targetInput.value = input.value;
            });
            
            // Update color picker when text input changes
            targetInput.addEventListener('input', () => {
                if (/^#[0-9A-F]{6}$/i.test(targetInput.value)) {
                    input.value = targetInput.value;
                }
            });
        }
    });
}

// Initialize product image preview functionality
function initProductImagePreview() {
    const productImageInput = document.getElementById('product-image');
    if (productImageInput) {
        productImageInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewContainer = document.getElementById('image-preview-container');
                    const previewImage = document.getElementById('image-preview');
                    
                    if (previewImage) {
                        previewImage.src = e.target.result;
                        previewContainer.classList.remove('hidden');
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Function to handle cart updates via AJAX
function updateCartItem(itemId, quantity) {
    // Show loading indicator
    const loadingElement = document.createElement('div');
    loadingElement.className = 'fixed top-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg z-50';
    loadingElement.innerHTML = '<i class="ri-loader-2-line animate-spin mr-2"></i> Updating cart...';
    document.body.appendChild(loadingElement);
    
    // Make AJAX request to update cart
    fetch('/cart/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ itemId, quantity })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Remove loading indicator
        document.body.removeChild(loadingElement);
        
        if (data.success) {
            // Update cart total price on page
            const totalElements = document.querySelectorAll('.cart-total');
            totalElements.forEach(el => {
                el.textContent = '₹' + data.totalPrice;
            });
            
            // Show success notification
            showNotification('Cart updated successfully', 'success');
        } else {
            showNotification('Failed to update cart', 'error');
        }
    })
    .catch(error => {
        // Remove loading indicator
        if (document.body.contains(loadingElement)) {
            document.body.removeChild(loadingElement);
        }
        
        console.error('Error updating cart:', error);
        showNotification('Error updating cart', 'error');
    });
}

// Function to show notifications
function showNotification(message, type = 'info') {
    const notificationElement = document.createElement('div');
    notificationElement.className = `fixed bottom-5 right-5 px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    
    notificationElement.innerHTML = `
        <span class="flex items-center">
            <i class="mr-2 ${
                type === 'success' ? 'ri-check-line' : 
                type === 'error' ? 'ri-error-warning-line' : 
                'ri-information-line'
            }"></i>
            ${message}
        </span>
    `;
    
    document.body.appendChild(notificationElement);
    
    setTimeout(() => {
        notificationElement.classList.add('opacity-0');
        setTimeout(() => {
            if (document.body.contains(notificationElement)) {
                document.body.removeChild(notificationElement);
            }
        }, 300);
    }, 3000);
}

// Function to remove product image (used in admin product form)
function removeImage() {
    const productImageInput = document.getElementById('product-image');
    const previewContainer = document.getElementById('image-preview-container');
    
    if (productImageInput) productImageInput.value = '';
    if (previewContainer) previewContainer.classList.add('hidden');
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}
