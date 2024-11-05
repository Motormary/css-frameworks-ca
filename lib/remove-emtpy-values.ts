export default function removeEmptyValues(obj: any) {
    console.log(obj)
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== null)
    );
  }
  