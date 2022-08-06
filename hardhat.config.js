require("@nomiclabs/hardhat-waffle")
require('hardhat-conflux')
require("dotenv").config()
const fs = require('fs').promises

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    // const accounts = await hre.conflux.getSigners()

    const accounts = []
    for (let i = 0; i < 10; i++) {
        accounts.push(hre.conflux.wallet.addRandom())
    }

    for (const account of accounts) {
        console.log(account.address)
    }
})

task("contract", "Create a new contract with the name specified").addParam("name", "The contract's name").setAction(async (taskArgs) => {
    let contract =
        `// SPDX-License-Identifier: MIT\npragma solidity >=0.4.22 <0.9.0;\n\ncontract ${taskArgs.name} {\n  constructor() {}\n}`
    await fs.writeFile(`./contracts/${taskArgs.name}.sol`, contract)
        .then(() => {
            console.log(`Contract ${taskArgs.name}.sol has been created successfully`)
        })
        .catch(err => {
            console.log(err)
        })
})

task("newTest", "Create a new test script with the contract name specified").addParam("contract", "The contract to be tested").setAction(async (taskArgs) => {
    let test =
        `const { expect } = require("chai")\nconst { ConfluxSDK, conflux } = require("hardhat")\n\ndescribe("${taskArgs.contract}", function () {})`
    await fs.writeFile(`./test/${taskArgs.contract}.js`, test)
        .then(() => {
            console.log(`Testing script ${taskArgs.contract}.js has been created successfully`)
        })
        .catch(err => {
            console.log(err)
        })
})
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.4",
    defaultNetwork: "ConfluxTestnet",
    networks: {
        hardhat: {},
        ConfluxTestnet: {
            url: "https://test.confluxrpc.com",
            accounts: [process.env.PRIVATE_KEY1],
            chainId: 1,
        },
        ConfluxMainnet: {
            url: "https://main.confluxrpc.com",
            accounts: [process.env.PRIVATE_KEY1],
            chainId: 1029,
        }
    }
}
