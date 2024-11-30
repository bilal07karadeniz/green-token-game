// Example data to dynamically display NFTs
const nfts = [
    { id: 1, name: "Solar Panel NFT", income: 0.1 },
    { id: 2, name: "Wind Turbine NFT", income: 0.15 },
    { id: 3, name: "Hydropower NFT", income: 0.12 },
];

// Simulating NFT purchase
function purchaseNFT(nftId) {
    const nft = nfts.find(n => n.id === nftId);
    alert(`You have successfully purchased the ${nft.name} NFT!`);
    // Actual purchase logic would go here
}

// Simulate wallet connection
function connectWallet() {
    alert("Wallet connected!");
    // Here, you can add logic to actually connect to a user's wallet (e.g., using Web3.js, WalletConnect, etc.)
}