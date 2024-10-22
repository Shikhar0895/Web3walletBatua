const getFormData = (element) => {
  const formdata = new FormData(element);
  return Object.fromEntries(formdata.entries());
};

const fetchData = async (url, options) => {
  try {
    const req = await fetch(url, options);
    const resp = await req.json();
    return resp;
  } catch (error) {
    console.error(error);
  }
};

const sendData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const resData = await response.json();
      return { status: response.status, data: resData };
    } else {
      return { status: response.status, data: null };
    }
  } catch (error) {
    console.error(error);
    return { status: "error", data: null };
  }
};

const generateSecretPhrase = () => {
  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);
  console.log({
    mnemonic,
    seed,
  });
};

import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58";

import { HDNodeWallet } from "ethers";
import { API_URL } from "./constants";

const uint8ArrayToHexString = (uint8Array) => {
  let resultantString = Array.from(uint8Array)
    .map((byte) => (byte as number).toString(16).padStart(2, "0"))
    .join("");
  return resultantString;
};

function uint8ArrayToBase64(uint8Array) {
  // Convert Uint8Array to a string of raw binary data
  let binaryString = "";
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }

  // Encode the binary string to Base64
  return btoa(binaryString);
}

const generateKeys = (accountIndex, addressIndex) => {
  console.log("generateKeys ran");
  const blockchain = localStorage.getItem("coinType");
  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);
  const path = `m/44'/${blockchain}'/${accountIndex}'/0'/${addressIndex}'`;
  // console.log({ mnemonic, seed, seedInHex: seed.toString("hex") });
  let data = { privKey: "", pubKey: "" };

  if (blockchain === "60") {
    const node = HDNodeWallet.fromSeed(seed);
    const derivedNode = node.derivePath(path);
    const privKey = derivedNode.privateKey;
    const ethAddress = derivedNode.address;
    console.log("EthKeys", { privKey, ethAddress });
    return { ...data, privKey, pubKey: ethAddress };
  } else if (blockchain === "501") {
    // Solana block
    // Use ed25519-hd-key for Solana
    const derivedSeedForPath = derivePath(path, seed.toString("hex")).key;
    const keyPair = nacl.sign.keyPair.fromSeed(derivedSeedForPath);

    // Convert Uint8Array to base64 for private key and bs58 for public key
    const privKey = bs58.encode(keyPair.secretKey);
    const pubKey = bs58.encode(keyPair.publicKey);
    console.log("SolanaKeys", { privKey, pubKey });
    return { ...data, privKey, pubKey };
  }
};

const generateKeysFromSeed = (
  accountIndex,
  addressIndex,
  blockchain,
  mnemonic
) => {
  const path = `m/44'/${blockchain}'/${accountIndex}'/0'/${addressIndex}'`;

  let data = { privKey: "", pubKey: "" };
  const seed = mnemonicToSeedSync(mnemonic);

  if (blockchain === "60") {
    const node = HDNodeWallet.fromSeed(seed);
    const derivedNode = node.derivePath(path);
    const privKey = derivedNode.privateKey;
    const ethAddress = derivedNode.address;
    console.log("EthKeys", { privKey, ethAddress });
    return { ...data, privKey, pubKey: ethAddress };
  } else if (blockchain === "501") {
    // Solana block
    // Use ed25519-hd-key for Solana
    console.log("Entered SOlana blockchain key creation block");
    const derivedSeedForPath = derivePath(path, seed.toString("hex")).key;
    const keyPair = nacl.sign.keyPair.fromSeed(derivedSeedForPath);

    // Convert Uint8Array to base64 for private key and bs58 for public key
    const privKey = bs58.encode(keyPair.secretKey);
    const pubKey = bs58.encode(keyPair.publicKey);
    console.log("SolanaKeys", { privKey, pubKey });
    return { ...data, privKey, pubKey };
  }
};

const getDataFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

// async function getGeneratedKeyPair() {
//   try {
//     let cointype = localStorage.getItem("coinType");

//     const generatedKeyPair = await generateKeys(); // Await the promise
//     return generatedKeyPair;
//   } catch (error) {
//     console.log(error); // Handle the error
//   }
// }

export {
  getFormData,
  sendData,
  generateSecretPhrase,
  generateKeys,
  generateKeysFromSeed,
  fetchData,
  getDataFromLocalStorage,
};

// import { createHash } from "crypto";

// const generateKeysforBtc = () => {
//   const privKey = secp.utils.randomPrivateKey()
//   const privKeyHex = uint8ArrayToHexString(privKey)
//   const pubKey = secp.getPublicKey(privKey)
//   const sha256 = createHash("sha256")
//   const ripemd160 = createHash("ripemd160")
//   const pubKeyHash = ripemd160.update(sha256.update(pubKey).digest()).digest()
//   console.log({pubKey, privKey})

// }
