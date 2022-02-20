const crypto = require("crypto");
const { MerkleTree } = require("merkletreejs");
const Base58 = require("base-58");
JSON.canonify = require("canonicalize");

/** Good documentation on how Merkle Trees work here
 * https://github.com/miguelmota/merkletreejs
 */
class MerkleAccumulator {
  // should use different hash data for external and internal nodes
  // https://github.com/miguelmota/merkletreejs#notes
  static leafHash = (msg) =>
    crypto.createHash("blake2s256").update(msg).digest();

  static innerHash = (msg) =>
    crypto.createHash("sha3-256").update(msg).digest();

  /** this function assumes a single array of Buffers */
  static createBifrostTree(leafHashes) {
    return new MerkleTree(leafHashes, this.innerHash);
  }

  /** Returns the root of the Merkle tree
   * NOTE: funky stuff may happen with repreated inputs, so a validation
   *  should enforce a unique set of hashes going into the leaves
   */
  static createCommitment(data) {
    try {
      const dataConanical = data.map(JSON.canonify);
      const dataHashes = dataConanical.map(this.leafHash);
      const tree = this.createBifrostTree(dataHashes);

      console.log(dataConanical);
      console.log(JSON.stringify(data[0]));
      console.log(dataConanical[0]);

      return {
        inputs: dataConanical,
        leaves: dataHashes.map(Base58.encode),
        root: Base58.encode(tree.getRoot())
      };
    } catch (err) {
      throw err;
    }
  }

  static createMembershipProof(data, index) {
    try {
      const dataConanical = data.map(JSON.canonify);
      const dataHashes = dataConanical.map(this.leafHash);
      const tree = this.createBifrostTree(dataHashes);

      return {
        proof: tree.getProof(dataHashes[index]).map((elem) => {
          return {
            position: elem.position,
            data: Base58.encode(elem.data)
          };
        })
      };
    } catch (err) {
      throw err;
    }
  }

  static verifyMembershipProof(leafHash, proof, root) {
    try {
      const proofBuffer = proof.map((elem) => {
        return {
          position: elem.position,
          data: Base58.decode(elem.data)
        };
      });

      return MerkleTree.verify(
        proofBuffer,
        Base58.decode(leafHash),
        Base58.decode(root),
        this.innerHash
      )
        ? { isValidProof: true }
        : { isValidProof: false };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = MerkleAccumulator;
