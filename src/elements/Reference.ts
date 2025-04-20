import { ref} from "vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function <T>(type: new () => T) {
  return ref<T | null>(null);
}

