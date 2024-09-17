
import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
    const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

    const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";

    await helpers.impersonateAccount(TOKEN_HOLDER);
    const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);


    const USDC_Contract = await ethers.getContractAt("IERC20", USDC, impersonatedSigner);
    const WETH_Contract = await ethers.getContractAt("IERC20", WETH);

    const ROUTER = await ethers.getContractAt("IUniswapV2Router", ROUTER_ADDRESS, impersonatedSigner);
    // const amountOut = 

    const amountOutMin = ethers.parseUnits("0", 18);

    const usdcBal = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const wethBal = await WETH_Contract.balanceOf(impersonatedSigner.address);
    const ethBal = await ethers.provider.getBalance(impersonatedSigner.address);
    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

    console.log("=========================================================");
    console.log("usdc balance before swap", Number(usdcBal));
    console.log("weth balance before swap", Number(wethBal));
    console.log("eth balance before swap", Number(ethBal));
    console.log("=========================================================");


    const trx = await ROUTER.swapExactETHForTokens(
        amountOutMin,
        [WETH, USDC],
        impersonatedSigner.address,
        deadline, { value: ethers.parseEther("2",) }
    );
    const receipt = await trx.wait()
    console.log({ receipt })

    const usdcBalAfter = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const wethBalAfter = await WETH_Contract.balanceOf(impersonatedSigner.address);
    const ethBalAfter = await ethers.provider.getBalance(impersonatedSigner.address);
    console.log("=========================================================");
    console.log("usdc balance after swap", Number(usdcBalAfter));
    console.log("weth balance after swap", Number(wethBalAfter));
    console.log("eth balance after swap", Number(ethBalAfter));
    console.log("=========================================================");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
