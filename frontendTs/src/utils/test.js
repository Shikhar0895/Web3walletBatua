import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import * as secp from "@noble/secp256k1";
import nacl from "tweetnacl";

console.log("file ran");

// const uint8ArrayToHexString = (uint8Array) => {
//   let resultantString = Array.from(uint8Array)
//     .map((byte) => byte.toString(16).padStart(2, "0"))
//     .join("");
//   return resultantString;
// };

// const generateKeys = (blockchain, mnemonic) => {
//   let data = { privKey: "", pubKey: "" };

//   if (blockchain === "60") {
//     const privKey = secp.utils.randomPrivateKey();
//     const pubKey = secp.getPublicKey(privKey);
//     // const msgHash =
//     //     "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9";
//     // const signature = await secp.signAsync(msgHash, privKey)
//     // const isValid = secp.verify(signature, msgHash, pubKey)
//     return { ...data, privKey, pubKey };
//   } else if (blockchain === "501") {
//     const seed = mnemonicToSeedSync(mnemonic);

//     const path = `m/44'/501'/0'/0'/0'`;
//     const derivedSeedForPath = derivePath(path, seed.toString("hex")).key;
//     const keyPair = nacl.sign.keyPair.fromSeed(derivedSeedForPath);
//     const privKeyUint8Array = keyPair.secretKey;
//     const publicKeyUint8Array = keyPair.publicKey;
//     const privKey = Array.from(privKeyUint8Array)
//       .map((byte) => byte.toString(16).padStart(2, "0"))
//       .join("");
//     const pubKey = Array.from(publicKeyUint8Array)
//       .map((byte) => byte.toString(16).padStart(2, "0"))
//       .join("");
//     console.log({ privKey, pubKey, mnemonic });
//     return { ...data, privKey, pubKey };
//   }
// };

// import { createHash } from "crypto";
// import base58check from "bs58check";
// const generateKeysforBtc = () => {
//   const privKey = secp.utils.randomPrivateKey();
//   const privKeyHex = uint8ArrayToHexString(privKey);
//   const pubKey = secp.getPublicKey(privKey);
//   //hashing for address generation
//   const sha256 = createHash("sha256");
//   const ripemd160 = createHash("ripemd160");
//   const pubKeyHash = ripemd160.update(sha256.update(pubKey).digest()).digest();
//   const btcAddress = base58check.encode(
//     Buffer.concat([Buffer.from([0x00]), pubKeyHash])
//   );
//   //address generation
//   console.log({ pubkey: uint8ArrayToHexString(pubKey), privKey, btcAddress });
// };

// generateKeysforBtc();

const generateKeys = () => {
  const blockchain = "501";
  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);
  const enc = new TextEncoder();

  console.log(seed);
  console.log(enc.encode(seed));
  localStorage.setItem("uint8array");
  // let data = { privKey: "", pubKey: "" };

  // if (blockchain === "60") {
  //   let accountIndex = 0;
  //   let addressIndex = 0;
  //   const node = HDNodeWallet.fromSeed(seed);
  //   const derivedNode = node.derivePath(
  //     `m/44'/60'/${accountIndex}'/0'/${addressIndex}`
  //   );
  //   const privKey = derivedNode.privateKey;
  //   const ethAddress = derivedNode.address;

  //   return { ...data, privKey, pubKey: ethAddress };
  // } else if (blockchain === "501") {
  //   // Solana block
  //   const path = `m/44'/501'/0'/0/0`;

  //   // Use ed25519-hd-key for Solana
  //   const derivedSeedForPath = derivePath(path, seed.toString("hex")).key;
  //   const keyPair = nacl.sign.keyPair.fromSeed(derivedSeedForPath);

  //   // Convert Uint8Array to base64 for private key and bs58 for public key
  //   const privKey = uint8ArrayToBase64(keyPair.secretKey);
  //   const pubKey = bs58.encode(keyPair.publicKey);

  //   return { ...data, privKey, pubKey };
  // }
};

console.log(generateKeys());
// generateKeys(
//   "501",
//   "crazy emotion option face depend physical horror bag target message sock disease"
// );
