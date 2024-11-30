// Cüzdan bağlantı durumunu simüle etmek için bir değişken
let isWalletConnected = false;
let phantom;  // Phantom wallet objesi
let provider;  // Solana provider

// Cüzdan bağlantısını kontrol et ve Phantom wallet'ı tanıyıp bağlan
async function connectWallet() {
    if ('phantom' in window && window.phantom.solana) {
        provider = window.phantom.solana;
        
        try {
            // Eagerly connect if trusted, otherwise request connection
            const connectionResponse = await provider.connect({ onlyIfTrusted: true });

            if (connectionResponse) {
                console.log("Successfully connected to Phantom Wallet");
                alert('Wallet Connected Successfully!');

                // Update UI to reflect connected state
                document.getElementById('connect-wallet').textContent = 'Wallet Connected';
                document.getElementById('connect-wallet').disabled = true;
                document.getElementById('connect-wallet').style.backgroundColor = '#4CAF50';
                document.getElementById('connect-wallet').style.color = 'white';
                document.getElementById('connect-wallet').style.borderColor = '#4CAF50';

                isWalletConnected = true;  // Set connected state
            }

            // Listen for connection events
            provider.on("connect", () => {
                console.log("Connected to Phantom Wallet.");
                isWalletConnected = true;
            });

            // Listen for disconnection events
            provider.on("disconnect", () => {
                console.log("Disconnected from Phantom Wallet.");
                isWalletConnected = false;
                resetUIForDisconnectedState();  // Reset UI when disconnected
            });

            // Listen for account changes
            provider.on("accountChanged", (publicKey) => {
                if (publicKey) {
                    console.log(`Switched to account ${publicKey.toBase58()}`);
                    // Update application state based on the new account
                } else {
                    console.log("Account disconnected. Attempting to reconnect...");
                    provider.connect().catch((error) => {
                        console.error("Reconnection failed:", error);
                    });
                }
            });
        } catch (err) {
            if (err.code === 4001) {
                alert('User rejected the connection request.');
            } else {
                alert('Failed to connect to wallet.');
            }
            console.error(err);
        }
    } else {
        alert('Phantom wallet is not installed. Please install Phantom and try again.');
        window.open('https://phantom.app', '_blank');  // Redirect to Phantom Wallet installation
    }
}

// Reset UI for disconnected state
function resetUIForDisconnectedState() {
    document.getElementById('connect-wallet').textContent = 'Connect Wallet';
    document.getElementById('connect-wallet').disabled = false;
    document.getElementById('connect-wallet').style.backgroundColor = '#DDDDDD';
    document.getElementById('connect-wallet').style.color = 'black';
    document.getElementById('connect-wallet').style.borderColor = '#DDDDDD';
    isWalletConnected = false;
}

// Connect Wallet butonuna tıklanıldığında bağlanma işlemini başlat
document.getElementById('connect-wallet').addEventListener('click', function() {
    connectWallet();
});

// Satın alma butonlarına tıklandığında cüzdan durumu kontrolü
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function() {
        console.log("Buy button clicked.");  // Debug: Butona tıklandığında
        if (!isWalletConnected) {
            console.log("Cüzdan bağlı değil!");  // Debug: Cüzdan durumu
            alert('Please connect your wallet before making a purchase.');
            return;  // Cüzdan bağlı değilse modal açılmasını engelle
        }
        const nftType = this.textContent.trim();  // NFT tipini al
        console.log("Cüzdan bağlı, modal açılıyor. NFT tipi: ", nftType);  // Debug: NFT tipi
        if (nftType) {
            openModal(nftType);  // Modal açma işlemi
        } else {
            console.log("Hata: NFT tipi alınamadı.");  // Debug: Hata mesajı
        }
    });
});

// Modal Handling
const modal = document.getElementById('purchase-modal');
const confirmPurchaseButton = document.getElementById('confirm-purchase');
const closeModalButton = document.querySelector('.close-btn');

// Modal açma işlemi
function openModal(nftType) {
    const nftInfo = document.getElementById('nft-info');
    nftInfo.textContent = `You are about to purchase: ${nftType}`;
    console.log("Modal açıldı: ", nftType);  // Debug: Modal açıldığında
    modal.style.display = 'block';
    document.body.classList.add('modal-open');  // Modal arka plan filtresi
}

function closeModal() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');  // Modal arka plan filtresi kaldırma
}

// Satın almayı onayla butonuna tıklandığında modal'ı kapatma ve onay mesajı
confirmPurchaseButton.addEventListener('click', function() {
    alert('Purchase confirmed!');
    console.log('Satın alma onaylandı!');  // Debug: Satın alma onayı
    closeModal();  // Modal'ı kapatma
});

// Modal dışına tıklanınca modal'ı kapatma
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// Modal'ı kapatma butonuna tıklanırsa
closeModalButton.addEventListener('click', function() {
    closeModal();
    console.log('Modal kapatıldı!');  // Debug: Modal kapatıldığında
});