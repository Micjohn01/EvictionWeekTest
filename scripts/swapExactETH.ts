
import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {

    //Get the Uniswap Router and Tokens
    const UNISWAP_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

    const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";

    await helpers.impersonateAccount(TOKEN_HOLDER);
    const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);


    const USDC_Contract = await ethers.getContractAt("IERC20", USDC, impersonatedSigner);
    const WETH_Contract = await ethers.getContractAt("IERC20", WETH);

    const ROUTER = await ethers.getContractAt("IUniswapV2Router", UNISWAP_ADDRESS, impersonatedSigner);
     

    const amountOutMin = ethers.parseUnits("0", 18);

    const usdcBalance = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const wethBalance = await WETH_Contract.balanceOf(impersonatedSigner.address);
    const ethBalance = await ethers.provider.getBalance(impersonatedSigner.address);
    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("usdc balance before swap", Number(usdcBalance));
    console.log("weth balance before swap", Number(wethBalance));
    console.log("eth balance before swap", Number(ethBalance));
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    


    const trx = await ROUTER.swapExactETHForTokens(
        amountOutMin,
        [WETH, USDC],
        impersonatedSigner.address,
        deadline, { value: ethers.parseEther("2",) }
    );
    const receipt = await trx.wait()
    console.log({ receipt })

    const usdcBalanceAfter = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const wethBalanceAfter = await WETH_Contract.balanceOf(impersonatedSigner.address);
    const ethBalanceAfter = await ethers.provider.getBalance(impersonatedSigner.address);
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("usdc balance after swap", Number(usdcBalanceAfter));
    console.log("weth balance after swap", Number(wethBalanceAfter));
    console.log("eth balance after swap", Number(ethBalanceAfter));
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
