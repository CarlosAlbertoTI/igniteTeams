import { AppError } from "./../../utils/AppError";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storage.config";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroupName: string) {
  try {
    const stored = await groupsGetAll();

    const groupAlreadyExist = stored.includes(newGroupName);

    if (groupAlreadyExist) {
      throw new AppError("Ja existe um grupo cadastrado com esse nome.");
    }
    const storage = JSON.stringify([...stored, newGroupName]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
