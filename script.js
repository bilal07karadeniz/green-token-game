// Connect Wallet Button hover effect
const connectWalletButton = document.getElementById('connect-wallet');

connectWalletButton.addEventListener('mouseover', function() {
    connectWalletButton.style.backgroundColor = '#3D550C';
    connectWalletButton.style.color = 'white';
    connectWalletButton.style.borderColor = '#3D550C';
});

connectWalletButton.addEventListener('mouseout', function() {
    connectWalletButton.style.backgroundColor = '#B9E09B';
    connectWalletButton.style.color = '#3D550C';
    connectWalletButton.style.borderColor = '#B9E09B';
});

// Modal Handling
const modal = document.getElementById('purchase-modal');
const confirmPurchaseButton = document.getElementById('confirm-purchase');
const closeModalButton = document.querySelector('.close-btn');

function openModal(nftType) {
    const nftInfo = document.getElementById('nft-info');
    nftInfo.textContent = `You are about to purchase: ${nftType} NFT`;
    modal.style.display = 'block';
    document.body.classList.add('modal-open'); // Apply the modal background filter
}

function closeModal() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Remove the modal background filter
}

confirmPurchaseButton.addEventListener('click', function() {
    alert('Purchase confirmed!');
    closeModal();
});

// Close modal when user clicks outside of the modal
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}