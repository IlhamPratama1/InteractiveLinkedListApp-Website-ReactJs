import Hashids from 'hashids';
import { NumberLike } from 'hashids/cjs/util';

export function DecodeId(encodedId: string | undefined) {
    const hashids = new Hashids(process.env.REACT_APP_HASH_ID, 20);
    let decodedId: NumberLike = 0;
    if (encodedId) return decodedId = hashids.decode(encodedId)[0];
    return decodedId;
}

export function EncodeId(id: string) {
    const hashids = new Hashids(process.env.REACT_APP_HASH_ID, 20);
    let encodedId = hashids.encode(id);
    return encodedId;
}