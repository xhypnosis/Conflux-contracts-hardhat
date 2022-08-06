const { expect } = require("chai")
const { ConfluxSDK, conflux } = require("hardhat")

describe("CRC721B", function () {
    it("Should return the token id, original and new owners separately each iteration once batch transfer is called", async function () {
        const accounts = await conflux.getSigners()
        const account = accounts[0].address

        // const contract = await conflux.getContractFactory("CRC721B")

        // const deployReceipt = await contract.constructor("CRC721B", "C721B", "https://metadata.conflux.fun/metadata/test0.json").sendTransaction({
        //     from: accounts[0].address,
        // }).executed()

        // console.log("contract deployed to:", deployReceipt.contractCreated)

        const addr = "cfxtest:ace11tnp242muk059xatuhfu35ydbv4kva35jkuk1w"
        const C721B = await conflux.getContractAt('CRC721B', addr)

        // const receipt = await C721B.mintBatch(account, 10).sendTransaction({
        //     from: account
        // }).executed()
        // expect(await C721B.tokenURI(20)).to.equal("https://metadata.conflux.fun/metadata/test0.json20.json")

        const users = []
        for (let i = 0; i < 10; i++) {
            users.push(conflux.wallet.addRandom().address)
        }
        
        let lastIndex = await C721B.totalSupply())
        let idsReceipt = await C721B.tokensOf(account, 0, lastIndex)
        let ids = idsReceipt[1].map(Number).slice(-10)

        let transferReceipt = await C721B.safeBatchTransferFrom(account, users, ids).sendTransaction({
            from: account
        }).executed()

        let lastIndex = await C721B.totalSupply())
        expect(await C721B.ownerOf(lastIndex)).to.equal(users[9])
    })
})