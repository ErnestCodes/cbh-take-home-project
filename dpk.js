const crypto = require("crypto");

const sha3_512HexDigest = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (!event.partitionKey) {
    return sha3_512HexDigest(JSON.stringify(event));
  }

  const candidate =
    typeof event.partitionKey === "string"
      ? event.partitionKey
      : JSON.stringify(event.partitionKey);

  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? sha3_512HexDigest(candidate)
    : candidate.slice(0, MAX_PARTITION_KEY_LENGTH);
};
