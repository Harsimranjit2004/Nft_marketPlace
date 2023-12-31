// const { ethers } = require("hardhat")
// const PRICE = ethers.utils.parseEther("0.1")
// async function mintAndList() {
//     const nftMarketplace = await ethers.getContract("NftMarketplace")
//     const basicNft = await ethers.getContract("BasicNft")
//     console.log("minting.....")
//     const mintTx = await basicNft.mintNft()
//     const TxReciept = await mintTx.wait(1)
//     const tokenId = TxReciept.events[0].args.tokenId

//     console.log("approving nft")
//     const approvalTx = await basicNft.approve(basicNft.address, tokenId)
//     await approvalTx.wait(1)
//     console.log("listing nft")
//     const tx = await nftMarketplace.listItem(
//         nftMarketplace.address,
//         tokenId,
//         PRICE
//     )
//     await tx.wait(1)
//     console.log("listed")
// }
// mintAndList()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.log(error)
//         process.exit(1)
//     })

const { ethers, network } = require("hardhat")
const { moveBlock } = require("../utils/move-blocks")

const PRICE = "0.1"

async function mintAndList() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    // const randomNumber = Math.floor(Math.random() * 2)
    // let basicNft
    // if (randomNumber == 1) {
    //     basicNft = await ethers.getContract("BasicNftTwo")
    // } else {
    basicNft = await ethers.getContract("BasicNft")
    // }
    console.log("Minting NFT...")
    const mintTx = await basicNft.mintNft()
    const mintTxReceipt = await mintTx.wait(1)
    const tokenId = mintTxReceipt.events[0].args.tokenId
    console.log("Approving NFT...")
    const approvalTx = await basicNft.approve(nftMarketplace.address, tokenId)
    await approvalTx.wait(1)
    console.log("Listing NFT...")
    const tx = await nftMarketplace.listItem(basicNft.address, tokenId, PRICE)
    // console.log(tx)
    const re = await tx.wait(1)
    console.log("NFT Listed!")
    console.log(re.events[0].args)
    // if (network.config.chainId == 31337) {
    //     // Moralis has a hard time if you move more than 1 at once!
    //     await moveBlock(1, (sleepAmount = 1000))
    // }
}

mintAndList()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
