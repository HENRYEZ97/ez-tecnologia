import { storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function
    uploadImagem(file: File):
        Promise<string> {
            const storageRef = ref(storage, `imagens/${uuidv4()}`);
                await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            return url;
}